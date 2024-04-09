FROM node:20.12.1 as frontend
WORKDIR /app

RUN --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=.npmrc,target=.npmrc \
  npm ci

COPY . /app

RUN make build_frontend


FROM library/maven:3.9.6-eclipse-temurin-17-focal as backend_vespa
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends build-essential

COPY ./backend_vespa /app

RUN make package


FROM vespaengine/vespa:8.324.16

USER root
RUN chown vespa:vespa /opt/vespa && rm /etc/yum.repos.d/epel.repo

ENV HOME=/opt/vespa
ENV RYE_HOME="$HOME/.rye"
ENV PATH="$HOME/app/.venv/bin:$RYE_HOME/shims:$HOME/.local/bin:$PATH"
USER vespa
WORKDIR $HOME/app

RUN curl -sSf https://rye-up.com/get | \
  RYE_NO_AUTO_INSTALL=1 RYE_INSTALL_OPTION="--yes" bash
RUN --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
  --mount=type=bind,source=requirements.lock,target=requirements.lock \
  --mount=type=bind,source=requirements-dev.lock,target=requirements-dev.lock \
  --mount=type=bind,source=.python-version,target=.python-version \
  --mount=type=bind,source=README.md,target=README.md \
  rye sync --no-dev --no-lock

COPY --chown=vespa . $HOME/app
COPY --chown=vespa --from=frontend /app/build $HOME/app/build
COPY --chown=vespa --from=backend_vespa /app/target $HOME/app/backend_vespa/target

ENTRYPOINT ["scripts/start-container.sh"]

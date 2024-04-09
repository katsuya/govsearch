SHELL=/bin/bash -eo pipefail

.PHONY: list fix check

list:
	@LC_ALL=C $(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | \
		awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | \
		sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

setup: setup_frontend setup_backend

setup_frontend:
	npm ci

setup_backend:
	rye sync

build: build_frontend build_backend

build_frontend:
	npx remix vite:build

build_backend: build_frontend
	docker compose build

serve_frontend:
	npx remix vite:dev --host 0.0.0.0 --port 7861

serve_backend:
	rye run uvicorn backend:app \
		--host 0.0.0.0 --port 7860 --log-level debug --reload

fix: fix_frontend fix_backend

fix_frontend:
	npx biome check --apply .

fix_backend:
	rye lint
	rye fmt

check: check_frontend check_backend

check_frontend:
	npx tsc

check_backend:
	rye run pyright

codegen_gitignore:
	for i in .gitignore.d/*.gitignore; do \
		{ echo "## $$i START"; cat $$i; echo "## $$i END"; }; \
		done > .gitignore;

codegen_config:
	jsonnet -m . config.jsonnet
	yq -i e -P '.' docker-compose.yml && yq -i e -P '.' docker-compose.yml
	yq -i e -P '.' docker-compose.vespa.yml && yq -i e -P '.' docker-compose.vespa.yml

codegen_graphql_backend:
	python -m gql_schema_codegen \
		-p ./schema/graphql_* \
		-t ./backend/generated/schema_types.py
	$$(command -v gsed &>/dev/null && echo "gsed" || echo "sed") \
		-i '1,10 s/^from typing import/from typing_extensions import/' \
		backend/generated/schema_types.py

codegen_graphql_frontend:
	npx graphql-codegen --config codegen.ts

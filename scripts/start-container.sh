#!/bin/bash

set -eo pipefail

trap cleanup TERM INT

cleanup() {
  /opt/vespa/bin/vespa-stop-configserver
  /opt/vespa/bin/vespa-stop-services
  exit $?
}

export VESPA_CONFIGSERVERS=$(hostname)
/opt/vespa/bin/vespa-start-configserver
/opt/vespa/bin/vespa-start-services

FORMAT="${VESPA_LOG_FORMAT:-vespa}"
/opt/vespa/bin/vespa-logfmt --follow --format "$FORMAT" ${VESPA_LOGFMT_ARGUMENTS} &
(cd backend_vespa && vespa deploy --wait 300)
/opt/vespa/bin/vespa feed - < data/000936301.jsonl

rye run uvicorn backend:app --host 0.0.0.0 --port 7860

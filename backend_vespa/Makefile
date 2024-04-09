SHELL=/bin/bash -eo pipefail

.PHONY: list clean setup convert_to_onix

list:
	@LC_ALL=C $(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | \
		awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | \
		sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'
clean:
	rm -rf target

package: clean
	mvn package

deploy: package
	vespa deploy -t local --wait 300

feed:
	vespa feed - < ../data/000936301.jsonl

check_reindex:
	vespa curl -s deploy \
		/application/v2/tenant/default/application/default/environment/prod/region/default/instance/default/reindexing | jq .

convert_to_onix_base:
	rye run python ../scripts/export_hf_model_from_hf.py \
		--hf_model intfloat/multilingual-e5-base --output_dir multilingual-e5-base
	rye run optimum-cli onnxruntime quantize \
		--onnx_model multilingual-e5-base --avx2 -o multilingual-e5-base-quantized

copy_model_to_app_base:
	cp -a multilingual-e5-base-quantized/model_quantized.onnx \
		src/main/application/model/multilingual-e5-base-model_quantized.onnx
	cp -a multilingual-e5-base-quantized/tokenizer.json \
		src/main/application/model/multilingual-e5-base-tokenizer.json

convert_to_onix_small:
	rye run python ../scripts/export_hf_model_from_hf.py \
		--hf_model intfloat/multilingual-e5-small --output_dir multilingual-e5-small
	rye run optimum-cli onnxruntime quantize \
		--onnx_model multilingual-e5-small --avx2 -o multilingual-e5-small-quantized

copy_model_to_app_small:
	cp -a multilingual-e5-small-quantized/model_quantized.onnx \
		src/main/application/model/multilingual-e5-small-model_quantized.onnx
	cp -a multilingual-e5-small-quantized/tokenizer.json \
		src/main/application/model/multilingual-e5-small-tokenizer.json

remove_model_from_app:
	rm -f src/main/application/model/*

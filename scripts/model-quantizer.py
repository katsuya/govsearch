#!/usr/bin/env python

import sys
from pathlib import Path
from transformers.convert_graph_to_onnx import quantize

input_file = sys.argv[1]
quantized_model_path = quantize(Path(input_file))
quantized_model_path.replace(input_file)

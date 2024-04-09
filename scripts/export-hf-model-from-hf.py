#!/usr/bin/env python

from transformers import AutoModel, AutoTokenizer
import torch
import argparse
import os


def export_model(model_id, output_dir):
    if not os.path.exists(output_dir):
        print(f"Output directory '{output_dir}' does not exist")
        return

    embedder = AutoModel.from_pretrained(model_id)
    tokenizer = AutoTokenizer.from_pretrained(model_id)

    input_names = ["input_ids", "attention_mask", "token_type_ids"]
    output_names = ["last_hidden_state"]

    input_ids = torch.ones(1, 32, dtype=torch.int64)
    attention_mask = torch.ones(1, 32, dtype=torch.int64)
    token_type_ids = torch.zeros(1, 32, dtype=torch.int64)
    args = (input_ids, attention_mask, token_type_ids)

    f = os.path.join(output_dir, "model.onnx")
    print(f"Exporting onnx model to {f}")

    torch.onnx.export(
        embedder,
        args=args,
        f=f,
        do_constant_folding=True,
        input_names=input_names,
        output_names=output_names,
        dynamic_axes={
            "input_ids": {0: "batch_size", 1: "dyn"},
            "attention_mask": {0: "batch_size", 1: "dyn"},
            "token_type_ids": {0: "batch_size", 1: "dyn"},
            "last_hidden_state": {0: "batch_size", 1: "dyn"},
        },
        opset_version=14,
    )
    tokenizer.save_pretrained(output_dir)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--hf_model", type=str, required=True)
    parser.add_argument("--output_dir", type=str, required=True)
    args = parser.parse_args()
    export_model(args.hf_model, args.output_dir)


if __name__ == "__main__":
    main()

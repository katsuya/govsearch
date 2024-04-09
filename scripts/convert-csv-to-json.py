#!/usr/bin/env python

import sys
import pandas as pd

df = pd.read_csv(sys.argv[1])

df = df[df["ID"].notna()]
assert isinstance(df, pd.DataFrame), "Narrowing down the type of df"

df["id"] = df["ID"].apply(lambda x: f"id:govsearch:qa::{x}")
df["fields"] = df.apply(
    lambda row: {
        "doc_id": row["ID"],
        "category_major": row["大分類"],
        "category_medium": row["中分類"],
        "category_minor": row["小分類"],
        "question": row["問い"],
        "answer": row["回答"],
    },
    axis=1,
)
print(df[["id", "fields"]].to_json(orient="records", force_ascii=False, lines=True))

from backend.generated.schema_types import Question


questions: list[Question] = [
    {
        "id": "M-A-b-10",
        "docId": "M-A-b-10",
        "categoryMajor": "子育て",
        "categoryMedium": "児童手当",
        "categoryMinor": None,
        "question": "児童手当の申請期限を教えてください。",
    },
    {
        "id": "M-A-b-67",
        "docId": "M-A-b-67",
        "categoryMajor": "子育て",
        "categoryMedium": "ひとり親家庭への支援",
        "categoryMinor": None,
        "question": "児童扶養手当について教えてください。",
    },
    {
        "id": "M-B-b-39",
        "docId": "M-B-b-39",
        "categoryMajor": "マイナンバー",
        "categoryMedium": "マイナンバーカード",
        "categoryMinor": None,
        "question": "マイナンバーカードに記録されている電子証明書とは何ですか。",
    },
    {
        "id": "M-B-e-1",
        "docId": "M-B-e-1",
        "categoryMajor": "マイナンバー",
        "categoryMedium": "マイナ保険証",
        "categoryMinor": None,
        "question": "マイナンバーカードを健康保険証として利用するメリットは何ですか。",
    },
    {
        "id": "M-C-g-1",
        "docId": "M-C-g-1",
        "categoryMajor": "医療保険",
        "categoryMedium": "出産育児一時金",
        "categoryMinor": None,
        "question": "出産育児一時金について教えてください。",
    },
    {
        "id": "M-D-d-01",
        "docId": "M-D-d-01",
        "categoryMajor": "年金",
        "categoryMedium": "公的年金を受け取る",
        "categoryMinor": None,
        "question": "年金は「いつから」「いくら」受け取れますか。",
    },
]

shot_user = """
## 質問
不妊治療について教えて下さい

## 参考資料
[
  {
    "categoryMajor": "子育て",
    "categoryMedium": "不妊症・不育症に関する支援、相談",
    "categoryMinor": null,
    "question": "不妊治療を行っている医療機関を教えてください。",
    "answer": "不妊治療を行っている医療機関は、<こちら,https://funin-fuiku.cfa.go.jp/clinic/>から検索することができます。\n（都道府県名、治療内容、その他の条件から検索できます。）"
  },
  {
    "categoryMajor": "子育て",
    "categoryMedium": "不妊症・不育症に関する支援、相談",
    "categoryMinor": null,
    "question": "働きながら不妊治療を続けることができるか不安です。不妊治療の内容や支援情報について教えてください。",
    "answer": "働きながら不妊治療を受ける方、それを支える上司や同僚の皆さん向けに、「不妊治療と仕事との両立サポートハンドブック」を作成しています。不妊治療の内容や職場での配慮のポイント、不妊治療の方にとって役立つ情報などをまとめてありますので、詳しくは、<こちら,https://www.mhlw.go.jp/stf/newpage_14408.html>からご覧ください。\n"
  },
  {
    "categoryMajor": "子育て",
    "categoryMedium": "不妊症・不育症に関する支援、相談",
    "categoryMinor": null,
    "question": "不妊症・不育症について相談できる相談窓口を教えてください。",
    "answer": "不妊症や不育症に悩む夫婦に対し、医学的・専門的な相談や情報提供は、都道府県、指定都市、中核市が設置している性と健康の相談センターで行っております。\n一覧は、<こちら,https://www.cfa.go.jp/policies/boshihoken/seitokenkogaiyo/>からご覧いただけます。"
  },
  {
    "categoryMajor": "子育て",
    "categoryMedium": "不妊症・不育症に関する支援、相談",
    "categoryMinor": null,
    "question": "不妊治療連絡カードとは何ですか。",
    "answer": "不妊治療連絡カードは、不妊治療を受ける労働者の方が主治医等から診療に基づき治療や検査に必要な配慮事項について、企業の人事労務担当者に的確に伝達するためのカードで、厚生労働省において作成し、活用をお勧めしているものです。\n仕事と不妊治療との両立を行う従業員と企業の方をつなぐツールとしてお役立てください。\n\n不妊治療連絡カードの内容や様式、記載例については、<こちら,https://www.mhlw.go.jp/bunya/koyoukintou/pamphlet/dl/30b.pdf>をご覧ください。"
  },
  {
    "categoryMajor": "子育て",
    "categoryMedium": "不妊症・不育症に関する支援、相談",
    "categoryMinor": null,
    "question": "不妊治療にかかる費用が不安です。治療費の助成はありますか。",
    "answer": "保険適用となっている不妊治療については、具体的には、タイミング法などの「一般不妊治療」や、採卵・採精から胚移植に至るまでの基本的な「生殖補助医療」が含まれています。令和4年4月から有効性・安全性が示された不妊治療が保険適用となっています。\nまた、これに加えてそれぞれ自治体による助成を受けられる場合があります。申請手続等に関してはお住まいの都道府県又は市区町村にご確認ください。"
  }
]
"""

shot_assistant = """
不妊治療に関しては、医療機関での治療、助成金の申請、両立支援など多岐にわたる情報が提供されています。これらを通じて、患者の治療と日常生活のサポートが図られています。

- 不妊治療を行っている医療機関は、[こちら](https://funin-fuiku.cfa.go.jp/clinic/)から検索できます。
- 働きながらの不妊治療支援については、「不妊治療と仕事との両立サポートハンドブック」が[こちら](https://www.mhlw.go.jp/stf/newpage_14408.html)で提供されています。
- 不妊症や不育症に関する相談は、都道府県や指定都市が設置する性と健康の相談センターで行われており、一覧は[こちら](https://www.cfa.go.jp/policies/boshihoken/seitokenkogaiyo/)から参照できます。
- 不妊治療連絡カードは、働きながら治療を受ける人が企業の人事労務担当者に必要な配慮事項を伝えるためのツールです。詳細は[こちら](https://www.mhlw.go.jp/bunya/koyoukintou/pamphlet/dl/30b.pdf)。
- 不妊治療にかかる費用の助成については、保険適用となる治療もあり、自治体による助成も受けられます。詳しくはお住まいの自治体に確認してください。
- 不妊治療と仕事の両立支援に関する情報は、[厚生労働省のページ](https://www.mhlw.go.jp/stf/newpage_14408.html)で提供されています。
- 無職で不妊治療中の方には、雇用保険の基本手当の受給が可能です。詳細は[こちら](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000139508.html)。

## 参考資料

- [不妊治療を行っている医療機関の検索ページ](https://funin-fuiku.cfa.go.jp/clinic/)
- [不妊治療と仕事との両立サポートハンドブック](https://www.mhlw.go.jp/stf/newpage_14408.html)
- [性と健康の相談センター一覧](https://www.cfa.go.jp/policies/boshihoken/seitokenkogaiyo/)
- [不妊治療連絡カードについて](https://www.mhlw.go.jp/bunya/koyoukintou/pamphlet/dl/30b.pdf)
- [雇用保険の基本手当について](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000139508.html)
"""

import { CircleHelp } from "lucide-react"
import Markdown from "marked-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog"

const help = `
### Govsearchとは？

Govsearchは、国や自治体の制度を調べることができる検索アプリケーションです。[Govbot](https://govbot.go.jp/)というサービスのために政府が作成した[FAQ](https://www.soumu.go.jp/main_sosiki/hyouka/soudan_n/kyotsucb_top.html#faq)のデータを利用しており、質問文を入力するとFAQの中からそれに近いと思われる順に問いと回答を示します。また、検索結果を踏まえた要約と回答の生成も同時に行われます。要約と回答は試験的な機能であり、使用時には正確でない情報が含まれる場合があることにご注意ください。

Govsearchは、Govbotと同様に政府文書のアクセシビリティ向上を目指して開発されましたが、インタラクティブなチャットボット形式ではなく、直接的な検索機能を中心に据えています。このプロジェクトは、AGPL3ライセンスの下で公開されており、その[ソースコード](https://github.com/hicustomer/govsearch)はオンラインで自由に閲覧することができます。
`

export function QAHelp() {
  return (
    <Dialog>
      <DialogTrigger>
        <CircleHelp className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <article className="prose prose-sm overscroll-auto">
            <Markdown>{help}</Markdown>
          </article>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

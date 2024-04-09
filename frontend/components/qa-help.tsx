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

Govsearchは、日本政府の公式文書を簡単に検索できる非公式のアプリケーションです。検索バーにキーワードや疑問を入力するだけで、政府が提供する豊富な情報資源から、必要な文書を探し出すことが可能です。このサービスは、[Govbot](https://govbot.go.jp/)というサービスのために作られた政府情報の[データベース](https://www.soumu.go.jp/main_sosiki/hyouka/soudan_n/kyotsucb_top.html#faq)を利用しており、信頼性の高い情報へアクセスできます。また、AIを活用した要約機能を実験的に導入しており、検索結果の中から重要な情報を瞬時に把握することができます。ただし、要約は間違っていることもあるから気をつけてね。

Govsearchは、Govbotと同様に政府文書のアクセシビリティ向上を目指して開発されましたが、インタラクティブなチャットボット形式ではなく、直接的な検索機能を中心に据えています。このプロジェクトは、AGPL3ライセンスの下で公開されており、その[コード](https://huggingface.co/spaces/hicustomer/govsearch/tree/main)はオンラインで自由に閲覧することができます。
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

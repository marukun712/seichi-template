# seichi-template

聖地巡礼情報サイト用のテンプレートです。

# Requirements

Nix
direnv

# Install

direnvを有効化してDevShellに入ります。

```bash
direnv allow
```

依存パッケージをインストールします。

```bash
bun i
```

# Usage

./public/data.jsonを編集して使用します。

```json
{
	"title": "作品名 聖地巡礼マップ",
	"color": "#5594c3",
	"about": "作品の舞台となった場所をまとめた聖地巡礼情報サイトです。ここに作品の説明を入れてください。",
	"author": "@your_handle",
	"links": ["https://example.com"],
	"spots": [
		{
			"name": "スポット名",
			"lngLat": [139.6917, 35.6895],
			"description": "このスポットの説明を入れてください。"
		}
	]
}
```

spotsにはスポット名、概要、緯度経度、画像を添付することができます。
lngLatには、[軽度, 緯度]の順に入力してください。

# License

MIT

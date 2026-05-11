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
	"authorLink": "https://example.com",
	"links": ["https://example.com"],
	"spots": [
		{
			"name": "スポット名",
			"latLng": [35.6325459229131, 139.79739234642838],
			"description": "このスポットの説明を入れてください。"
		}
	]
}
```

spotsにはスポット名、概要、緯度経度、地区、画像などを添付することができます。

このスキーマでバリデーションされます。

```typescript
export const Spot = z.object({
  name: z.string(),
  latLng: z.array(z.number()).length(2),
  description: z.string(),
  images: z.array(z.string()).optional(),
  district: z.string().optional(),
});
```

# Deploy

GitHub Pagesに自動でデプロイされます。
必ず、`vite.config.ts`で`base`をリポジトリ名に変更してください。

```typescript
import atomicoVite from "@atomico/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/seichi-template/", // ←リポジトリ名に変更
  plugins: [atomicoVite()],
});
```

# License

MIT

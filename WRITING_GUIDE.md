# 記事の書き方ガイド

このブログに記事を追加する手順を説明します。
プログラミングの知識は不要です。

---

## 1. ファイルを作成する

`src/data/blog/` フォルダの中に `.md`（マークダウン）ファイルを作ります。

```
src/data/blog/
├── okayama/
│   └── okayama_CSS.md    ← 既存の記事
└── my-new-post.md        ← 直接置いてもOK
```

- ファイル名は自由です（英数字・ハイフン推奨）
- サブフォルダで整理することもできます（例: `travel/kyoto.md`）
- ファイル名の先頭が `_` のものは無視されます（下書きの一時退避に使えます）

## 2. フロントマター（記事の設定）を書く

ファイルの先頭に `---` で囲んだ設定ブロックを書きます。これが記事のメタ情報になります。

### 最小限の例

```md
---
pubDatetime: 2026-02-18T12:00:00Z
title: 記事のタイトル
description: 記事の概要（検索結果やSNSシェア時に表示されます）
---

ここから本文を書きます。
```

### すべての項目を使った例

```md
---
author: Sin
pubDatetime: 2026-02-18T12:00:00Z
modDatetime: 2026-02-20T09:00:00Z
title: 記事のタイトル
slug: custom-url-path
featured: true
draft: false
tags:
  - 日記
  - 旅行
ogImage: ./my-image.jpg
description: 記事の概要をここに書きます
canonicalURL: https://example.com/original-post
hideEditPost: true
timezone: Asia/Tokyo
---
```

### 各項目の説明

| 項目 | 必須？ | 説明 |
|------|--------|------|
| `title` | **必須** | 記事のタイトル |
| `pubDatetime` | **必須** | 公開日時。`2026-02-18T12:00:00Z` の形式で書く（後述） |
| `description` | **必須** | 記事の概要。SNSシェアや検索結果に表示される |
| `author` | 任意 | 著者名。省略すると「Shinji」になる |
| `modDatetime` | 任意 | 最終更新日時。設定すると「Updated:」と表示される |
| `slug` | 任意 | 記事のURL。省略するとファイル名から自動生成される |
| `featured` | 任意 | `true` にするとトップページに目立つ形で表示される |
| `draft` | 任意 | `true` にすると本番サイトに表示されない（下書き） |
| `tags` | 任意 | タグの一覧。省略すると「others」になる |
| `ogImage` | 任意 | SNSシェア時のサムネイル画像。省略すると自動生成される |
| `canonicalURL` | 任意 | 他サイトからの転載時に元記事のURLを指定する |
| `hideEditPost` | 任意 | `true` にすると「Edit page」リンクを非表示にする |
| `timezone` | 任意 | 日時のタイムゾーン。省略すると `Asia/Bangkok` |

### 日時の書き方

`pubDatetime` と `modDatetime` は以下の形式で書きます:

```
2026-02-18T12:00:00Z
│          │        └ 「Z」= UTC（世界標準時）
│          └ 時刻（時:分:秒）
└ 日付（年-月-日）
```

日本時間（JST）で午後9時に公開したい場合、UTCは9時間前なので:

```
JST 2026-02-18 21:00 → UTC 2026-02-18T12:00:00Z
```

または `timezone: Asia/Tokyo` を指定すれば、日本時間で書けます:

```md
---
pubDatetime: 2026-02-18T21:00:00Z
timezone: Asia/Tokyo
---
```

## 3. 本文を書く（Markdown記法）

フロントマターの下の `---` 以降が本文です。Markdown という記法で書きます。

### 見出し

```md
## 大見出し
### 中見出し
#### 小見出し
```

### テキストの装飾

```md
**太字のテキスト**
*斜体のテキスト*
~~取り消し線~~
```

### リンク

```md
[表示テキスト](https://example.com)
```

### 画像

```md
![画像の説明](./images/photo.jpg)
```

画像ファイルは記事と同じフォルダに置くと管理しやすいです:

```
src/data/blog/kyoto/
├── kyoto.md
└── images/
    └── kinkakuji.jpg
```

### リスト

```md
- 項目1
- 項目2
- 項目3

1. 番号付き項目1
2. 番号付き項目2
3. 番号付き項目3
```

### 引用

```md
> これは引用です。
> 他の人の言葉を紹介するときに使います。
```

### コードブロック

````md
```
コードや等幅フォントで表示したいテキスト
```
````

### 水平線（区切り線）

```md
---
```

### テーブル（表）

```md
| 名前   | 値段  |
|--------|-------|
| りんご | 100円 |
| みかん | 80円  |
```

## 4. 下書きと公開

### 下書きとして保存する

フロントマターに `draft: true` を設定すると、ビルドしても本番サイトには表示されません。

```md
---
title: まだ書きかけの記事
draft: true
pubDatetime: 2026-02-18T12:00:00Z
description: この記事は下書きです
---
```

### 公開する

`draft: true` を削除するか `draft: false` に変更し、変更をプッシュすればデプロイ後に公開されます。

## 5. 記事の確認方法

ローカルで記事の見た目を確認するには、ターミナルで以下を実行します:

```bash
pnpm dev
```

ブラウザで http://localhost:4321 を開くと、下書き含む全記事がプレビューできます。

## よくある質問

### Q: タグはどう付ければいい？

自由に付けられます。既存の記事と同じタグ名を使えば、同じタグページにまとめて表示されます。

```md
tags:
  - 日記
  - 旅行
```

### Q: 記事のURLはどうなる？

`slug` を指定しない場合、ファイルパスから自動的に決まります。

| ファイルパス | URL |
|---|---|
| `src/data/blog/my-post.md` | `/posts/my-post` |
| `src/data/blog/travel/kyoto.md` | `/posts/travel/kyoto` |

`slug: custom-path` を指定すると `/posts/custom-path` になります。

### Q: 画像を記事のサムネイルにしたい

`ogImage` にファイルパスまたはURLを指定します:

```md
ogImage: ./thumbnail.jpg
```

指定しない場合は、タイトルから自動でOG画像が生成されます。

### Q: 記事の順番は？

`pubDatetime` が新しい順に表示されます。`featured: true` の記事はトップページで優先表示されます。

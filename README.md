# まとめサイト閲覧ユーティリティ

Chromeブラウザの拡張機能です。

<img width="326" alt="2017-05-11 23 12 11" src="https://cloud.githubusercontent.com/assets/1780339/25953784/5eeb7946-369f-11e7-89cb-8d72fee79337.png">

## さっき開いたまとめリンクを開く

<img width="500" alt="2017-05-11 23 15 11" src="https://cloud.githubusercontent.com/assets/1780339/25953923/bc064c50-369f-11e7-9815-08d2c1de87ea.png">

- アンテナサイトを挟む時に、前のページでクリックしたタイトルを、リンク一覧から自動で検出してくれます。
- `<title>` タグに前のリンクタイトル名が残っている場合に限ります。

## このページの画像一覧を表示

<img width="500" alt="2017-05-11 23 12 26" src="https://cloud.githubusercontent.com/assets/1780339/25953783/5ecb71b4-369f-11e7-8695-b80d07d753f7.png">

ページの画像一覧を新しいタブにサムネイル表示してくれます。
画像をクリックすると、原寸大の画像を表示します。
無駄な効果は一切無いので、サクサク画像を確認できます。

- 各種まとめサイトをはじめとする一般的なサイト
- Twitter（メディアタブが好ましい）
- Instagram
- Tumblr

一番下まで行くと読み込みが走るサイトは、目一杯読み込んでからボタンを押すと
そこまでの画像が一覧表示できます。

# 導入方法

> **前提**
> Node.jsi(node, npmコマンド)がインストールされていること

## ビルド

```sh
$ git clone git@github.com:nogahighland/matome-utils.git
$ cd matome-utils
$ npm i && gulp release
```

これで、`matome-utils/.dest` 配下にChrome拡張がのソースがビルドされました。

```
▾ .dest/
    index.min.js*
    manifest.json*
```

このパスをコピーしておきましょう。

```sh
$ cd .dest
$ pwd | pbcopy
```

## 開発版拡張機能のインストール

- Chromeを開いて <kbd>⌘</kbd><kbd>,</kbd> を押して、設定画面を開きます。

- 拡張機能 > パッケージ化されていない拡張機能を読み込む を選択します。
<img width="452" alt="2017-05-11 23 24 52" src="https://cloud.githubusercontent.com/assets/1780339/25954370/0e586e2e-36a1-11e7-8945-81eba198f370.png">

- 指定するフォルダは隠しフォルダなので、パスを直接入力します。
<kbd>⌘ </kbd><kbd>Shift</kbd><kbd>G</kbd> を押すと、ダイアログが開くので、
ここに先ほどコピーしたパスをペーストして選択ボタンを押します。

<img width="437" alt="2017-05-11 23 24 24" src="https://cloud.githubusercontent.com/assets/1780339/25954367/08838ef2-36a1-11e7-900e-0442479ac401.png">

<img width="338" alt="2017-05-11 23 32 14" src="https://cloud.githubusercontent.com/assets/1780339/25954757/2ef0ac86-36a2-11e7-845d-69e8c95d2116.png">

このように表示されると導入された状態になっています。

<img width="737" alt="2017-05-11 23 32 22" src="https://cloud.githubusercontent.com/assets/1780339/25954756/2ec5950a-36a2-11e7-967d-6b864ae8a4ec.png">

どんなサイトを開いても左上にはボタンが表示されるので、
鬱陶しい場合は拡張機能をOFFにしてください。



# まとめサイト閲覧ユーティリティ

## アンテナサイトを挟む時に、前のページでクリックしたタイトルを、リンク一覧から自動で検出してくれます。

- <title>タグに前のリンクタイトル名が残っている場合に限ります。

## ページの画像一覧を新しいタブにサムネイル表示してくれます。

- 2chのリダイレクト用ページも回避してくれます
- .jpgのリンク先がHTMLでも大丈夫です

## TODO

- 見た目が簡素なのでもうちょっとキレイでもいいかも
- 非同期で画像リンクの実際の中身を評価するので、表示順はページでの出現順と一致しません
- 画像ボタンはリクエストがbot的になるので、たまにGoogleに疑われてしまいます
- あんまりプロトタイプとか理解していません
- コードは汚いです
- もうちょっと構成管理とかカッコイイといいな
 - bower, grunt, altjsとか使う感じ？
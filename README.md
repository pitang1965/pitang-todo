# pitang-todo
## 概要
* Supabaseの使い方を学習するための簡単なto-doアプリです。
* Over 40 Web Club内の勉強会で使用します。

## 使用しているサービス及びライブラリ等

### [MUI(Material-UI)](https://mui.com/)
* React用のUIライブラリ
* 本アプリでは、notistackが使用しています。

### [notistack](https://notistack.com/)
* Reactの通知のライブラリ。

### [React](https://ja.reactjs.org/)
* ユーザインタフェース構築のためのJavaScriptのライブラリ
* 本アプリではプロジェクトの雛形はViteで生成しています。

### [react-dom](https://www.npmjs.com/package/react-dom)
* ReactのDOMのエントリポイントを提供するパッケージ。
* 本アプリでは、main.jsx で使っています。

### [react-icons](https://react-icons.github.io/react-icons/)
* React用のアイコンライブラリ。
* 本アプリではゴミ箱アイコンを使用しています。

### [Supabase](https://supabase.com/docs/)
* Firebaseの代替となるオープンソースのサービス

### [@supabase/supabase-js](https://github.com/supabase/supabase-js)
* SupabaseのJavaScriptクライアント
* 本アプリでは以下の機能を使用
* Database: Postgresデータベース。プロフィール情報とto-doを格納。
* Auth: 認証と行単位のセキュリティ(RLS)のユーザ管理。自分のto-doだけ作成、表示、削除等できる。
* File Storage: 大容量ファイルの保存。プロフィール画像の格納に使用。

### [Visully Hidden](https://reach.tech/visually-hidden)
* 視覚的に非表示になっているスクリーンリーダーのテキストを提供。
* 本アプリでは画像アップロードのinputに使用。

### [Vite](https://ja.vitejs.dev/)
* 次世代フロントエンドツール。
* 「びーと」と読みます。
* 本アプリでは、ViteによりReactとJavaScriptを用いたプロジェクトを生成しています。
* esbuildを使用して高速で快適な開発をおこない、プロダクションではRollupでバンドルします。

## 環境変数
* VITE_SUPABASE_URL: Project URL
* VITE_SUPABASE_ANON_KEY: anon

## デプロイ先
* Netlifyにデプロイしています。
* https://pitang-todo.netlify.app/

## 利用可能なスクリプト
### `yarn dev`
アプリを開発環境で実行します。

### `yarn build`
本番環境のアプリを dist フォルダーにビルドします。

### `yarn preview`
アプリをローカルでテストする。distのファイルをhttp://localhost:4173 で配信します。
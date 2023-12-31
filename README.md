# shintaroasuzuki-react-native-template

## 目次

-   [テンプレートリポジトリの利用](#use-template-repository)
-   [想定されているシステム構成](#expected-system-configuration)
-   [環境構築](#environment-setup)
-   [使用ライブラリについて](#used-libraries)
-   [ディレクトリ設計](#directory-design)
-   [コンポーネント設計](#component-design)
-   [CI/CD](#cicd)
-   [スクリプト](#script)
-   [ボイラープレートの生成](#generate-boilerplate)
-   [DevClient の利用](#devclient)

<h2 id="use-template-repository">テンプレートリポジトリの利用</h2>

```shell
gh repo create my-new-repo \
            --public \
            --clone \
            --template shintaroasuzuki-react-native-template
```

> **Note**
>
> 事前に [GitHub CLI](https://docs.github.com/ja/github-cli/github-cli) のインストールが必要です。
>
> [Homebrew](https://brew.sh) を使っていれば下記のコマンドでインストールできます。
>
> ```shell
> brew install gh
> ```

<h2 id="expected-system-configuration">想定されているシステム構成</h2>

クライアント(アプリ)・サーバー・インフラの「3 層アーキテクチャ」を想定しています。

REST API でサーバーと通信をします。

サブモジュールにサーバー側のリポジトリを追加し、サブモジュール内の OpenAPI 定義書をもとに `openapi2aspida` によって、ApiClient を生成します。

`src/apis/lib/apiClient.ts` に定義されている `useApiClient` という hooks を利用して、通信をおこないます。

<h2 id="environment-setup">環境構築</h2>

```shell
# Node v18.15.0 のインストール
nodenv install 18.15.0

# yarn (パッケージマネージャー) のインストール
npm install -g yarn

# 依存パッケージのインストール
yarn install
```

> **Note**
>
> 事前に [GitHub CLI](https://docs.github.com/ja/github-cli/github-cli) のインストールが必要です。
>
> [Homebrew](https://brew.sh) を使っていれば下記のコマンドでインストールできます。
>
> ```shell
> # nodenv のインストール
> brew install nodenv
>
> # パスを通す（zshの場合）
> echo 'eval "$(nodenv init -)"' >> ~/.zshrc
> ```

<h2 id="used-libraries">使用ライブラリについて</h2>

使用しているライブラリの中から、抜粋して説明します。

|                                                                                     |                                                                                                                                                                  |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [react-query](https://tanstack.com/query/v4/docs/react/overview)                    | DFL(Data Fetching Library) の一つです。Server State を簡潔に管理し、キャッシュ機構を利用するため使用しています。                                                 |
| [aspida](https://github.com/aspida/aspida/tree/main/packages/aspida/docs/ja#readme) | TypeScript 製の REST API クライアントです。パス・URL クエリ・ヘッダー・ボディ・レスポンス全てに型を指定できるため、REST API でより型安全な開発が可能になります。 |
| [recoil](https://recoiljs.org)                                                      | React のための状態管理ライブラリです。Global State を管理するために使用しています。                                                                              |
| [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)                  | ローカルストレージにデータを保存するために使用しています。Async Storage よりもパフォーマンスが高いためこちらを使用しています。                                   |

<h2 id="directory-design">ディレクトリ設計</h2>

-   `src/apis`: openapi2aspida で生成した api クライアントや axion のモックなどが入っています。
-   `src/features`: 機能/モデルごとのコンポーネントを格納しています。screen コンポーネントはこの中に配置します。
    -   `src/features/**/components`: ある機能/モデル内で用いるコンポーネントの置き場です。後述の bases, modules にさらに分かれます。
-   `src/components`: 機能/モデルに関わらない汎用的なコンポーネントの置き場です。
    -   `src/components/bases`: react-native 標準のコンポーネントのラッパーコンポーネントの置き場です。ComponentProps 型を用いて標準コンポーネントの props を完全に継承したものにします。
    -   `src/components/modules`: 上記に含まれない汎用的なコンポーネントの置き場です。bases と異なり、bases や 他の modules を参照することができます。
-   `src/logics`: ビジネスロジックを表現する関数の置き場です。コンポーネントテストを行わない代わりに、このディレクトリ内のカバレッジを 100% にすることを必須としています。
-   `src/utils`: 汎用関数の置き場です。このディレクトリ内のカバレッジも 100% にすることを必須としています。

<h2 id="component-design">コンポーネント設計</h2>

```
.
└── src/components/Foo/
    ├── index.ts
    ├── Foo.tsx
    └── Foo.types.ts
```

|                |                                                                                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.ts`     | Barrel ファイルです。`import { Foo } from '@/src/components/Foo` で import できるよう、`Foo.tsx` 内で定義されたコンポーネントの再エクスポートをおこなっています。 |
| `Foo.tsx`      | コンポーネントの本体です。                                                                                                                                        |
| `Foo.types.ts` | コンポーネントの型を定義するファイルです。                                                                                                                        |

<h2 id="cicd">CI/CD</h2>

ブランチ戦略は GitLab-flow を採用しています。

master, staging, production という 3 つのブランチを立てています。

1. **ローカルでのコミット**

-   Prettier でフォーマット
-   ESLint で構文チェック
-   prh で表記ゆれチェック

2. **Pull Request の作成**

-   Jest で単体テスト
-   PR のコメントにカバレッジレポートを作成

3. **Pull Request のマージ**

> master ブランチへのマージ

-   EAS Update で OTA アップデートをする

> staging, production ブランチへのマージ

-   EAS Build でビルドする
-   EAS Submit で配信する

<h2 id="script">スクリプト</h2>

|                         |                                                     |
| ----------------------- | --------------------------------------------------- |
| `yarn dev:start`        | Dev サーバーの起動                                  |
| `yarn dev:ios`          | Dev サーバーの起動 & iOS simulator の起動           |
| `yarn dev:android`      | Dev サーバーの起動 & Android Simulator の起動       |
| `yarn api:build`        | OpenAPI から ApiClient を生成                       |
| `yarn mock:build`       | OpenAPI から axiosMock のための json ファイルを生成 |
| `yarn submodule:update` | サブモジュールのアップデート                        |

<h2 id="generate-boilerplate">ボイラープレートの生成</h2>

|                             |                  |
| --------------------------- | ---------------- |
| `yarn hygen new components` | Component の生成 |
| `yarn hygen new screens`    | Screen の生成    |
| `yarn hygen new logics`     | logic の生成     |
| `yarn hygen new utils`      | util の生成      |

<h2 id="devclient">DevClient の利用</h2>

GitHub Actions の手動ワークフローで、DevClient のビルドができます。

ただし、最初のビルドのみ、`--non-interactive` は使えないので、ローカルでビルドを実行する必要があります。

また、DevClient をインストールするには、ビルド前にデバイス ID を追加しておく必要があります。

`npx eas-cli device:create` を実行し、デバイス追加用の URL を生成し本人に共有します。

その後、ローカルでデバイス ID を指定してビルドすることで、新しい開発者に DevClient を共有できます。

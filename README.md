# Gigacounts Frontend

## Requirements 

This App requires:

- [Node.js](https://nodejs.org/) v16+ to run (^16.14.2).
- [Yarn.js](https://classic.yarnpkg.com/en/docs/install) v1+ to run (^1.22.19).

- Check version of packages

  ```sh
  node -v
  yarn -v
  ```

## Install the dependencies

```sh
- yarn install # with yarn
- npm i OR npm i --legacy-peer-deps # with NPM
```

If you have troubles with dependencies, try this:

```sh
set http_proxy=
set https_proxy=
npm config rm https-proxy
npm config rm proxy
npm config set registry "https://registry.npmjs.org"
yarn cache clean
yarn config delete proxy
yarn --network-timeout 100000
```

Create a .env file running the command in terminal

```sh
touch .env
```

## Environment variables

The environment variables bellow needs to be set in the .env file when project is running locally:

```sh
SKIP_PREFLIGHT_CHECK=true
GENERATE_SOURCEMAP=false
npm_config_user_agent=yarn
PORT=3000
REACT_APP_BACKEND_URL=http://127.0.0.1:3333
REACT_APP_DEFAULT_COUNTRY_CODE=US
REACT_APP_NOTIFICATIONS_REFRESH_INTERVAL_MS=5000
REACT_APP_KNOWLEDGE_BASE_URL=https://dappsar.github.io/jekyll-g
REACT_APP_WALLET_CONNECT_PROJECT_ID=(Project id defined in https://cloud.walletconnect.com/)
REACT_APP_NETWORK_ID=80001
REACT_APP_NODE_PROVIDER_URL=https://polygon-mumbai.g.alchemy.com/v2/
REACT_APP_NODE_PROVIDER_KEY=NODE_PROVIDER_API_KEY
REACT_APP_GIGACOUNTS_TOKEN_ADR=
REACT_APP_GIGACOUNTS_CONTRACTS_HANDLER_ADR=
```

Some Variable description:

- REACT_APP_BACKEND_URL: Represents the url for the connection to the database - set the url of the server api to connect to a specific database
- REACT_APP_DEFAULT_COUNTRY_CODE: Reprepsents the default country id if users country is not in the country list
- REACT_APP_NOTIFICATIONS_REFRESH_INTERVAL_MS: Represents the interval to refresh notificacions (list and avatar)
- REACT_APP_KNOWLEDGE_BASE_URL: External Knowledge Base URL
- REACT_APP_WALLET_CONNECT_PROJECT_ID: Is used to connect wallet with Wallet Connect Protocol
- REACT_APP_NETWORK_ID: Is a property of the chain managed by the node. e.g (Polygon Mumbai Testnet = 80001)
- REACT_APP_GIGACOUNTS_TOKEN_ADR: Smart Contract address of Gigacounts Tokens
- REACT_APP_GIGACOUNTS_CONTRACTS_HANDLER_ADR: Smart contract address of Gigacounts Contracts Handler
## Start app

```sh
- yarn start
# or
- npm start
```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

Please ask for login email and password.

---

## Source Code additional Documentation


See [./doc/](./.doc/index.md), for documentation about source code: routing, multi-language, dependencies, components, authenticaton, state-management, structure and flow, api calls, theme, etc.

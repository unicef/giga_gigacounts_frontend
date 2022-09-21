![Protofire](https://protofire.io/img/protofire.svg)

# Gigacounts FE

## Installation

App requires:

- [Node.js](https://nodejs.org/) v16+ to run(^16.14.2).
- [Yarn.js](https://classic.yarnpkg.com/en/docs/install) v1+ to run(^1.22.19).
- Check version of packages

```sh
    node -v
    yarn -v
```

Install the dependencies and devDependencies

```sh
yarn install
```

Create a .env file running the command in terminal

```sh
touch .env
```

### Environment variables

The environment variables bellow needs to be set in the .env file when project is running locally and in
/.github/workflows/azure-static-web-app-deploy.yml when project is deployed to Azure.

```sh
SKIP_PREFLIGHT_CHECK=true
REACT_APP_BACKEND_URL=https://unicef-giga-backend-dev.azurewebsites.net
# REACT_APP_BACKEND_URL=https://unicef-giga-backend-stage.azurewebsites.net
# REACT_APP_BACKEND_URL=http://127.0.0.1:3333
REACT_APP_COINGECKO_API=https://api.coingecko.com/api/v3/simple/price
REACT_APP_INFURA_ID=INFURA_API_KEY
REACT_APP_NETWORK=CHAIN_ID
```

Variable description:

- REACT_APP_BACKEND_URL - represents the url for the connection to the database - set the url of the server api to connect to a specific database
- REACT_APP_INFURA_ID - INFURA_API_KEY is used to obtain data from Ethereum blockchain, and it is set in infura dashboard - create a project
- REACT_APP_NETWORK - CHAIN_ID is a property of the chain managed by the node. e.g (Ethereum mainnet: CHAIN_ID = 1, Rinkeby testnet: CHAIN_ID = 4)
- REACT_APP_COINGECKO_API - represents the url for receiving crypto data such as live prices, trading volume, exchange volumes

### Start app

```sh
yarn start
```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

Please ask for login email and password.

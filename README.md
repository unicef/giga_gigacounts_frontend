![Protofire](https://protofire.io/img/protofire.svg)

# Unicef Giga FE

## _Getting started_

Clone the project from this url: https://github.com/protofire/Unicef-Giga-App-FE.git

(please check if you have rights to clone the project. If you have already set an ssh key you can use the second command)

```sh
git clone https://github.com/protofire/Unicef-Giga-App-FE.git
git clone git@github.com:protofire/Unicef-Giga-App-FE.git
cd Unicef-Giga-App-FE
```

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

For variable add these values to the env file:

```sh
SKIP_PREFLIGHT_CHECK=true
REACT_APP_BACKEND_URL=https://unicef-giga-backend-dev.azurewebsites.net
# REACT_APP_BACKEND_URL=https://unicef-giga-backend-stage.azurewebsites.net
# REACT_APP_BACKEND_URL=http://127.0.0.1:3333
```

- comment or uncomment the recommended BE url

### Start app

```sh
yarn start
```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

Please ask for login email and password.

# stacks-wallet-explorer

A simple introduction to [Stacks.js](https://www.hiro.so/stacks-js) and [Microstacks](https://micro-stacks.dev/)

![image](https://user-images.githubusercontent.com/11360704/207528609-2a8efcfb-4fc4-4bcf-8c6d-523b953ff75b.png)

### Getting started

Next let's make sure you have the tools to install the projects dependencies:

1. Install [NodeJS](https://nodejs.dev/) that includes `npm`
1. Install [Yarn](https://yarnpkg.com/)

We highly recommend using [Homebrew](https://brew.sh/).

Now open your Terminal, and make sure you are in the `/explorer` folder to run `yarn` to install the dependencies:

```sh
yarn
```

### Env variables

The application needs a couple of env variables to work properly:

```
SECRET_COOKIE_PASSWORD=99999999999999999
NEXT_PUBLIC_TESTNET_API_SERVER=https://stacks-node-api.testnet.stacks.co
NEXT_PUBLIC_LEGACY_EXPLORER_API_SERVER=https://explorer-api.legacy.blockstack.org
NEXT_PUBLIC_DEPLOYMENT_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_POLLING_INTERVAL="10000"

```

If you are in a mac, you'll need to add this to `/etc/paths`

### Run in development mode

To build and run the application locally, you can run this yarn task which will launch the application at http://localhost:3000.

```sh
yarn dev
```

### Building for production

To build for production, run `yarn build` which will run the default next.js build task.

<hr>

# Stacks Development Introduction

## References

- [Hiro Wallet](https://wallet.hiro.so/)
- [Microstacks](https://micro-stacks.dev/)
- [Api URL](https://stacks-node-api.testnet.stacks.co)
- [Stacks API + Faucet](https://docs.hiro.so/api#tag/Faucets)
- [Mempool Transactions](https://docs.hiro.so/api#tag/Transactions/operation/get_mempool_transaction_list)
- [Transaction by ID](https://docs.hiro.so/api#tag/Transactions/operation/get_transaction_by_id)
- [Websockets](https://docs.hiro.so/get-started/stacks-blockchain-api#websocket-sample)
- [Stacks Explorer](https://github.com/hirosystems/explorer)
- [hydration-mismatch](https://micro-stacks.dev/guides/with-nextjs#hydration-mismatch)

## Prompt

- Download Hiro wallet and create an account.
- Using the Microstacks template, build a Next.js page with wallet login.
- Call the Faucet endpoint on the stacks API using your new wallet testnet address as an argument, to receive testnet STX (feel free to use Postman for this).
- Create a table that displays all transactions and their states when a user has authenticated with their wallet.
- Use websockets to update the states of transactions in the transaction table from pending state to confirmed.

*NOTE: Stacks blocks take about 10 min to propagate, so transactions will be pending for around this time after called.*

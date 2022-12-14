import {
  Configuration,
  AccountsApi,
  TransactionsApi,
  FungibleTokensApi,
  NonFungibleTokensApi,
  SmartContractsApi,
} from '@stacks/blockchain-api-client';
import type { Middleware } from '@stacks/blockchain-api-client';
import { selectActiveNetwork } from '@common/state/network-slice';
import { useAppSelector } from '@common/state/hooks';

/**
 * Our mega api clients function. This is a combo of all clients that the blockchain-api-client package offers.
 * @param config - the `@stacks/blockchain-api-client` configuration object
 */
export function apiClients(config: Configuration) {
  const accountsApi = new AccountsApi(config);
  const transactionsApi = new TransactionsApi(config);
  const fungibleTokensApi = new FungibleTokensApi(config);
  const nonFungibleTokensApi = new NonFungibleTokensApi(config);
  const smartContractsApi = new SmartContractsApi(config);
  return {
    accountsApi,
    transactionsApi,
    fungibleTokensApi,
    nonFungibleTokensApi,
    smartContractsApi,
    config,
  };
}

// we use to to create our api client config on both the server and client
export function createConfig(basePath?: string) {
  const middleware: Middleware[] = [];
  return new Configuration({
    basePath,
    middleware,
  });
}

// this is used in next.js specific data fetchers to get all our api clients fetching from the correct network url
// only to be used in `getInitialProps` or other next.js data fetching methods

export const useApi = () => {
  const config = createConfig(useAppSelector(selectActiveNetwork).url);
  return apiClients(config);
};

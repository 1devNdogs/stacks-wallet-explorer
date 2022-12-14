import { apiClients, createConfig } from '@common/api/client';
import { DEFAULT_LIST_LIMIT } from '@common/constants';
import { useAppSelector } from '@common/state/hooks';
import { selectActiveNetwork } from '@common/state/network-slice';
import { MempoolTransactionListResponse, Transaction } from '@stacks/stacks-blockchain-api-types';
import { ApiResponseWithResultsOffset } from '@common/types/api';

export const getAddressQueries = (networkUrl: string) => {
  const clients = apiClients(createConfig(networkUrl));
  return {
    fetchTransactionsForAddress:
      (address: string, limit = DEFAULT_LIST_LIMIT, offset = 0) =>
      () => {
        return clients.accountsApi.getAccountTransactions({
          principal: address,
          offset,
          limit,
        }) as unknown as ApiResponseWithResultsOffset<Transaction>;
      },
    fetchMempoolTransactionsForAddress:
      (address: string, limit = DEFAULT_LIST_LIMIT, offset = 0) =>
      () => {
        return clients.transactionsApi.getMempoolTransactionList({
          address,
          offset,
          limit,
        }) as unknown as MempoolTransactionListResponse;
      },
  };
};

export const useAddressQueries = () => {
  const network = useAppSelector(selectActiveNetwork);
  return getAddressQueries(network.url);
};

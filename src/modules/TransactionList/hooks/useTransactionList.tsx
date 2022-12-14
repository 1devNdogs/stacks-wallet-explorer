import { useAddressQueries } from '@features/address/use-address-queries';
import { useInfiniteQuery } from 'react-query';
import { getNextPageParam } from '@common/utils';
import { useAccount } from '@micro-stacks/react';

export function useTransactionList(limit: number) {
  console.log('[debug] useTransactionList');
  const { stxAddress } = useAccount();
  console.log('[debug] stxAddress', stxAddress);

  const queries = useAddressQueries();
  const confirmedTransactionsResponse = useInfiniteQuery(
    ['confirmedTransactions'],
    ({ pageParam }) =>
      queries.fetchTransactionsForAddress(stxAddress || '', limit, pageParam || 0)(),
    { getNextPageParam, refetchOnWindowFocus: true }
  );
  const mempoolTransactionsResponse = useInfiniteQuery(
    ['mempoolTransactions'],
    ({ pageParam }) =>
      queries.fetchMempoolTransactionsForAddress(stxAddress || '', limit, pageParam || 0)(),
    { getNextPageParam, refetchOnWindowFocus: true }
  );
  return { confirmedTransactionsResponse, mempoolTransactionsResponse };
}

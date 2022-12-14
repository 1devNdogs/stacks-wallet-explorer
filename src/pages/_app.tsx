import 'modern-normalize/modern-normalize.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Provider } from 'react-redux';
import 'tippy.js/dist/tippy.css';

import { ApiUrls, initialize } from '@common/state/network-slice';
import { store } from '@common/state/store';
import { NetworkMode, NetworkModes } from '@common/types/network';
import { AppConfig } from '@components/app-config';
import { NetworkModeToast } from '@components/network-mode-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ClientProvider } from '@micro-stacks/react';
import { destroySession, saveSession } from '../common/fetchers';
import { DEFAULT_TESTNET_SERVER } from '@common/constants';

const NetworkModeUrlMap: Record<NetworkModes, string> = {
  [NetworkModes.Testnet]: DEFAULT_TESTNET_SERVER,
};
interface ExplorerAppProps extends AppProps {
  apiUrls: ApiUrls;
  queryNetworkMode: NetworkMode;
  queryApiUrl?: string;
  pageProps: any;
}

function ExplorerApp({ Component, ...rest }: ExplorerAppProps) {
  const { apiUrls, queryNetworkMode, queryApiUrl, pageProps } = rest;
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 5000,
          },
        },
      })
  );
  const router = useRouter();

  useEffect(() => {
    const chain = router.query.chain;
    toast(`You're viewing the ${chain || queryNetworkMode} Explorer`);
  }, [queryNetworkMode, router.query.chain]);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ClientProvider
          appName="Stacks wallet explorer"
          appIconUrl="/stx-circle.svg"
          dehydratedState={pageProps?.dehydratedState}
          onNoWalletFound={useCallback(() => {
            toast.error('Missing wallet extension, https://wallet.hiro.so/wallet/install-web');
          }, [])}
          onPersistState={useCallback(async (dehydratedState: string) => {
            await saveSession(dehydratedState);
          }, [])}
          onSignOut={useCallback(async () => {
            await destroySession();
          }, [])}
          network={router.query.chain === 'testnet' ? 'testnet' : 'mainnet'}
        >
          {' '}
          <AppConfig
            queryNetworkMode={queryNetworkMode}
            queryApiUrl={queryApiUrl}
            apiUrls={apiUrls}
          >
            <Component {...pageProps} />
            <NetworkModeToast />
          </AppConfig>
        </ClientProvider>
      </Provider>
    </QueryClientProvider>
  );
}

ExplorerApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const query = appContext.ctx.query;
  const queryNetworkMode = ((Array.isArray(query.chain) ? query.chain[0] : query.chain) ||
    NetworkModes.Testnet) as NetworkModes;
  const queryApiUrl = Array.isArray(query.api) ? query.api[0] : query.api;
  store.dispatch(initialize({ queryNetworkMode, apiUrls: NetworkModeUrlMap, queryApiUrl }));
  return {
    ...appProps,
    ...appProps.pageProps,
    apiUrls: NetworkModeUrlMap,
    queryNetworkMode,
    queryApiUrl,
  };
};

export default ExplorerApp;

import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@common/state/store';
import { Network, NetworkModes } from '@common/types/network';
import { ChainID } from '@stacks/transactions';

export interface ApiUrls {
  [NetworkModes.Testnet]: string;
}

export interface NetworkState {
  isInitialized: boolean;
  apiUrls: ApiUrls;
  activeNetworkKey: string;
}

const initialState: NetworkState = {
  isInitialized: false,
  apiUrls: {
    [NetworkModes.Testnet]: '',
  },
  activeNetworkKey: '',
};

const RELOAD_DELAY = 500;

const reloadWithNewNetwork = (network: Network) =>
  setTimeout(() => {
    if (typeof window !== 'undefined') {
      const href = new URL(window.location.href);
      href.searchParams.set('chain', network.mode);
      if (network.isCustomNetwork) {
        href.searchParams.set('api', network.url);
      } else {
        href.searchParams.delete('api');
      }
      window?.location?.replace(href.toString());
    }
  }, RELOAD_DELAY);

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setActiveNetwork: (state, action: PayloadAction<Network>) => {
      console.log('[debug] setActiveNetwork', action);
      state.activeNetworkKey = action.payload.url;
      reloadWithNewNetwork(action.payload);
    },
    initialize: (
      state,
      action: PayloadAction<{
        apiUrls: ApiUrls;
        queryNetworkMode: NetworkModes;
        queryApiUrl?: string;
      }>
    ) => {
      state.apiUrls = action.payload.apiUrls;
      if (action.payload.queryApiUrl) {
        state.activeNetworkKey = action.payload.queryApiUrl;
      } else {
        state.activeNetworkKey = action.payload.apiUrls[action.payload.queryNetworkMode];
      }
      state.isInitialized = true;
    },
  },
});

export const { setActiveNetwork, initialize } = networkSlice.actions;

export const selectNetworkSlice = (state: RootState) => state.network;

export const selectNetworks = createSelector([selectNetworkSlice], networkSlice => ({
  [networkSlice.apiUrls[NetworkModes.Testnet]]: {
    label: 'stacks.co',
    url: networkSlice.apiUrls[NetworkModes.Testnet],
    networkId: ChainID.Testnet,
    mode: NetworkModes.Testnet,
  },
}));

export const selectActiveNetwork = createSelector(
  [selectNetworkSlice, selectNetworks],
  (networkSlice, networks) => networks[networkSlice.activeNetworkKey]
);

export const selectActiveNetworkUrl = createSelector([selectActiveNetwork], activeNetwork => {
  return activeNetwork?.url;
});

export const selectIsInitialized = createSelector(
  [selectNetworkSlice],
  networkSlice => networkSlice.isInitialized
);

export const selectApiUrls = createSelector(
  [selectNetworkSlice, selectNetworks],
  networkSlice => networkSlice.apiUrls
);

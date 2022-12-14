import { ChainID } from '@stacks/transactions';

export enum NetworkModes {
  Testnet = 'testnet',
}

export type NetworkMode = NetworkModes.Testnet;

export interface Network {
  label: string;
  url: string;
  networkId: ChainID;
  mode: NetworkModes;
  wsUrl?: string;
  isCustomNetwork?: boolean;
}

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { networkSlice, NetworkState } from './network-slice';
import { modalSlice, ModalState } from '@components/modals/modal-slice';
import { TxFilters, filterReducers } from '@features/transactions-filter/transactions-filter-slice';

const rootReducer = combineReducers({
  network: networkSlice.reducer,
  modal: modalSlice.reducer,
  ...filterReducers,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type aa = ReturnType<typeof makeStore>;
export interface RootState extends TxFilters {
  network: NetworkState;
  modal: ModalState;
}

export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

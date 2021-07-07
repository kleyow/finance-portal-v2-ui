import { Store } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import createSagaMiddleware from 'redux-saga';
import getCreateReducer from './createReducer';
import sagas from './sagas';

interface StoreConfig {
  isDevelopment: boolean;
}

export default function configure(
  history: History,
  config: StoreConfig = {
    isDevelopment: process?.env?.NODE_ENV !== 'production',
  },
): Store {
  const sagaMiddleware = createSagaMiddleware({});
  const createReducer = getCreateReducer(history);
  const middleware = [...getDefaultMiddleware(), routerMiddleware(history), sagaMiddleware];
  const store = configureStore({
    reducer: createReducer(),
    middleware,
    devTools: config.isDevelopment,
  });

  sagaMiddleware.run(sagas);

  return store;
}

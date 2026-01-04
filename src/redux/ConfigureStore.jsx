import { configureStore as createStore } from '@reduxjs/toolkit';
import SecureLS from 'secure-ls';
import Reducer from './Reducer';
import { setAuthorizationHeader } from '../functions/ApiRequests';
import { originalState } from './DefaultState';

const secureLs = new SecureLS();

const getStateFromStorage = () => {
  const listatsAuth = secureLs.get('listats-auth');
  if (listatsAuth) {
    return { ...listatsAuth, last: undefined, data: undefined };
  }
  return originalState;
};

const updateStateInStorage = (newState) => {
  secureLs.set('listats-auth', newState);
};

const configureStore = () => {
  const initialState = getStateFromStorage();
  setAuthorizationHeader(initialState);

  const store = createStore({
    reducer: Reducer,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production'
  });

  store.subscribe(() => {
    updateStateInStorage(store.getState());
    setAuthorizationHeader(store.getState());
  });

  return store;
};

export default configureStore;

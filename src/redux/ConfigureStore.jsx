import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import SecureLS from "secure-ls";
import Reducer from "./Reducer";
import { setAuthorizationHeader } from "../ApiRequests";

const secureLs = new SecureLS();

const getStateFromStorage = () => {
  const listatsAuth = secureLs.get("listats-auth");

  let stateInLocalStorage = {
    isLoggedIn: false,
    display_name: undefined,
    image: undefined,
    access_token: undefined,
    refresh_token: undefined,
  };

  if (listatsAuth) {
    return listatsAuth;
  }
  return stateInLocalStorage;
};

const updateStateInStorage = (newState) => {
  secureLs.set("listats-auth", newState);
};

const configureStore = () => {
  const initialState = getStateFromStorage();
  setAuthorizationHeader(initialState);
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    Reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

  store.subscribe(() => {
    updateStateInStorage(store.getState());
    setAuthorizationHeader(store.getState());
  });

  return store;
};

export default configureStore;

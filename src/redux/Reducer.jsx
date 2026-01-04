import * as ACTIONS from './Constants';
import { originalState } from './DefaultState';

const defaultState = originalState;

const Reducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case ACTIONS.LOGOUT_SUCCESS:
      return defaultState;
    case ACTIONS.LOGIN_SUCCESS:
      return { ...action.payload, isLoggedIn: true };
    case ACTIONS.DATA_SUCCESS:
      return { ...state, ...action.payload };
    case ACTIONS.MAIN_MENU_SUCCESS:
      return { ...defaultState, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;

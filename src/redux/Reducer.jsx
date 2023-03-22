import * as ACTIONS from "./Constants";
import { originalState } from "./DefaultState";

const defaultState = originalState;

const Reducer = (state = { ...defaultState }, action) => {
  if (action.type === ACTIONS.LOGOUT_SUCCESS) {
    return defaultState;
  } else if (action.type === ACTIONS.LOGIN_SUCCESS) {
    return {
      ...action.payload,
      isLoggedIn: true,
    };
  } else if (action.type === ACTIONS.DATA_SUCCESS) {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type === ACTIONS.MAIN_MENU_SUCCESS) {
    return { ...defaultState, ...action.payload };
  }
  return state;
};

export default Reducer;

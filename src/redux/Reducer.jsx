import * as ACTIONS from "./Constants";

const defaultState = {
  isLoggedIn: false,
  display_name: undefined,
  image: undefined,
  access_token:undefined,
  refresh_token:undefined
};

const Reducer = (state = { ...defaultState }, action) => {
  if (action.type === ACTIONS.LOGOUT_SUCCESS) {
    return defaultState;
  } else if (action.type === ACTIONS.LOGIN_SUCCESS) {
    return {
      ...action.payload,
      isLoggedIn: true,
    };
  }
  return state;
};

export default Reducer;

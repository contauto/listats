import {auth, getData, setAuthorizationHeader} from "../functions/ApiRequests";
import {
    ME,
    REFRESH,
    TOKEN,
    client_id,
    client_secret,
    refreshBody,
} from "../Constants";
import * as ACTIONS from "./Constants";

export const logoutSuccess = () => {
    return async function (dispatch) {
        dispatch({
            type: ACTIONS.LOGOUT_SUCCESS,
        });
    };
};

export const loginSuccess = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState,
    };
};

export const dataSuccess = (data) => {
    return {
        type: ACTIONS.DATA_SUCCESS,
        payload: data,
    };
};

export const mainMenuSuccess = (state) => {
    return {
        type: ACTIONS.MAIN_MENU_SUCCESS,
        payload: state,
    };
};

export const loginHandler = (client_id, client_secret, url, body) => {
    return async function (dispatch) {
        const response = await auth(client_id, client_secret, url, body);
        setAuthorizationHeader({
            isLoggedIn: true,
            access_token: response.data.access_token,
        });
        const me = await getData(ME);
        const refresh_token = response.data.refresh_token
            ? response.data.refresh_token
            : REFRESH();
        const authState = {
            access_token: response.data.access_token,
            refresh_token,
            display_name: me.data.display_name,
            image: me.data.images[0].url,
            userId: me.data.id
        };
        dispatch(loginSuccess(authState));
        return {response, me};
    };
};

export const dataHandler = (url, text) => {
    return async function (dispatch) {
        await getData(url)
            .then((response) => {
                const {limit, items} = response.data
                const storedData = {
                    last: limit === 20 ? items : undefined,
                    data: limit === 50 ? items : undefined,
                    text,
                };
                dispatch(dataSuccess(storedData));
                return response;
            })
            .catch(async (error) => {
                if (error.response.status === 401) {
                    await after401(text, dispatch, url)
                }
            });
    };
};


export const after401 = async (text, dispatch, url) => {
    try {
        await dispatch(
            loginHandler(client_id, client_secret, TOKEN, refreshBody())
        );
        await getData(url).then((response) => {
            const {limit, items} = response.data
            const storedData = {
                last: limit === 20 ? items : undefined,
                data: limit === 50 ? items : undefined,
                text,
            };

            dispatch(dataSuccess(storedData));
            return response;
        });
    } catch {
    }
}
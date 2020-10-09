import { AuthActionTypes } from '../actionTypes/auth';

const initialState = {
    loading: false,
    loggedIn: false,
    user: { username: 'Jahiezer' },
    error: {},
    redirect: false
};

export const AuthReducer = function (state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
        case AuthActionTypes.LOGIN_LOADING:
            return { ...state, loading: true }
        case AuthActionTypes.LOGIN_SUCCESS:
            return { ...state, user: payload, loading: false, redirect: true, loggedIn: true };
        case AuthActionTypes.LOGIN_FAILURE:
            return { ...state, user: {}, error: payload, loading: false};
        case AuthActionTypes.SIGN_UP_LOADING:
            return { ...state, loading: true }
        case AuthActionTypes.SIGN_UP_SUCCESS:
            return { ...state, user: payload, loading: false, redirect: true, loggedIn: true };
        case AuthActionTypes.SIGN_UP_FAILURE:
            return { ...state, user: {}, error: payload, loading: false};
        case AuthActionTypes.LOGOUT_SUCCESS:
            return { ...state, user: {}, error: payload, loading: false, redirect: true, loggedIn: false };
        default:
            return state;
    }
}

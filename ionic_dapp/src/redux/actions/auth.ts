import { AuthActionTypes } from '../actionTypes/auth';

// CREATORS
const login = (payload: any) => {
    return {
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload
    }
}
const logout = (payload: any) => {
    return {
        type: AuthActionTypes.LOGOUT_SUCCESS,
        payload
    }
}
const signUp = (payload: any) => {
    return {
        type: AuthActionTypes.SIGN_UP_SUCCESS,
        payload
    }
}

// ACTIONS
export const doLogin = (loginForm: any) => async (dispatch: any) => {
    dispatch({ type: AuthActionTypes.LOGIN_LOADING });
    try {
        // const res = await axios.post(`${API_ENDPOINT}/login`, loginForm, config);
        setTimeout(function () {
            dispatch(login({ username: 'John Doe' }))
        }, 3000)

    } catch (err) {
        console.log(err);
        dispatch({ type: AuthActionTypes.LOGIN_FAILURE, payload: err.msg });
    }
};
export const doLogout = (loginForm: any) => async (dispatch: any) => {
    dispatch({ type: AuthActionTypes.LOGOUT_LOADING });
    try {
        dispatch(logout({ username: 'John Doe' }));
    } catch (err) {
        console.log(err);
        dispatch({ type: AuthActionTypes.LOGOUT_FAILURE, payload: err.msg });
    }
};
export const doSignUp = (signUpForm: any) => async (dispatch: any) => {
    dispatch({ type: AuthActionTypes.SIGN_UP_LOADING });
    try {
        
        dispatch(signUp({ username: 'John Doe' }));
    } catch (err) {
        console.log(err);
        dispatch({ type: AuthActionTypes.SIGN_UP_FAILURE, payload: err.msg });
    }
};

import { AUTH_LOADING, AUTH_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isGettingUser: false,
    user: null
};

export default function(state = initState, action){
    switch (action.type) {
        case AUTH_LOADING: return { ...state, isGettingUser: true};

        case AUTH_LOADED: return {...state, isAuthenticated: true, isGettingUser: false, user: action.payload };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {...state, ...action.payload, isAuthenticated: true, isGettingUser: false };

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return { ...state, token:null, user: null, isAuthenticated: false, isGettingUser: false};
        default: return state;
    }
}
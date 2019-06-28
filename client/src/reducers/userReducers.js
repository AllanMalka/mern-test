import {GET_USER, USER_LOADING} from "../actions/types";

const initState = {
    user: [],
    isGettingUser: false
};

export default function(state = initState, action){
    switch (action.type) {
        case GET_USER: return {...state, user:action.payload, isGettingUser: false};
        case USER_LOADING: return {...state, isGettingUser: true};
        default: return state;
    }
}
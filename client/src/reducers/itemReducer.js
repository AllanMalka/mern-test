import {GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEMS_LOADING} from "../actions/types";

const initState = {
    items: [],
    loading: false

};


export default function(state = initState, action){
    switch (action.type) {
        case ADD_ITEM: console.log([action.payload, ...state.items]); return {...state, items: [action.payload, ...state.items]};
        case GET_ITEMS: return {...state, items:action.payload, loading: false};
        case UPDATE_ITEM: return {...state, items: [action.payload, ...state.items.filter(item => item._id !== action.payload._id)]};
        case DELETE_ITEM: return {...state, items: state.items.filter(item => item._id !== action.payload)};
        case ITEMS_LOADING: return {...state, loading:true};
        default: return state;
    }
}
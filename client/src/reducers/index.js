import {combineReducers} from "redux";
import itemReducer from './itemReducer';
import errReducer from './errorReducers';
import authReducer from './authReducers';
import userReducer from './userReducers';

export default combineReducers({
    item: itemReducer,
    auth: authReducer,
    error: errReducer,
    user: userReducer,
});
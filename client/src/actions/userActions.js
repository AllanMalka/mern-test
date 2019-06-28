import axios from 'axios';
import { GET_USER, USER_LOADING } from "./types";
import { returnErrors } from "./errorActions";

export const getUser = userId => dispatch => {
    dispatch(setUserLoading());
    axios
        .get(`api/users/${userId}`)
        .then(res =>
        dispatch({
            type: GET_USER,
            payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors('Couldnt find user. Error message: ' +err.response.data, err.response.status)));
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
};
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAIL = 'ADD_USER_FAIL';


export function goToChatRequest(data, cb) {
  return {
    type: ADD_USER_REQUEST,
    payload: {data, cb}
  }
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAIL = 'LOG_IN_FAIL';

export function logIn(data, cb) {
  return {
    type: LOG_IN_REQUEST,
    payload: {data, cb}
  }
}

export const GET_MY_ACCOUNT_REQUEST = 'GET_MY_ACCOUNT_REQUEST';
export const GET_MY_ACCOUNT_SUCCESS = 'GET_MY_ACCOUNT_SUCCESS';
export const GET_MY_ACCOUNT_FAIL = 'GET_MY_ACCOUNT_FAIL';

export function getMyAccount() {
  return {
    type: GET_MY_ACCOUNT_REQUEST,
  }
}


export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'

export function logOut() {
  return {
    type: LOG_OUT,
  }
}




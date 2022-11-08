export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';


export function registerUser(data, cb) {
  return {
    type: REGISTER_USER_REQUEST,
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

export const GO_TO_CHAT_REQUEST = 'GO_TO_CHAT_REQUEST';
export const GO_TO_CHAT_SUCCESS = 'GO_TO_CHAT_SUCCESS';
export const GO_TO_CHAT_FAIL = 'GO_TO_CHAT_FAIL';


export function goToChatRequest(data, cb) {
  return {
    type: GO_TO_CHAT_REQUEST,
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


export const LOG_OUT_CHAT = 'LOG_OUT_CHAT';
export const LOG_OUT_CHAT_SUCCESS = 'LOG_OUT_CHAT_SUCCESS'
export const LOG_OUT_CHAT_FAIL = 'LOG_OUT_CHAT_FAIL'

export function logOutChat() {
  return {
    type: LOG_OUT_CHAT,
  }
}


export const BLOCK_USER_REQUEST = 'BLOCK_USER_REQUEST';
export const BLOCK_USER_SUCCESS = 'BLOCK_USER_SUCCESS'
export const BLOCK_USER_FAIL = 'BLOCK_USER_FAIL'

export function blockUser(userId) {
  return {
    type: BLOCK_USER_REQUEST,
    payload: userId
  }
}




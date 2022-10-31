export const GET_MESSAGES_LIST_REQUEST = 'GET_MESSAGES_LIST_REQUEST';
export const GET_MESSAGES_LIST_SUCCESS = 'GET_MESSAGES_LIST_SUCCESS';
export const GET_MESSAGES_LIST_FAIL = 'GET_MESSAGES_LIST_FAIL';

export function getMessagesRequest() {
  return {
    type: GET_MESSAGES_LIST_REQUEST,
    payload: {}
  }
}

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL';

export function sendMessageRequest(message = {}) {
  return {
    type: SEND_MESSAGE_REQUEST,
    payload: {message}
  }
}

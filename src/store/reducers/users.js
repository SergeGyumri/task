import {
  ADD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  GET_MY_ACCOUNT_FAIL,
  GET_MY_ACCOUNT_REQUEST,
  GET_MY_ACCOUNT_SUCCESS,
  LOG_OUT,
  LOG_OUT_SUCCESS
} from "../actions/users";
import Token from "../../services/Token";

import {SOCKET_FRIEND_TYPING_END, SOCKET_FRIEND_TYPING} from "../actions/socket";

const initialState = {
  token: Token.getToken(),
  addUserRequestStatus: '',
  account: {},
  typing: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MY_ACCOUNT_REQUEST: {
      return {
        ...state,
      }
    }
    case GET_MY_ACCOUNT_SUCCESS: {
      return {
        ...state,
        account: action.payload,
      }
    }
    case GET_MY_ACCOUNT_FAIL: {
      return {
        ...state,
      }
    }
    case ADD_USER_REQUEST: {
      return {
        ...state,
        addUserRequestStatus: 'request'
      }
    }
    case ADD_USER_SUCCESS: {
      return {
        ...state,
        addUserRequestStatus: 'ok'
      }
    }
    case ADD_USER_FAIL: {
      return {
        ...state,
        addUserRequestStatus: 'fail'
      }
    }
    case LOG_OUT: {
      return {
        ...state,
      }
    }
    case LOG_OUT_SUCCESS: {
      Token.delete();
      window.location.href = '/welcome';
      return {
        ...state,
        token: '',
      }
    }
    case SOCKET_FRIEND_TYPING: {
      return {
        ...state,
        typing: true,
        typingAccount: action.payload
      }
    }
    case SOCKET_FRIEND_TYPING_END: {
      return {
        ...state,
        typing: false,
      }
    }
    default: {
      return state
    }
  }
}

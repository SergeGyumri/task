import {
  GO_TO_CHAT_FAIL,
  GO_TO_CHAT_REQUEST,
  GO_TO_CHAT_SUCCESS,
  GET_MY_ACCOUNT_FAIL,
  GET_MY_ACCOUNT_REQUEST,
  GET_MY_ACCOUNT_SUCCESS,
  LOG_OUT_CHAT,
  LOG_OUT_CHAT_SUCCESS,
  LOG_IN_SUCCESS, LOG_IN_FAIL, LOG_IN_REQUEST, LOG_OUT_CHAT_FAIL
} from "../actions/users";
import Token from "../../services/Token";

import {SOCKET_FRIEND_TYPING_END, SOCKET_FRIEND_TYPING} from "../actions/socket";

const initialState = {
  token: Token.getToken(),
  addUserRequestStatus: '',
  account: {},
  adminAccount: {},
  typing: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
      }
    }
    case LOG_IN_SUCCESS: {
      const {token} = action.payload
      Token.setToken(token)
      return {
        ...state,
        token,
      }
    }
    case LOG_IN_FAIL: {
      return {
        ...state,
      }
    }
    case GET_MY_ACCOUNT_REQUEST: {
      return {
        ...state,
      }
    }
    case GET_MY_ACCOUNT_SUCCESS: {
      const {type} = action.payload;
      if (type === 0) {
        return {
          ...state,
          account: action.payload,
        }
      } else if (type === 1) {
        return {
          ...state,
          account: action.payload,
          adminAccount: action.payload,
        }
      }
    }
    case GET_MY_ACCOUNT_FAIL: {
      return {
        ...state,
      }
    }
    case GO_TO_CHAT_REQUEST: {
      return {
        ...state,
        addUserRequestStatus: 'request'
      }
    }
    case GO_TO_CHAT_SUCCESS: {
      const {account} = action.payload;
      return {
        ...state,
        addUserRequestStatus: 'ok',
        account
      }
    }
    case GO_TO_CHAT_FAIL: {
      return {
        ...state,
        addUserRequestStatus: 'fail'
      }
    }

    case LOG_OUT_CHAT: {
      return {
        ...state,
      }
    }
    case LOG_OUT_CHAT_SUCCESS: {
      const {token} = action.payload;
      Token.setToken(token);
      return {
        ...state,
        token
      }
    }
    case LOG_OUT_CHAT_FAIL: {
      return {
        ...state,
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

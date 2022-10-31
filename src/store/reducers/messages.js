import {
  GET_MESSAGES_LIST_REQUEST,
  GET_MESSAGES_LIST_SUCCESS,
  SEND_MESSAGE_SUCCESS
} from "../actions/messages";

const initialState = {
  messagesList: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES_LIST_REQUEST: {
      return {
        ...state,
        messagesList: [],
      }
    }
    case GET_MESSAGES_LIST_SUCCESS: {
      const {messages} = action.payload;
      return {
        ...state,
        messagesList: [...messages],
      }
    }

    case SEND_MESSAGE_SUCCESS: {
      const {messagesList} = state;
      return {
        ...state,
        messagesList: [...messagesList, {message: action.payload.message, senderId: action.payload.senderId}]
      }
    }
    default: {
      return state
    }
  }
}

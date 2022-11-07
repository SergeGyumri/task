import {
  GET_MESSAGES_LIST_REQUEST,
  GET_MESSAGES_LIST_SUCCESS,
} from "../actions/messages";
import {SOCKET_DELETE_MESSAGE, SOCKET_SEND_MESSAGE} from "../actions/socket";

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
    case SOCKET_SEND_MESSAGE : {
      const {messagesList} = state;
      const {message, senderId, senderName, id} = action.payload;
      return {
        ...state,
        messagesList: [...messagesList, {message, senderId, senderName, id}]
      }
    }
    case SOCKET_DELETE_MESSAGE : {
      const {messagesList} = state;
      const messageId = action.payload;
      const messages = messagesList.filter(message => +message.id !== +messageId);
      return {
        ...state,
        messagesList: messages,
      }
    }
    default: {
      return state
    }
  }
}

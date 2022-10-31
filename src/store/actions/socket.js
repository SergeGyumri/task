import {io} from "socket.io-client";
import {SEND_MESSAGE_SUCCESS} from "./messages";

let socket;
let typingTimeout;

const {REACT_APP_API_URL} = process.env;

export const SOCKET_FRIEND_TYPING = 'SOCKET_FRIEND_TYPING';
export const SOCKET_FRIEND_TYPING_END = 'SOCKET_FRIEND_TYPING_END';


export function socketInit(token) {
  return (dispatch) => {
    if (socket) {
      return;
    }
    socket = io.connect(REACT_APP_API_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
        transports: ['websocket'],
      }
    });
    socket.on('new-message', (data) => {
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: data
      });
      dispatch({
        type: SOCKET_FRIEND_TYPING_END,
      });
    });

    socket.on('typing', (account) => {
      dispatch({
        type: SOCKET_FRIEND_TYPING,
        payload: account
      });
      clearTimeout(typingTimeout)
      typingTimeout = setTimeout(() => {
        dispatch({
          type: SOCKET_FRIEND_TYPING_END,
        });
      }, 3000)
    });

  }
}

export function socketUserDisconnect() {
  socket.disconnect();
  socket = null;
}

export const SOCKET_TYPING = 'SOCKET_TYPING';

export function sendTyping(account) {
  socket.emit('typing', account);
  return {
    type: SOCKET_TYPING,
  }
}

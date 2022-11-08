import {takeLatest, call, put} from 'redux-saga/effects'
import {
  GET_MESSAGES_LIST_REQUEST,
  GET_MESSAGES_LIST_SUCCESS,
  GET_MESSAGES_LIST_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_FAIL,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_FAIL,
  DELETE_MESSAGE_SUCCESS,
  SEND_MESSAGE_SUCCESS,
} from "../actions/messages";
import Api from "../../Api";

export default function* watcher() {
  yield takeLatest(GET_MESSAGES_LIST_REQUEST, handleGetMessages);
  yield takeLatest(SEND_MESSAGE_REQUEST, handleSendMessage);
  yield takeLatest(DELETE_MESSAGE_REQUEST, handleDeleteMessage);
}


function* handleSendMessage(action) {
  try {
    const {message} = action.payload;
    yield call(Api.sendMessage, message);
    yield put({
      type: SEND_MESSAGE_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: SEND_MESSAGE_FAIL,
    });
  }
}

function* handleDeleteMessage(action) {
  try {
    const {messageId} = action.payload;
    yield call(Api.deleteMessage, messageId);
    yield put({
      type: DELETE_MESSAGE_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: DELETE_MESSAGE_FAIL,
    });
  }
}

function* handleGetMessages() {
  try {
    const {data} = yield call(Api.getMessages);
    yield put({
      type: GET_MESSAGES_LIST_SUCCESS,
      payload: data
    })
  } catch (e) {
    yield put({
      type: GET_MESSAGES_LIST_FAIL,
    });
  }
}

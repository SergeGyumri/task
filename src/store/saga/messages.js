import {takeLatest, call, put} from 'redux-saga/effects'
import {
  GET_MESSAGES_LIST_REQUEST,
  GET_MESSAGES_LIST_SUCCESS,
  GET_MESSAGES_LIST_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_FAIL,
} from "../actions/messages";
import Api from "../../Api";

export default function* watcher() {
  yield takeLatest(GET_MESSAGES_LIST_REQUEST, handleGetMessages);
  yield takeLatest(SEND_MESSAGE_REQUEST, handleSendMessage);
}


function* handleSendMessage(action) {
  try {
    const {message} = action.payload;
    yield call(Api.sendMessage, message);
  } catch (e) {
    console.warn(e)
    yield put({
      type: SEND_MESSAGE_FAIL,
      message: e.message,
      payload: e.response.data,
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
    console.warn(e)
    yield put({
      type: GET_MESSAGES_LIST_FAIL,
      message: e.message,
    });
  }
}

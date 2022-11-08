import {takeLatest, call, put} from 'redux-saga/effects'
import {
  GO_TO_CHAT_FAIL,
  GO_TO_CHAT_REQUEST,
  GO_TO_CHAT_SUCCESS,
  LOG_OUT_CHAT,
  LOG_OUT_CHAT_SUCCESS,
  GET_MY_ACCOUNT_SUCCESS,
  GET_MY_ACCOUNT_FAIL,
  GET_MY_ACCOUNT_REQUEST,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL, BLOCK_USER_REQUEST, BLOCK_USER_SUCCESS, BLOCK_USER_FAIL
} from "../actions/users";
import Api from "../../Api";

export default function* watcher() {
  yield takeLatest(REGISTER_USER_REQUEST, handleRegister);
  yield takeLatest(LOG_IN_REQUEST, handleLogIn);
  yield takeLatest(GO_TO_CHAT_REQUEST, handleGoToChat);
  yield takeLatest(LOG_OUT_CHAT, handleLogOutChat);
  yield takeLatest(GET_MY_ACCOUNT_REQUEST, handleGetMyAccount);
  yield takeLatest(BLOCK_USER_REQUEST, handleBlockUser);
}


function* handleRegister(action) {
  try {
    const {data} = yield call(Api.register, action.payload.data);
    yield put({
      type: REGISTER_USER_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    yield put({
      type: REGISTER_USER_FAIL,
    });
    if (action.payload.cb) {
      action.payload.cb(e.response.data, null)
    }
  }
}

function* handleLogIn(action) {
  try {
    const {data} = yield call(Api.logIn, action.payload.data);
    yield put({
      type: LOG_IN_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    yield put({
      type: LOG_IN_FAIL,
    });
    if (action.payload.cb) {
      action.payload.cb(e.response.data, null)
    }
  }
}

function* handleGoToChat(action) {
  try {
    const {data} = yield call(Api.goToChat, action.payload.data);
    yield put({
      type: GO_TO_CHAT_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch (e) {
    yield put({
      type: GO_TO_CHAT_FAIL,
    });
    if (action.payload.cb) {
      action.payload.cb(e.response.data, null);
    }
  }
}

function* handleLogOutChat() {
  try {
    const {data} = yield call(Api.logOutChat);
    yield put({
      type: LOG_OUT_CHAT_SUCCESS,
      payload: data
    })
  } catch (e) {

  }
}

function* handleGetMyAccount() {
  try {
    const {data} = yield call(Api.getMyAccount);
    yield put({
      type: GET_MY_ACCOUNT_SUCCESS,
      payload: data.user
    })
  } catch (e) {
    yield put({
      type: GET_MY_ACCOUNT_FAIL,
    });
  }
}

function* handleBlockUser(action) {
  try {
    const userId = action.payload
    yield call(Api.blockUser, userId);
    yield put({
      type: BLOCK_USER_SUCCESS,
    })
  } catch (e) {
    yield put({
      type: BLOCK_USER_FAIL,
    });
  }
}

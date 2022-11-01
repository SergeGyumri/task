import {takeLatest, call, put} from 'redux-saga/effects'
import {
  ADD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  GET_MY_ACCOUNT_SUCCESS,
  GET_MY_ACCOUNT_FAIL,
  GET_MY_ACCOUNT_REQUEST
} from "../actions/users";
import Api from "../../Api";

export default function* watcher() {
  yield takeLatest(ADD_USER_REQUEST, handleAddUser);
  yield takeLatest(LOG_OUT, handleLogOut);
  yield takeLatest(GET_MY_ACCOUNT_REQUEST, handleGemMyAccount);
}


function* handleGemMyAccount() {
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

function* handleAddUser(action) {
  try {
    const {data} = yield call(Api.goToChat, action.payload.data);
    yield put({
      type: ADD_USER_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch (e) {
    console.warn(e)
    yield put({
      type: ADD_USER_FAIL,
    });
    if (action.payload.cb) {
      action.payload.cb(e.response.data.errors, null)
    }
  }
}

function* handleLogOut() {
  try {
    yield call(Api.logOutChat);
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (e) {

  }
}


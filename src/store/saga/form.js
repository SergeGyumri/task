import {takeLatest, call, put} from 'redux-saga/effects'
import {
  GET_FORM_REQUEST,
  GET_FORM_SUCCESS,
  GET_FORM_FAIL
} from "../actions/form";
import Api from "../../Api";

export default function* watcher() {
  yield takeLatest(GET_FORM_REQUEST, handleGetForm);
}


function* handleGetForm() {
  try {
    const data = yield call(Api.getFormData);
    yield put({
      type: GET_FORM_SUCCESS,
      payload: data
    })
  } catch (e) {
    console.warn(e)
    yield put({
      type: GET_FORM_FAIL,
      message: e?.message,
      payload: e?.response?.data,
    });
  }
}

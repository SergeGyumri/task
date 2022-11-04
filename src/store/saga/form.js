import {takeLatest, call, put} from 'redux-saga/effects'
import {
  GET_FORM_REQUEST,
  GET_FORM_SUCCESS,
  GET_FORM_FAIL, ADD_FORM_FIELD_REQUEST, ADD_FORM_FIELD_FAIL, ADD_FORM_FIELD_SUCCESS
} from "../actions/form";
import Api from "../../Api";

export default function* watcher() {
  yield takeLatest(GET_FORM_REQUEST, handleGetForm);
  yield takeLatest(ADD_FORM_FIELD_REQUEST, handleAddField);
}

function* handleAddField(action) {
  try {
    const {data} = yield call(Api.addField, action.payload);
    yield put({
      type: ADD_FORM_FIELD_SUCCESS,
      payload: data.newValues
    })
  } catch (e) {
    console.warn(e)
    yield put({
      type: ADD_FORM_FIELD_FAIL,
    });
  }
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

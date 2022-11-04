export const GET_FORM_REQUEST = 'GET_FORM_REQUEST';
export const GET_FORM_SUCCESS = 'GET_FORM_SUCCESS';
export const GET_FORM_FAIL = 'GET_FORM_FAIL';

export function getFormRequest() {

  return {
    type: GET_FORM_REQUEST,
  }
}

export const ADD_FORM_FIELD_REQUEST = 'ADD_FORM_FIELD_REQUEST';
export const ADD_FORM_FIELD_SUCCESS = 'ADD_FORM_FIELD_SUCCESS';
export const ADD_FORM_FIELD_FAIL = 'ADD_FORM_FIELD_FAIL';


export function addFieldRequest(data) {
  return {
    type: ADD_FORM_FIELD_REQUEST,
    payload: data
  }
}




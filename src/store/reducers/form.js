import {
  GET_FORM_REQUEST,
  GET_FORM_SUCCESS,
  GET_FORM_FAIL, ADD_FORM_FIELD_REQUEST, ADD_FORM_FIELD_SUCCESS, ADD_FORM_FIELD_FAIL,
} from "../actions/form";
import _ from 'lodash'

const initialState = {
  ages: [],
  interests: [],
  interestsListRequestStatus: '',
  agesListRequestStatus: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FORM_REQUEST: {
      return {
        ...state,
        ages: [],
        interests: [],
        interestsListRequestStatus: 'request',
        agesListRequestStatus: 'request',
      }
    }
    case GET_FORM_SUCCESS: {
      return {
        ...state,
        ages: [...action.payload.data.ages],
        interests: [...action.payload.data.interests],
        interestsListRequestStatus: 'ok',
        agesListRequestStatus: 'ok',
      }
    }
    case GET_FORM_FAIL: {
      return {
        ...state,
      }
    }
    case ADD_FORM_FIELD_REQUEST: {
      return {
        ...state,
      }
    }
    case ADD_FORM_FIELD_SUCCESS: {
      const data = action.payload;
      const {ages} = state
      const {interests} = state
      if (data.age.id) {
        ages.push(data.age)
      }
      if (data.interest.id) {
        interests.push(data.interest)
      }
      return {
        ...state,
        ages: [...ages],
        interests: [...interests],
      }
    }
    case ADD_FORM_FIELD_FAIL: {
      return {
        ...state,
      }
    }
    default: {
      return state
    }
  }
}

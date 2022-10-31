import {
  GET_FORM_REQUEST,
  GET_FORM_SUCCESS,
  GET_FORM_FAIL,
} from "../actions/form";

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
        interestsListRequestStatus: 'fail',
        agesListRequestStatus: 'fail',
      }
    }
    default: {
      return state
    }
  }
}

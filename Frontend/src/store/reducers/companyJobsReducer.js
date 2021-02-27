import {
  NEW_JOB_POSTING,
  GET_ALL_JOBS,
  GET_JOB_APPLICANT_DETAILS,
  UPDATE_APPLICANT_STATUS,
} from '../actions/types';

const initialState = {
  status: {},
  jobs: {},
  data: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_JOB_POSTING:
      return { ...state, status: action.payload };
    case GET_ALL_JOBS:
      return { ...state, jobs: action.payload };
    case GET_JOB_APPLICANT_DETAILS:
      return { ...state, data: action.payload };
    case UPDATE_APPLICANT_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
}

import { NEW_SALARY_POSTING } from '../actions/types';

const initialState = {
  salary:[],
  status: {},
  
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_SALARY_POSTING:
      return { ...state, status: action.payload };
    default:
      return state;
  }
}

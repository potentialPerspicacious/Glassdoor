import { NEW_REVIEW_POSTING } from './types';
import { GET_REVIEW } from './types';
import backendServer from '../../webConfig';
import axios from 'axios';

export const insertNewReviewDetails = (reviewData) => (dispatch) => {
  axios
    .post(`${backendServer}company/reviews/`, reviewData)
    .then((response) =>
      dispatch({
        type: NEW_REVIEW_POSTING,
        payload: response.data,
      }),
    )
    .catch((error) => {
      console.log(error);
    });
};

export const saveReview = (payload) => {
  console.log(payload)
  return { type: GET_REVIEW, payload}
};

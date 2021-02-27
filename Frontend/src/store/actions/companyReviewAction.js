import { NEW_REVIEW_POSTING } from './types';
import backendServer from '../../webConfig';
import axios from 'axios';

export const insertNewReviewDetails = (reviewData) => (dispatch) => {
  axios
    .post(`${backendServer}/glassdoor/company/reviews/`, reviewData)
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

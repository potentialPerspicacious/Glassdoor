import { NEW_REVIEW_POSTING } from './types';
import { GET_REVIEW } from './types';
import { GET_POSITIVE_REVIEW } from './types';
import { GET_NEGATIVE_REVIEW } from './types';
import { GET_FEATURED_REVIEW } from './types';
import { GET_AVERAGE_RATING } from './types';
import backendServer from '../../webConfig';
import axios from 'axios';

export const insertNewReviewDetails = (reviewData) => (dispatch) => {
  axios
    .post(`${backendServer}student/reviews/`, reviewData)
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
  return { type: GET_REVIEW, payload}
};

export const savePositiveReview = (payload) => {
  return { type: GET_POSITIVE_REVIEW, payload}
};
export const saveNegativeReview = (payload) => {

  return { type: GET_NEGATIVE_REVIEW, payload}
};
export const saveFeaturedReview = (payload) => {
  return { type: GET_FEATURED_REVIEW, payload}
};
export const saveAverageRating = (payload) => {
  return { type: GET_AVERAGE_RATING, payload}
};
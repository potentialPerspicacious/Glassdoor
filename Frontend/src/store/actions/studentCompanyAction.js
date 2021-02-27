import { GET_COMPANY_OVERVIEW } from "./types";
import { GET_POSITIVE_REVIEW_COMPANY } from './types';
import { GET_NEGATIVE_REVIEW_COMPANY } from './types';
import { GET_FEATURED_REVIEW_COMPANY } from './types';
import { GET_AVERAGE_RATING_COMPANY } from './types';



export const saveCompanyPositiveReview = (payload) => {
  return { type: GET_POSITIVE_REVIEW_COMPANY, payload}
};
export const saveCompanyNegativeReview = (payload) => {

  return { type: GET_NEGATIVE_REVIEW_COMPANY, payload}
};
export const saveCompanyFeaturedReview = (payload) => {
  return { type: GET_FEATURED_REVIEW_COMPANY, payload}
};
export const saveCompanyAverageRating = (payload) => {
  return { type: GET_AVERAGE_RATING_COMPANY, payload}
};

export const saveCompanyInfo = (payload) => {
  return { type: GET_COMPANY_OVERVIEW, payload}
};
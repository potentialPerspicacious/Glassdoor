import { GET_AVERAGE_RATING_COMPANY, GET_NEGATIVE_REVIEW_COMPANY } from '../actions/types';
import { GET_FEATURED_REVIEW_COMPANY,GET_POSITIVE_REVIEW_COMPANY, GET_COMPANY_OVERVIEW} from '../actions/types';
const initialState = {
  company_positive:{},
  company_negative:{},
  company_featured:{},
  company_avgRating:{},
  companyInfo:{},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSITIVE_REVIEW_COMPANY:
        return { 
          ...state, 
          company_positive: action.payload 
        };
    case GET_NEGATIVE_REVIEW_COMPANY:
        return { 
          ...state, 
          company_negative: action.payload 
        };
    case GET_FEATURED_REVIEW_COMPANY:
        return { 
          ...state, 
          company_featured: action.payload 
        };
    case GET_AVERAGE_RATING_COMPANY:
        return { 
          ...state, 
          company_avgRating: action.payload 
        };
    case GET_COMPANY_OVERVIEW:
          return { 
            ...state, 
            companyInfo: action.payload 
          };
    default:
      return state;
  }
}

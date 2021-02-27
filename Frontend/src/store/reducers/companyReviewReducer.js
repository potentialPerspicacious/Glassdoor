import { GET_AVERAGE_RATING, GET_NEGATIVE_REVIEW,NEW_REVIEW_POSTING } from '../actions/types';
import { GET_REVIEW,GET_FEATURED_REVIEW,GET_POSITIVE_REVIEW } from '../actions/types';
const initialState = {
  review: [],
  status: {},
  positive:{},
  negative:{},
  featured:{},
  avgRating:{},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_REVIEW_POSTING:
      return { ...state, status: action.payload };
    case GET_REVIEW:
        return { 
          ...state, 
          review: action.payload 
        };
    case GET_POSITIVE_REVIEW:
        return { 
          ...state, 
          positive: action.payload 
        };
    case GET_NEGATIVE_REVIEW:
        return { 
          ...state, 
          negative: action.payload 
        };
    case GET_FEATURED_REVIEW:
        return { 
          ...state, 
          featured: action.payload 
        };
    case GET_AVERAGE_RATING:
        return { 
          ...state, 
          avgRating: action.payload 
        };

    default:
      return state;
  }
}

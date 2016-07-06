import {
  LOAD_VENUE_DETAIL_REQUEST, LOAD_VENUE_DETAIL_SUCCESS, LOAD_VENUE_DETAIL_FAILURE
} from '../constants/FourSquareActionTypes';

const initialState = {
  isWorking: false,
  error: null,
  venueDetail: null
};

export default function copartying(state = initialState, action) {
  switch (action.type) {

    case LOAD_VENUE_DETAIL_REQUEST:
      return Object.assign({}, state, {
        isWorking: true,
        error: null
      });

    case LOAD_VENUE_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        isWorking: false,
        error: null,
        venueDetail: action.venue
      });

    case LOAD_VENUE_DETAIL_FAILURE:
      return Object.assign({}, state, {
        isWorking: false,
        error: action.error
      });

    default:
      return state;
  }
}

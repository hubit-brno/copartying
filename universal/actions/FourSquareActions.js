import * as types from '../constants/FourSquareActionTypes';
import request from 'superagent';
import { FOURSQUARE_ENDPOINT, FOURSQUARE_AUTH_PARAMS} from '../3rdParty';

export function loadVenueDetail(venueId) {
  return dispatch => {
    dispatch(loadVenueDetailRequest());
    const url = `${FOURSQUARE_ENDPOINT}venues/${venueId}?${FOURSQUARE_AUTH_PARAMS}`;

    return request
      .get(url)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(loadVenueDetailFailure(err));
        } else {
          dispatch(loadVenueDetailSuccess(res.body));
        }
      });
  };
}

function loadVenueDetailRequest() {
  return {
    type: types.LOAD_VENUE_DETAIL_REQUEST
  };
}

function loadVenueDetailSuccess(payload) {
  return {
    type: types.LOAD_VENUE_DETAIL_SUCCESS,
    venue: payload.response.venue
  };
}

function loadVenueDetailFailure(error) {
  return {
    type: types.LOAD_VENUE_DETAIL_FAILURE,
    error
  };
}

import { SET_USER_ID } from '../constants/UserActionTypes';

export function setUserId(userId) {
  return {
    type: SET_USER_ID,
    userId
  };
}

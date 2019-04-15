import * as actionTypes from '../Actions/actionTypes';
import isEmpty from 'lodash/isEmpty';

const defaultState = {
  auth: false,
  users: {},
};

export default function setUserReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.SET_USER:
    debugger;
    return {
        auth: !isEmpty(action.payload),
        users: action.payload,
      };
    
    default:
      return state;
  }
}
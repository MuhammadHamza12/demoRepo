import * as actionTypes from '../actionTypes';
import Axios from 'axios';
import config from '../../config/config';
import setAuthorizationToken from '../../config/setAuthToken';
import jwt from 'jsonwebtoken';

export function Login(data,url) {
  return (dispatch) => {
    debugger;
    return Axios.post(`${config.localhttp}${url}`, data).then((res) => {
      console.log('response',res);
      const token = res.data.token;
      console.log(token);
      localStorage.setItem('jwtToken',token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      return res.data;
    });
  };
}
export function setCurrentUser(userDetails) {
  debugger
  return {
    type: actionTypes.SET_USER,
    payload: userDetails
  };
}
export function logout(){
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
      dispatch(setCurrentUser({}));
      
  };
}

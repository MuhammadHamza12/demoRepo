import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router} from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../src/Assets/css/app.css';
import configureStore from './Store/configureStore';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from './config/setAuthToken';
import * as LoginActions from './Actions/LoginActions/index';

const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(LoginActions.setCurrentUser(jwt.decode(localStorage.jwtToken)));
}




ReactDOM.render(
    <Router>
    <Provider store={store} >
      <App />
    </Provider>
    </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

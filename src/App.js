import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch , Route } from 'react-router-dom';
// import { Button, Form, Col, Container, Row } from "react-bootstrap";
// import { Button } from 'bootstrap';
import Form from './components/Form';
import LoginDemo from './components/LoginDemo';
import background from "./images/lock.png";
import LoginForm from "./Container/LoginForm";
import Head from './components/Head';
import Home from './components/Home';
import SignUpForm from './Container/Signup.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dashboard from './Container/Dashboard.jsx';
import NotFound from './components/NotFound.jsx';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
library.add(faIgloo)

const styles = {
  header: {
    backgroundImage: `url(${background})`,
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },

  content: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
};
class App extends Component {
  render() {
    return (
      // <div style={styles.header}>
      //   <div style={styles.content} >
      //     <LoginForm />
      //   </div>
      // </div>
      <div>
       <div>
         <Head />
         </div>
         <div>
         <Switch>
           <Route path="/" exact component={LoginDemo} />
           <Route path="/signup" component={SignUpForm} />
           <Route path='/dashboard' component={Dashboard} />
           <Route path='*' component={NotFound} /> 
         </Switch>   
        </div> 
      </div>
    );
  }
}

export default App;

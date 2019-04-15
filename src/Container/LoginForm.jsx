import React, { Component } from "react";
import { Alert , Button, Form, Col, Container, Row } from "react-bootstrap";
import background from '../images/lock.png';
import axios from 'axios';
import config from '../config/config';
import * as loginActions from '../Actions/LoginActions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onlineStatus } from '../socketapi/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const styles = {
  header: {
    backgroundImage: `url(${background})`,
    height: "70vh",
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
const FormStyle = {
  //   boxShadow: "5px 5px 5px gray",
  padding: "50px",
};
const pStyle = {
  fontSize: "15px",
  textAlign: "center"
};
const FormLabel = {
  color: '#fff',
  fontSize: 20
}
const FormInput = {
  width: '100%',
}
const BackgroundColor = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading:false,
      errors:{}
    }
  if(this.props.auth){
    this.props.history.push('/dashboard');
  }
  
  }
  
  onHandleText=(e)=>{
    this.setState({
      [e.target.name]:e.target.value,
    })
   }
   onHandleSubmit = (e)=>{
    e.preventDefault();
    const { email , password }  = this.state;
    this.setState({
      isLoading:true,
    })
    
    this.props.login.Login({email,password},'/login/Auth')
    .then((success)=>{
     debugger;
     if(success.token){
      debugger; 
      this.setState({
         isLoading:false,
        })
        // onlineStatus()
        this.props.history.push('/dashboard');
      }else{
        debugger;
       
      }
    }).catch((Err)=>{
      try{
        console.log(Err);
        debugger;
        this.setState({
          isLoading:false,
          errors:{errormsg:Err.response.data.errors.form , errorFlag:true}
        })
      }catch(e){
        console.log(e,'network error');
      }
    })
   }
displayMsg =(color,msg,flag)=>{
  if(flag){
    return(
      <Alert  variant={color}>
      {msg}
    </Alert>
    );
  }
}
componentWillUnmount(){
  this.setState({
    isLoading:false,
    errors:{}
   })
}
  render() {
  const { errors } = this.state;
  
    return (
      <Container>
        <Row style={{ padding: 50, justifyContent: 'center' }}>
          <Col style={BackgroundColor} md="auto">
            {this.displayMsg('danger',errors.errormsg,errors.errorFlag)}
            <Form onSubmit={this.onHandleSubmit} action='javascript:void()' style={FormStyle}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={FormLabel}   >Email address</Form.Label>
                <Form.Control name='email' onChange={this.onHandleText}  required style={FormInput} size='lg' type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label style={FormLabel} >Password</Form.Label>
                <Form.Control name='password' onChange={this.onHandleText}  required size='lg' type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check style={FormLabel} type="checkbox" label="Check me out" />
              </Form.Group>
              <Button disabled={this.state.isLoading} variant="dark" type="submit">
                Login
              </Button>
            </Form></Col>
          <Col style={styles.header} ></Col>
        </Row>
      </Container>
    );
  }
}
function mapDispatchToProps(dispatch){
  return{
    login:bindActionCreators(loginActions,dispatch)
  }
}
function mapStateToProps(state) {
  return {
    auth:state.setUserReducer.auth,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);

import React, { Component , lazy , Suspense } from "react";
import { Alert , Button, Form, Col, Container, Row } from "react-bootstrap";
import background from '../images/sing2.png';
import axios from 'axios';
import config from  '../config/config';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginAcions from '../Actions/LoginActions/index';

// const background = lazy(()=> import('../images/sing2.png'));
const styles = {
  header: {
    backgroundImage: `url(${
      background
    })`,
    height: "90vh",
    opacity: 0.7,
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

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      isLoading:false,
      errors:{},
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
 onHandleSubmit=(e)=>{
   e.preventDefault();
   const { email , name , password } = this.state;
   this.setState({
     isLoading:true,
   });
   this.props.actionLogin.Login({email,name,password},'/signup/api')
    .then((success)=>{
      debugger;
      console.log(success);
      debugger;
      this.setState({
        isLoading:false,
      })
      this.props.history.push('/dashboard');
    }).catch((Err)=>{
      debugger;
      console.log(Err);
      debugger;
      this.setState({
        isLoading:false,
        errors:{errormsg:Err.response.data.errors.form , errorFlag:true}
       })
    }); 
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
                <Form.Control name='email' required onChange={this.onHandleText} style={FormInput} size='lg' type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={FormLabel}   >Name</Form.Label>
                <Form.Control required name='name' onChange={this.onHandleText} required style={FormInput} size='lg' type="text" placeholder="Enter Name" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label style={FormLabel} >Password</Form.Label>
                <Form.Control name='password' onChange={this.onHandleText}  required size='lg' type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check style={FormLabel} type="checkbox" label="Check me out" />
              </Form.Group>
              <Button disabled={this.state.isLoading}  variant="light" type="submit">
                Signup
              </Button>
            </Form></Col>
          <Col style={styles.header} ></Col>
        </Row>
      </Container>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return{
    actionLogin:bindActionCreators(LoginAcions,dispatch),
  }
}
function mapStateToProps(state) {
  return {
    auth:state.setUserReducer.auth,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUpForm);

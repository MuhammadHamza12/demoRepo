import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { withRouter  } from 'react-router-dom';
import { connect } from 'react-redux';
import * as LoginAction from '../Actions/LoginActions/index';
import { logoutAck } from '../socketapi/api';
import { bindActionCreators } from 'redux';
import config from '../config/config';
import axios from 'axios';
import '../components/Head.css';

class Head extends Component {
   logout = ()=>  {

       axios.put(`${config.localhttp}/logout/confirm`,{isOnline:false,_id:this.props._id})
       .then((success)=>{
           debugger;
           Promise.all([this.props.logoutNow.logout(),this.props.history.push('/')])
           .then((success)=>{
               console.log(success);
           })
           .catch((err)=>{
               console.log(err);
           })
            console.log('logout confirmation: ',success);
        }).catch((error)=>{
            debugger;
            console.log(error)
        })
    }
    render() { 
        console.log(this.props);
        debugger;    
        let conditionalLinks = (
            <Nav>
                <Nav.Link  style={{fontSize:18,color:'black'}} as={Link} to='/signup' >Sign Up {' | '}</Nav.Link>
                <Nav.Link style={{fontSize:18,color:'black'}} as={Link} to='/' >Login</Nav.Link>
            </Nav>
        );
        if(this.props.auth){
            conditionalLinks = (
                <Nav>
                <Nav.Link onClick={this.logout} >Logout</Nav.Link>
                </Nav>
            );
        }
        
        return (
            <div>
                <Navbar className='HeadColor' collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand style={{fontSize:25,color:'black'}} href="#home">
                    
                    <i  className="fa fa-meetup" aria-hidden="true">
                    </i>
                    System's
                        
                    </Navbar.Brand>
                    <Navbar.Toggle style={{background:'grey'}}  aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">          
                        </Nav>
                        {conditionalLinks}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
function mapStateToProps(state) {
    debugger;
    return{
        auth:state.setUserReducer.auth,
        email:state.setUserReducer.users.email,
        _id:state.setUserReducer.users.id,
    }
}
function mapDispatchToProps(dispatch) {
    return{
        logoutNow:bindActionCreators(LoginAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Head));
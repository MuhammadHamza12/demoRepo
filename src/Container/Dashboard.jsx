import React, { Component } from 'react';
import { Col, Row, Container, FormControl, Button } from 'react-bootstrap';
import Form from '../components/Form';
import ListOfFriend from '../components/ListOfFreinds.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Axios from 'axios';
import config from './../config/config';
import { getAllOnlineStatus } from './../socketapi/api';
// import { subscribeToActiveStatus  , recieveAck} from '../socketapi/api';

const styles = {
  header: {
    height: "100vh",
    padding: 40,
    backgroundColor: '#fff3',
  },
  content: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  rowStyle:{
    paddingTop: 30,
  },
  ListFreinds:{
    paddingTop: 20,
  }
};

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      allStatus:[],
      isLoading:true,
    }
    getAllOnlineStatus((status)=>{
      debugger;
      this.setState({
        allStatus:[...status],
      })
    })
    if(!this.props.auth){
      this.props.history.push('/');
    }
  }
  
  componentDidMount(){
    Axios.get(`${config.localhttp}/get/onlinStatus`)
    .then((success)=>{
      debugger;
      this.setState({
        isLoading:false,
      });
    })
  }
  render() {
    const { allStatus } = this.state;
    debugger;
    return (
      <div>
        <Row style={{marginRight:0}}  >
          <Col style={styles.header} xs={6} md={3}>
            <Row>
            <form inline>
              <FormControl type="text" placeholder="Search Friends" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </form>
            </Row>
            <Row style={styles.ListFreinds} >
             { this.state.isLoading ? 'Loading...' : <ListOfFriend data={allStatus} /> }   
            </Row>
          </Col>
          <Col xs={6} md={9}>
            <Form data={allStatus} email={this.props.email} />
          </Col>
        </Row>

      </div>
    );
  }
}
function mapStateToProps(state) {
  debugger;
  return {
    auth:state.setUserReducer.auth,
    email:state.setUserReducer.users.email,
  }
}
export default connect(mapStateToProps,null)(Dashboard);
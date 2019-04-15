import React, { Component } from 'react';
import { getMessages } from '../socketapi/api';
import DisplayMessage from './DispMessage';
import axios from 'axios';
import config from './../config/config';
class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      allMsg: [],
      isLoading: false,
    };
    getMessages((success) => {
      debugger;
      this.setState({
        allMsg:[success,...this.state.allMsg],
      });
    })
  }

  
  
  
  componentDidMount() {
    this.setState({
      isLoading: true,
    })
    axios.get(`${config.localhttp}/get/messages`)
      .then((result) => {
        console.log(result);
        this.setState({
          allMsg: result.data.mes,
          isLoading: false,
        })

      }).catch((error) => {
        console.log(error);
      })
  }
  onHandleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${config.localhttp}/api/message`, { message: this.state.msg , email:this.props.email})
      .then((success) => {
        console.log(success);
        this.setState({
          msg: '',
        })
        debugger;
      }).catch((error) => {
        console.log(error);
      });
    // console.log(this.state.msg);
    // onlineStatus(this.state.msg);
  }
  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  CompInARow = (...args) => {
    if (Object.is(args.length, 2)) {
      return (
        <div style={{ position:'absolute',bottom:50 ,display: 'flex', flexDirection: 'row' }} >
          <div>
            {args[0]}
          </div>
          <div>
            {args[1]}
          </div>
        </div>
      );
    }
  }
  render() {
    debugger;
const { allMsg } = this.state;
debugger;
    return (
      <div style={{padding:0}} >
        <h1>Chat</h1>
        <div class="container">
            {this.state.isLoading ? 'Loading...' : <DisplayMessage email={this.props.email} data={allMsg} />}
          {/* {allMsg.map((item=> <li key={item}>{item}</li>))}  */}
          <form onSubmit={this.onHandleSubmit} >
            <div class="form-group">
              {/* <small id="helpId" class="form-text text-muted">Message</small> */}
            </div>
            {this.CompInARow(<input required type="text" class="form-control" onChange={this.onHandleChange} value={this.state.msg} name="msg" aria-describedby="helpId" placeholder="Enter Message" />, <input name="submit" id="" class="btn btn-primary" type="submit" value="Add" />
            )}
          </form>

        </div>
      </div>
    );
  }
}

export default Form;
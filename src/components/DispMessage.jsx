import React , { Component } from 'react';
import './../css/styles.css';
import { Badge } from 'react-bootstrap';

/**
 * .list-group{
  -webkit-overflow-scrolling: touch;
    max-height: 300px;
    margin-bottom: 10px;
    overflow:scroll;
}
 */
class DisplayMessage extends Component {
  render() { 
    let newProps = {...this.props};
    let {email} = newProps; 
     
    // const list = this.props.data.reverse();
    return ( 
      <div>
        <h4>Message</h4>  
<ul class="list-group anyClass">
      { Object.is(this.props.data.length,0) ? <p style={{textAlign:'center'}} >no message</p>  : this.props.data.map((item,index)=> <li className="list-group-item" key={index} > <Badge onmo style={{borderRadius:20}} variant="secondary" >{item.email.charAt(0)}</Badge> {item.message}</li>)  } 
</ul>
        </div>
     );
  }
}
 
export default  DisplayMessage;
import React, { Component } from 'react';
import { Col ,ListGroup , Row ,ListGroupItem , Badge } from 'react-bootstrap';

export default function ListOfFriend(props) {
  debugger;

  
   var filtered=[];
   var listOfTags=[];
   var keys=[];
   if(props.email !== ''){
    listOfTags = props.data.filter((item)=> item.email !== props.email)
    debugger;
   keys = ['email'];
    filtered = listOfTags.filter(
        (s => o => 
            (k => !s.has(k) && s.add(k))
            (keys.map(k => o[k]).join('|'))
        )
        (new Set())
    );
   
  }else{
    listOfTags = props.data;
    keys = ['email'];
    filtered = listOfTags.filter(
        (s => o => 
            (k => !s.has(k) && s.add(k))
            (keys.map(k => o[k]).join('|'))
        )
        (new Set())
    );
   
  }

   
 
    
  return (
    <React.Fragment>
      <ListGroup>
      {props.data && props.data.map((item,index)=>(
        <ListGroup.Item action>
          <Row>
          <Col style={{flexGrow:0}} >
          <h4>
          <Badge variant="secondary" >{item.email.charAt(0)}</Badge>
          </h4>
          </Col>
          {item.email}
          <Col>
          { item.isOnline ? <Badge variant='success'>online</Badge> : <Badge variant='dark'>offline</Badge>  } 
          </Col>
          </Row> 
         </ListGroup.Item>
        ))}
        </ListGroup>
    </React.Fragment>
  );
}

import React , { Suspense , lazy } from 'react';
import DemoLoginForm from '../Container/LoginForm/DemoLoginForm';
import '../components/LoginDemo.css';

const LoginDemo = () => {
  return (
    <div>
       <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 mainDiv" style={{padding:0,marginTop:20,boxShadow:'5px 5px 5px grey'}} >
            
             <DemoLoginForm /> 
          </div>
          <div class="col-sm-4"></div>
        </div>
      </div> 
    </div>
  );
};

export default LoginDemo;
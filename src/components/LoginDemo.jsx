import React , { Suspense , lazy } from 'react';
import '../components/LoginDemo.css';
const DemoLoginForm = lazy(() => import('../Container/LoginForm/DemoLoginForm'));

const LoginDemo = () => {
  return (
    <div>
       <div className="container">
        <div className="row" style={{marginTop:30}} >
          <div className="col-sm-3"></div>
          <div className="col-sm-6 mainDiv" style={{padding:0,marginTop:20,boxShadow:'0px 0px 5px 5px grey' ,textAlign:'center'}} >
          <Suspense fallback={<div class="spinner-border text-primary" ></div>} ><DemoLoginForm /></Suspense> 
          </div>
          <div class="col-sm-3"></div>
        </div>
      </div> 
    </div>
  );
};

export default LoginDemo;
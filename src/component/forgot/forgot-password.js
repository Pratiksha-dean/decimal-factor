import React from 'react';
import { Link } from 'react-router-link'
import "../../styles/master.css";


function ForgotPassword() {
  return (
    <div className="App login-page">
      <div className="container-fluid">
        <div className="row">
        
         <div className="login-screen">
         <img src={require('../../images/login-logo.png')} alt="" className="login-logo" />
         <div className="login-box">
           <h3>Forgot Password?</h3>
           <h5>No worries, we got your back! Enter your e-mail address below to reset your password.</h5>
           <form>
            
             <div className="form-group">
               <label>Email Address</label>
               <input type="email" name="Enter email address" placeholder="Enter email address" className="form-control" />
             </div>
             
           
             <button className="btn btn-primary login-btn">Submit <i className="fa fa-chevron-right"></i></button>
             <div className="divider"></div>
              <div className="form-group loginnow-btn">
                <p>Back to Login? <Link href="/login">Click Here</Link></p>
              </div>

           </form>
         </div>
         <div className="copy-right">
           <p>© Copyright 2022 | decimalFactor</p>
         </div>
         </div>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

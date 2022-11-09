import React from 'react';
import { Link } from 'react-router-link'
import "../../styles/master.css";


function InnerChangePassword() {
  return (
    <div className="App login-page">
      <div className="container-fluid">
        <div className="row">
        
         <div className="login-screen">
         <img src={require('../../images/login-logo.png')} alt="" className="login-logo" />
         <div className="login-box">
           <h3>Change Password?</h3>
           <h5>No worries, we got your back! Enter your e-mail address below to reset your password.</h5>
           <form>
           <div className="form-group">
               <label>Current Password</label>
               <input type="password" name="Current Password" placeholder="Current Password" className="form-control" />
             </div>
             <div className="form-group">
               <label>Change Password</label>
               <input type="password" name="Change Password" placeholder="Change Password" className="form-control" />
             </div>
             <div className="form-group">
               <label>Confirm Change Password</label>
               <input type="password" name="Confirm Change Password" placeholder="Confirm Change Password" className="form-control" />
             </div>
             
           
             <button className="btn btn-primary login-btn">Submit <i className="fa fa-chevron-right"></i></button>
             <div className="divider"></div>
             

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

export default InnerChangePassword;

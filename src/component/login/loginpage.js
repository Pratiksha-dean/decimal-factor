import React from 'react';
import { Link } from 'react-router-link'
import "../../styles/master.css";


function Login() {
  return (
    <div className="App login-page">
      <div className="container-fluid">
        <div className="row">
        
         <div className="login-screen">
         <img src={require('../../images/login-logo.png')} alt="" className="login-logo" />
         <div className="login-box">
           <h3>Login to Your Account</h3>
           <h5>Welcome back! Please enter your details below...</h5>
           <form>
             <div className="form-group">
               <label>Email Address</label>
               <input type="text" name="Enter email address" placeholder="Enter email address" className="form-control" />
             </div>
             <div className="form-group">
               <label>Password</label>
               <input type="password" name="Enter Password" placeholder="Enter Password" className="form-control" />
             </div>
             <div className="form-group">
               <div className="remember-div">
              <input type="checkbox" name="remember me" /> <label>Remember Me</label>
              </div>
              <div className="forgot-div">
              <Link href="/forgot-password">Forgot Password?</Link>
              </div>
             </div>
             <button className="btn btn-primary login-btn">Login Now <i className="fa fa-chevron-right"></i></button>
              <div className="divider"></div>
              <div className="form-group loginnow-btn">
                <p>Don’t have an Account? <Link href="#">Create Account</Link></p>
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

export default Login;

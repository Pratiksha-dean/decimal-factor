import React from 'react';
import { Link } from 'react-router-link'
import "../../styles/master.css";


function Authentication() {
  return (
    <div className="App login-page">
      <div className="container-fluid">
        <div className="row">
        
         <div className="login-screen">
         <img src={require('../../images/login-logo.png')} alt="" className="login-logo" />
         <div className="login-box">
           <h3>Application Authantication</h3>
           <h5>Please Download and isntall Google authenticate app on your phone, and scan followin QR code to configure your device.</h5>
           <form>
             <div className="form-group">
             <img src={require('../../images/qr-code.png')} alt="" className="qr-code-img" />
             </div>
             <div className="form-group">
               <label>Enter Authentication Code</label>
               <input type="text" name="Enter Authentication Code" placeholder="6 Digit Code" className="form-control" />
             </div>
             
           
             <button className="btn btn-primary login-btn">Validate <i className="fa fa-chevron-right"></i></button>
             
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

export default Authentication;

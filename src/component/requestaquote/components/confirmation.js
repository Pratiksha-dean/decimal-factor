import React from 'react';

function Confirmation() {
  return (
    
   <div className="right-panel">
     <h2>Confirmation</h2>
     <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </h5>
    
      <div className="confirmation-screen">
        <h3><span><i className="fa fa-check-circle" aria-hidden="true"></i></span> Account Created Successfully!</h3>
        <p>Thank you for requesting a quote, our funding specialist will be in touch within the next 24 Hours with your personalised quote. Additionally, you can now also access your account to view key financial insights and further complete your application to provide the most accurate offers.</p>
      </div>
      <div className="note"><p><span><i className="fa fa-exclamation-circle" aria-hidden="true"></i></span> Need to verify email before accessing account.</p></div>
     <button type="button" className="btn btn-primary next-btn" data-toggle="modal" data-target="#confirmationModalCenter">Access Account <i className="fa fa-chevron-right"></i></button>
   
   </div>
  );
}

export default Confirmation;

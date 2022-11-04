import React from 'react';

function VerifyAlert() {
  
  
  return (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
    <strong> <i className="fa fa-check-circle" aria-hidden="true"></i> Your email address has been verified successfully!</strong> 
    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    Dismiss <span aria-hidden="true">&times;</span>
    </button>
  </div>
  );
}

export default VerifyAlert;

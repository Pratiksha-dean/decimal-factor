import React from 'react';

function ProvideConsent() {
  
  
  return (
    <div className="dashboard-box position-relative card dashboard-card">
                <div className="review-application">
                   <h3>Provide Consent</h3>
                   <div className="row">
                     <div className="col-md-12">
                   <div className="form-group consent-panel">
                        
                        <input type="checkbox"  name="Consent to run a soft credit check" className="upload-checkbox" />
                        <label>Consent to run a soft credit check</label>
                      </div>
                </div></div>
                <div className="row">
                <div className="col-md-12">
                      <div className="form-group consent-panel">
                        
                        <input type="checkbox" name="Consent to provide financial information to lenders" className="upload-checkbox" />
                        <label>Consent to provide financial information to lenders</label>
                      </div>
  
                   </div></div>
  
                 </div>
               
                
                </div>
  );
}

export default ProvideConsent;

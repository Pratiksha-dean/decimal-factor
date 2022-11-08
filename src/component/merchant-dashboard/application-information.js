import React from 'react';
import Header from '../header/header';
import SiderBarMenu from './component/sidebar'


function ApplicationInformation() {
  
  
  return (

    
     <div className="dashboard-panel">
     <Header />
      <div className="dashboard-body bg-change-color">
      <div className="container-fluid  merchant-body">
     
      <SiderBarMenu />
  
      <div className="right-panel-main">
      <h3><i className="fa fa-laptop" aria-hidden="true"></i>  Application Information </h3>
    <div className="dashboard-box position-relative card dashboard-card">
                <div className="review-application">
                 
                   <div className="row">
                     <div className="col-md-4">
                      <div className="form-group amount-required">
                        <label>Amount Required</label>
                        <span className="dollor-col"><i className="fa fa-usd"></i></span>
                        <input type="text" placeholder="90,000" className="form-control" name="Amount Required" />
                      </div>
                   </div>
                   <div className="col-md-4">
                      <div className="form-group">
                        <label>Purpose of Loan</label>
                        <select  placeholder="Enter purpose of loan" className="form-control" name="Purpose of Loan" >
                        <option>Enter purpose of loan</option>
                        <option>Enter purpose of loan</option>
                        </select>
                       
                      </div>
                   </div>
  
                   <div className="col-md-4">
                   <div className="form-group">
                      <label>Term of Funds Required (Months)</label>
                      <input type="text" placeholder="12" className="form-control" name="Term of Funds Required (Months)" />
                    </div>
                   </div>
                   <div className="col-md-4">
                   <div className="form-group business-entity">
                    <label>Business Entity</label>
                    <select  placeholder="Enter purpose of loan" className="form-control" name="Business Entity" >
                      <option>Select business entity</option>
                      <option>Select business entity</option>
                      </select>
                  </div>
       
                   </div>
                   <div className="col-md-4">
                   <div className="form-group business-entity">
                      <label>Business Name</label>
                      <input type="text" placeholder="Business Name" className="form-control" name="Business Name" />
                    </div>
                   </div>
                   
  
                   </div>
                   <button className="btn btn-primary save-btn next-btn">Save <i className="fa fa-file-image-o"></i></button>
  
                 </div>
               
                
                </div>
      </div>
      </div>
      </div>
     </div>
   
  );
}

export default ApplicationInformation;

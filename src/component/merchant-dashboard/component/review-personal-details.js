import React from 'react';
import ReactTooltip from 'react-tooltip';


function ReviewPersonalDetails() {
  
  
  return (
    <div className="dashboard-box position-relative card dashboard-card">
                <div className="review-application">
                   <h3>Review Personal Details</h3>
                   <div className="row">
                     
                   <div className="col-md-4">
                      <div className="form-group">
                        <label>First Name</label>
                        <select  placeholder="First Name" className="form-control" name="First Name" >
                        <option>First Name</option>
                        <option>First Name</option>
                        </select>
                       
                      </div>
                   </div>
                   <div className="col-md-4">
                      <div className="form-group ">
                        <label>Last Name</label>
                        
                        <input type="text" placeholder="Last Name" className="form-control" name="Last Name" />
                      </div>
                   </div>
  
                   <div className="col-md-4">
                   <div className="form-group">
                      <label>Email Address <tooltip><i className="fa fa-info-circle" data-tip="This is the email address where all communication will sent to."><ReactTooltip className={"tooltippanel"} /></i></tooltip></label>
                      <input type="text" placeholder="Email Address" className="form-control" name="Email Address" />
                    </div>
                   </div>
                  
                   <div className="col-md-4">
                   <div className="form-group business-entity">
                      <label>Phone Number</label>
                      <input type="number" placeholder="9898989890" className="form-control" name="Phone Number" />
                    </div>
                   </div>
                   
  
                   </div>
  
                 </div>
               
                
                </div>
  );
}

export default ReviewPersonalDetails;

import React from 'react';
import ReactTooltip from 'react-tooltip';
import Header from '../header/header';
import SiderBarMenu from './component/sidebar';
import StickyBox from "react-sticky-box";


function PersonalDetails() {
  
  
  return (
   
    <div className="dashboard-panel">
    <Header />
     <div className="dashboard-body bg-change-color">
     <div className="container-fluid  merchant-body">
     <div style={{display: "flex", alignItems: "flex-start", width:"100%"}}>
      <StickyBox>
      <SiderBarMenu />
      </StickyBox>
 
     <div className="right-panel-main">
     <h3><i className="fa fa-user" aria-hidden="true"></i>  Personal Details</h3>
    <div className="dashboard-box position-relative card dashboard-card">
                <div className="review-application">
                  
                   <div className="row">
                     <div className="col-md-8">
                       <div className="row">
                   <div className="col-md-6">
                      <div className="form-group">
                        <label>First Name</label>
                        <select  placeholder="First Name" className="form-control" name="First Name" >
                        <option>First Name</option>
                        <option>First Name</option>
                        </select>
                       
                      </div>
                   </div>
                   <div className="col-md-6">
                      <div className="form-group ">
                        <label>Last Name</label>
                        
                        <input type="text" placeholder="Last Name" className="form-control" name="Last Name" />
                      </div>
                   </div>
  
                   <div className="col-md-6">
                   <div className="form-group">
                      <label>Email Address <tooltip><i className="fa fa-info-circle" data-tip="This is the email address where all communication will sent to."><ReactTooltip className={"tooltippanel"} /></i></tooltip></label>
                      <input type="text" placeholder="Email Address" className="form-control" name="Email Address" />
                    </div>
                   </div>
                  
                   <div className="col-md-6">
                   <div className="form-group business-entity">
                      <label>Phone Number</label>
                      <input type="number" placeholder="9898989890" className="form-control" name="Phone Number" />
                    </div>
                   </div>
                   <div className="col-md-12">
                   <div className="form-group business-entity">
                      <label>Address</label>
                      <input type="text" placeholder="Address" className="form-control" name="Address" />
                    </div>
                   </div>


                   </div>
                   </div>
                   <div className="col-md-4">
                  
                     <div className="upload-image">
                       <input type="file" id="input-file" name="upload image" className="" />
                       <label for='input-file'><img src={require('../../images/upload-img.png')} alt="" className="upload-img" /></label>
                       <button className="btn btn-primary upload-image">Upload Image</button>
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
    </div>
 
  );
}

export default PersonalDetails;

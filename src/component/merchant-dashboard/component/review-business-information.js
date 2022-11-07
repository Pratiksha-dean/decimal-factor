import React from 'react';

const Accordion = ({ title, children }) => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <div className="accordion-wrapper">
      
      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
        >
        {title}
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

function ReviewBusinessInformation() {
  
  
  return (
    <div className="dashboard-box position-relative card dashboard-card">
                <div className="review-application">
                   <h3>Review Business Information</h3>
                   <div className="row">
                   <div className="col-md-4">
                      <div className="form-group">
                      <label>Business Sector</label>
       <select  placeholder="Enter business sector" className="form-control" name="Business Sector" >
       <option value="Select">Select Business Sector </option>
                                            <option value="49001">Hospitality - Caf�</option>
                                            <option value="49002">Hospitality - Restaurant</option>
                                            <option value="49003">Hospitality - Bar</option>
                                            <option value="49004">Hospitality - NightClub</option>
                                            <option value="49005">Hospitality - Pub - Gastro</option>
                                            <option value="49006">Hospitality - Pub - Wet-led</option>
                                            <option value="49007">Hospitality - Fast Food</option>
                                            <option value="49008">Retail - Market Stalls</option>
                                            <option value="49009">Retail - Mini Mart</option>
                                            <option value="49010">Retail - Off Licence</option>
                                            <option value="49011">Retail - Shop High Street</option>
                                            <option value="49012">Retail - Shop Online</option>
                                            <option value="49013">Retail - Shop Other</option>
                                            <option value="49014">Petrol Station</option>
                                            <option value="49015">MOT Garage/Auto repair</option>
                                            <option value="49016">Manufacturer</option>
                                            <option value="49017">Agriculture</option>
                                            <option value="49018">Accountant</option>
                                            <option value="49019">Architect</option>
                                            <option value="49020">Gym</option>
                                            <option value="49021">Vets</option>
                                            <option value="49022">Dentist</option>
                                            <option value="49023">Hotel</option>
                                            <option value="49024">Music Shop</option>
                                            <option value="49025">Electronics Shop</option>
                                            <option value="49026">Wholesale</option>
                                            <option value="49027">Other</option>
         </select>
                       
                      </div>
                   </div>
                     <div className="col-md-4">
                     <div className="form-group business-date">
                      <label>Business Start Date</label>
                      <input type="date" placeholder="Enter business start date" className="form-control" name="Business Start Date" />
                    </div>
                   </div>
                   <div className="col-md-4">
                   <div className="form-group monthly-card-payment">
                    <label>Monthly Card Takings</label>
                    <span className="dollor-col"><i className="fa fa-usd"></i></span>
                    <input type="text" placeholder="90,000" className="form-control" name="Monthly Card Takings" />
                  </div>
       
                   </div>
                   
                   <div className="col-md-4">
                   <div className="form-group Term-found">
                    <label>Business Invoiced</label>
                    <span className="dollor-col"><i className="fa fa-usd"></i></span>
                    <input type="text" placeholder="Business Invoiced" className="form-control" name="Business Invoiced" />
                  </div>
                   </div>
                   <div className="col-md-4">
                   <div className="form-group">
                    <label>Business Number</label>
                    
                    <input type="text" placeholder="9898979998" className="form-control" name="Business Number" />
                  </div>
                   </div>
                    </div>
                  <div className="row">
                    <div className="col-md-12">
                    <div className="director-panel">
                      <h4>Directors of Business Name</h4>
                      <Accordion title="Nagalingam Ramanan">
                        <div className="director-field">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <input type="checkbox" name="primary" className="primary-checkbox" / >
                                  <label className="set-primary">Set as Primary</label>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>First Name</label>
                                <input type="text" name="Joana" className="form-control" placeholder="Joana" />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" name="Last Name" className="form-control" placeholder="Last Name" />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Nature of Control</label>
                                <input type="text" name="Nature of Control" className="form-control" placeholder="Nature of Control" />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>% of Total Share Count</label>
                                <input type="text" name="% of Total Share Count" className="form-control" placeholder="% of Total Share Count" />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Email Address</label>
                                <input type="text" name="Email Address" className="form-control" placeholder="Email Address" />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Phone</label>
                                <input type="text" name="Phone" className="form-control" placeholder="Phone" />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" name="Date of Birth" className="form-control" placeholder="04/11/2022" />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Postcode</label>
                                <input type="text" name="Postcode" className="form-control" placeholder="Postcode" />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Choose Address</label>
                                <input type="text" name="Choose Address" className="form-control" placeholder="Choose Address" />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                          <div className="col-md-3">
                              <div className="form-group">
                                <label>House Number</label>
                                <input type="text" name="House Number" className="form-control" placeholder="House Number" />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>House Name</label>
                                <input type="text" name="House Name" className="form-control" placeholder="House Name" />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Street</label>
                                <input type="text" name="Street" className="form-control" placeholder="Street" />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>County</label>
                                <input type="text" name="County" className="form-control" placeholder="County" />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Town</label>
                                <input type="text" name="Town" className="form-control" placeholder="Town" />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Residential Status</label>
                                <input type="text" name="Residential Status" className="form-control" placeholder="Residential Status" />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Living Since</label>
                                <input type="text" name="Living Since" className="form-control" placeholder="Living Since" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Accordion>
                      <Accordion title="Joanna Kii">
                       
                      </Accordion>
                      <Accordion title="Cajetan Kii">
                        
                      </Accordion>
                  </div>
                  </div>
                  </div>
                 </div>
               
                
                </div>
  );
}

export default ReviewBusinessInformation;

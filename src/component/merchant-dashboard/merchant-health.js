import React, { useState } from "react";
import "../../styles/master.css";
import Header from '../header/header';
import SiderBarMenu from './component/sidebar'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Codat from '../Codat';
import { Link } from "react-router-dom";

 

function checkMe(selected)
{
if(selected)
{
document.getElementById("divcheck").style.display = "block";
} 
else
{
document.getElementById("divcheck").style.display = "none";
}

}



function MerchantHealth() {

  const [showPanel, togglePanel] = useState(false);
  const [showPanel2, togglePanel2] = useState(false);
  const [showPanel3, togglePanel3] = useState(false);
  const [showPanel4, togglePanel4] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    
     <div className="dashboard-panel">
     <Header />
      <div className="dashboard-body bg-change-color">
      <div className="container-fluid merchant-body">
     
      <SiderBarMenu />
  
      <div className="right-panel-main">
      <h3><i className="fa fa-id-card" aria-hidden="true"></i> Merchant Health Insights </h3>
      <div className="dashboard-box position-relative card dashboard-card no-padding">
        <div className="review-application">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Banking Insights</Tab>
            <Tab>Accounting Insights</Tab>
            <Tab>Business Credit Score Insights</Tab>
          </TabList>

          <TabPanel>
          <section>
                {!showPanel && <button class="btn btn-primary banking-btn" onClick={() => togglePanel(!showPanel) } >Link To Banking <i class="fa fa-chevron-right" aria-hidden="true"></i></button>}
             
              {showPanel && ( <div className="banking-panel">
                <div className="row">
                  <div className="col-md-9">
              <div class="banking-url">
                <div class="form-group"><label>Banking URL</label>
                <input type="text" name="url" placeholder="https://www.domain.com/dummy-url-will-be-here" class="form-control" />
                  <button class="copyicon-col btn btn-primary"><i class="fa fa-clone" aria-hidden="true"></i></button>
                  </div></div>
                <div class="banking-url">
                  <div class="form-group"><label>Status</label>
                    <input type="text" name="Status" placeholder="Unlinked" class="form-control" />
                      <button class="checkstatus-btn btn btn-primary" onClick={() => togglePanel2(!showPanel2) }>Check status</button>
                  </div>
                 </div>
                 </div>
                  <div className="col-md-3">
                 
                  </div>
                 </div>
                 {showPanel2 && ( <div className="after-check-status">
                
                   <div className="download-panel">
                 <button class="btn btn-primary banking-btn download-btn" onClick={handleOpen}> 
                 <i class="fa fa-download" aria-hidden="true"></i> Download <i class="fa fa-chevron-down" aria-hidden="true"></i>
                 </button>
                 {open ? (
                  <ul className="menu">
                    <li className="menu-item">
                    <Link to="#">PDF last 90 days</Link>
                    </li>
                    <li className="menu-item">
                    <Link to="#">PDF underwriters</Link>
                    </li>
                    <li className="menu-item">
                    <Link to="#">PDF raw transactions</Link>
                    </li>
                    <li className="menu-item">
                    <Link to="#">PDF full data range</Link>
                    </li>
                    <li className="menu-item">
                      <Link to="#">CSV all transactions</Link>
                    </li>
                  </ul>
                ) : null}
                </div>
                 <div className="row">
                   <div className="col-md-6">
                     <div className="financial-service">
                       <h4>Financial Services <span>(0)</span></h4>
                       <div className="scroll-bar-2">
                       <div className="card-1">
                         <p><strong>Credit Cards</strong></p>
                         <p>0 credit transaction (on --)</p>
                         <p><strong>1</strong>  debit transactions (last on <span>2020-06-15T00:00:00)</span></p>
                        <div className="box-id-1">
                          <p><strong>total in: +£0</strong></p>
                          <p><strong>monthly av: +£0</strong></p>
                        </div>
                        <div className="box-id-2">
                          <p><strong>total out: -£208.14</strong></p>
                          <p><strong>monthly av: -£208.14</strong></p>
                        </div>
                       </div>
                       <div className="card-1 card-2">
                         <p><strong>Credit Cards</strong></p>
                         <p>0 credit transaction (on --)</p>
                         <p><strong>1</strong>  debit transactions (last on <span>2020-06-15T00:00:00)</span></p>
                        <div className="box-id-1">
                          <p><strong>total in: +£0</strong></p>
                          <p><strong>monthly av: +£0</strong></p>
                        </div>
                        <div className="box-id-2">
                          <p><strong>total out: -£208.14</strong></p>
                          <p><strong>monthly av: -£208.14</strong></p>
                        </div>
                       </div>
                       </div>
                       <div className="card-bottom">
                       <div className="box-id-1">
                          <p><strong>total in: +£0</strong></p>
                          <p><strong>monthly av: +£0</strong></p>
                        </div>
                        <div className="box-id-2">
                          <p><strong>total out: -£208.14</strong></p>
                          <p><strong>monthly av: -£208.14</strong></p>
                        </div>
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className=" financial-service income-panel">
                       <h4>Income (2)</h4>
                       <div className="scroll-bar-2">
                       <div className="card-1 white-bg">
                         <p><strong>Miscellaneous Transfers</strong></p>
                         <p>0 credit transaction (on --)</p>
                         <p><strong>1</strong>  debit transactions (last on <span>2020-06-15T00:00:00)</span></p>
                        <div className="box-id-1">
                          <p><strong>total in: +£0</strong></p>
                          <p><strong>monthly av: +£0</strong></p>
                        </div>
                        <div className="box-id-2">
                          <p><strong>total out: -£208.14</strong></p>
                          <p><strong>monthly av: -£208.14</strong></p>
                        </div>
                       </div>
                       </div>
                       <div className="card-bottom bottom-2">
                       <div className="box-id-1">
                          <p><strong>total in: +£0</strong></p>
                          <p><strong>monthly av: +£0</strong></p>
                        </div>
                        <div className="box-id-2">
                          <p><strong>total out: -£208.14</strong></p>
                          <p><strong>monthly av: -£208.14</strong></p>
                        </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="row">
                   <div className="col-md-6">
                     <div className="financial-service">
                       <h4>Regular Outgoings <span>(0)</span></h4>
                       <div className="scroll-bar-2">
                     
                       
                       </div>
                      
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className=" financial-service income-panel">
                       <h4>Event Feed (4)</h4>
                       <div className="scroll-bar-2">
                       <div className="card-1 white-bg">
                         <p><strong>Significant transaction</strong></p>
                          <p>Last credit on 2020-06-18T00:00:00+01:00</p>
                          <p><strong>null</strong></p>
                          <p>Last credit on 2020-06-05T00:00:00+01:00</p>
                          <p><strong>Significant transaction</strong></p>
                          <p>Last credit on 2020-05-31T00:00:00+01:00</p>
                          <p><strong>Change in Income Profile (2020 May)</strong></p>
                          <p>Last credit on 2020-05-01T00:00:00+01:00</p>
                          <p><strong>null</strong></p>
                          <p>Last credit on 2020-06-05T00:00:00+01:00</p>
                          <p><strong>Significant transaction</strong></p>
                          <p>Last credit on 2020-06-18T00:00:00+01:00</p>
                          <p><strong>null</strong></p>
                          <p>Last credit on 2020-06-05T00:00:00+01:00</p>
                          <p><strong>Significant transaction</strong></p>
                          <p>Last credit on 2020-05-31T00:00:00+01:00</p>
                          <p><strong>Change in Income Profile (2020 May)</strong></p>
                          <p>Last credit on 2020-05-01T00:00:00+01:00</p>
                          <p><strong>null</strong></p>
                          <p>Last credit on 2020-06-05T00:00:00+01:00</p>
                       </div>
                       </div>
                      
                     </div>
                   </div>
                 </div>
                 </div> )}
              </div> )}
              </section>
          </TabPanel>
          <TabPanel>
          <section>
              {!showPanel3 && <button class="btn btn-primary accounting-btn" onClick={() => togglePanel3(!showPanel3) }>Link To Accounting <i class="fa fa-chevron-right" aria-hidden="true"></i></button>}
              {showPanel3 && (<div className="accounting-panel">
              <div class="banking-url">
                <div class="form-group">
                  <label>Accounting URL</label>
                  <input type="text" name="url" placeholder="https://www.domain.com/dummy-url-will-be-here" class="form-control" />
                  <button class="copyicon-col btn btn-primary"><i class="fa fa-clone" aria-hidden="true"></i></button></div></div>
                  <div class="banking-url">
                    <div class="form-group">
                      <label>Status</label>
                      <input type="text" name="Status" placeholder="Unlinked" class="form-control" />
                      <button class="checkstatus-btn btn btn-primary" onClick={() => togglePanel4(!showPanel4) } >Check status</button></div></div>
                      {showPanel4 && ( <div className="data-panel">
                       <h3>Accounting Data</h3> 
                      
                        <Codat />
                      </div>)}
              </div>)}
              </section>
          </TabPanel>
          <TabPanel>  <section>
             <div className="business-panel">
               <div className="row">
                 <div className="col-md-12"> 
                 <div className="form-group">
                        
                        <input type="checkbox" onClick={(e)=>checkMe(e.target.checked)} name="Upload Bank Statement Copies Instead" className="upload-checkbox" />
                        <label>Some Checkbox condition will be here for KYC.</label>
                      </div>
                 </div>
                <div className="col-md-12">
                  
                <div className="upload-doc-panel" id="divcheck" style={{display:"none"}}>
                <div className="row">
                    <div className="col-md-5">
                      <div className="upload-area" >
                      <p><strong>Please upload the following document :</strong></p>
                      <ul>
                        <li>Proof of ID.</li>

                          <li>Proof of Address.</li>
                      </ul>
                      <div className="uploaded-file">
                        <p><strong>File Uploaded:</strong></p>
                        <p><span>MY-ID-PROOF.JPG</span> <i className="fa fa-trash"></i></p>
                      </div>
                    
                      </div>
                    </div>
                    <div className="col-md-1"></div>
                <div className="col-md-6">
                <div className="upload-box" >
                     
                     <input type="file" name="file" className="upload-doc" />
                     <button className="btn btn-primary upload-btn">Upload</button>
                     <p>Max file size: 2MB each</p>
                     <p>Supported file types: PDF, JPG, PNG Bitmap etc.</p>
                   </div>
                </div>
                
                </div>
                <button className="btn btn-primary save-btn next-btn">Save <i className="fa fa-file-image-o"></i></button>
  
                </div>
                </div>
                </div>
             </div>
              </section></TabPanel>
        </Tabs>
         
        </div></div>
      </div>
      </div>
      </div>
     </div>
   
  );
} 

export default MerchantHealth;

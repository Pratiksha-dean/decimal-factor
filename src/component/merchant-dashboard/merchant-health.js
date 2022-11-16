import React, { useState, useEffect } from "react";
import "../../styles/master.css";
import Header from '../header/header';
import SiderBarMenu from './component/sidebar'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Codat from '../Codat';
import { Link } from "react-router-dom";
import StickyBox from "react-sticky-box";
import { getUserDetails } from '../login/loginpage'
import { getBankingFinancialServices, getBankingIncome, getRegularOutgoings, getEventFeed} from '../../request'

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
  const [linkToBaking,setLinkToBanking]=useState(false);

  const [financialServicesSummary, setFinancialServicesSummary]=useState([])
  const [incomeAnalysisSummary, setIncomeAnalysisSummary]=useState([])
  const [regularOutgoingsSummary, setRegularOutgoingsSummary]=useState([])
  const [eventFeedSummary, setEventFeedSummary]=useState([])
  const [eventCount, setEventCount]=useState(0)

  //Financial Services Aggregate
  const [ financialServicesTotalIn, setFinancialServicesTotalIn]=useState(0)
  const [ financialServicesTotalOut, setFinancialServicesTotalOut]=useState(0)
  const [ financialServicesMonthlyAvgIn, setFinancialServicesMonthlyAvgIn]=useState(0)
  const [ financialServicesMonthlyAvgOut, setFinancialServicesMonthlyAvgOut]=useState(0)

  //Income Analysis Aggregate
  const [ incomeAnalysisTotalIn, setIncomeAnalysisTotalIn]=useState(0)
  const [ incomeAnalysisTotalOut, setIncomeAnalysisTotalOut]=useState(0)
  const [ incomeAnalysisMonthlyAvgIn, setIncomeAnalysisMonthlyAvgIn]=useState(0)
  const [ incomeAnalysisMonthlyAvgOut, setIncomeAnalysisMonthlyAvgOut]=useState(0)


  const lead_accountScore=6137
  const handleOpen = () => {
    setOpen(!open);
  };

  const userDetails=getUserDetails()

  useEffect(() => {
    if (userDetails && userDetails.lead_id) {
      console.log("lead id", userDetails.lead_id )
      getBankingFinancialServices(lead_accountScore).then((data) => {
        console.log('data', data)
        let summaries=data.response.data.summaries
        setFinancialServicesSummary(summaries)
        let totalIn=0
        let totalOut=0
        let monthlyAvgIn=0
        let monthlyAvgOut=0

        summaries.map((summary)=>{
          totalIn=Number(totalIn)+Number(summary.creditSummary.total)
          totalOut=Number(totalOut)+Number(summary.debitSummary.total)
          monthlyAvgIn=Number(monthlyAvgIn)+Number(summary.creditSummary.monthlyAverage)
          monthlyAvgOut=Number(monthlyAvgOut)+Number(summary.debitSummary.monthlyAverage)
        })

        setFinancialServicesTotalIn(totalIn)
        setFinancialServicesTotalOut(totalOut)
        setFinancialServicesMonthlyAvgIn(monthlyAvgIn)
        setFinancialServicesMonthlyAvgOut(monthlyAvgOut)
      })
  
      getBankingIncome(lead_accountScore).then((data) => {
        console.log('data', data)
        let summaries=data.response.data.summaries
        setIncomeAnalysisSummary(data.response.data.summaries)
        let totalIn=0
        let totalOut=0
        let monthlyAvgIn=0
        let monthlyAvgOut=0

        summaries.map((summary)=>{
          totalIn=Number(totalIn)+Number(summary.creditSummary.total)
          totalOut=Number(totalOut)+Number(summary.debitSummary.total)
          monthlyAvgIn=Number(monthlyAvgIn)+Number(summary.creditSummary.monthlyAverage)
          monthlyAvgOut=Number(monthlyAvgOut)+Number(summary.debitSummary.monthlyAverage)
        })

        setIncomeAnalysisTotalIn(totalIn)
        setIncomeAnalysisTotalOut(totalOut)
        setIncomeAnalysisMonthlyAvgIn(monthlyAvgIn)
        setIncomeAnalysisMonthlyAvgOut(monthlyAvgOut)
      })
  
      getRegularOutgoings(lead_accountScore).then((data) => {
        console.log('data', data)
        setRegularOutgoingsSummary(data.response.data.summaries)
      })
  
      getEventFeed(lead_accountScore).then((data) => {
        console.log('data', data)
        setEventFeedSummary(data.response.months)
        console.log('months', eventFeedSummary)
        let evCount=0
        eventFeedSummary.map((month)=>{
          month.data.events.map((ev)=>{
            evCount+=1
          })
        })
        setEventCount(evCount)
      //   for(let month of eventFeedSummary){
      //     console.log("month", month)
      //     let events=month.data.events

      //     for(let event of events){
      //       console.log("event", event)
      //       setEventCount(eventCount+1)
      //     }
      //   }
      //   console.log("event count", eventCount)
      //   // setEventCount(evCount)
       })
    }
  }, [])

  return (
    <div className="dashboard-panel">
      <Header />
      <div className="dashboard-body bg-change-color">
        <div className="container-fluid merchant-body">
          <div
            style={{ display: "flex", alignItems: "flex-start", width: "100%" }}
          >
            <StickyBox>
              <SiderBarMenu />
            </StickyBox>
            <div className="right-panel-main">
              <h3>
                <i className="fa fa-id-card" aria-hidden="true"></i> Financial
                Health Insights{" "}
              </h3>
              <div className="dashboard-box position-relative card dashboard-card no-padding">
                <div className="review-application">
                  <Tabs
                    selectedIndex={tabIndex}
                    onSelect={(index) => setTabIndex(index)}
                  >
                    <TabList>
                      <Tab>Banking Insights</Tab>
                      <Tab>Accounting Insights</Tab>
                      <Tab>Business Credit Score Insights</Tab>
                    </TabList>

                    <TabPanel>
                      <section>
                        {!showPanel && (
                          <button
                            class="btn btn-primary banking-btn"
                            onClick={() => togglePanel(!showPanel)}
                          >
                            Link To Banking{" "}
                            <i
                              class="fa fa-chevron-right"
                              aria-hidden="true"
                            ></i>
                          </button>
                        )}

                        {showPanel && (
                          <div className="banking-panel">
                            <div className="row">
                              <div className="col-md-9">
                                <div class="banking-url">
                                  <div class="form-group">
                                    <label>Banking URL</label>
                                    <input
                                      type="text"
                                      name="url"
                                      placeholder="https://www.domain.com/dummy-url-will-be-here"
                                      class="form-control"
                                    />
                                    <button class="copyicon-col btn btn-primary">
                                      <i
                                        class="fa fa-clone"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  </div>
                                </div>
                                <div class="banking-url">
                                  <div class="form-group">
                                    <label>Status</label>
                                    <input
                                      type="text"
                                      name="Status"
                                      placeholder="Unlinked"
                                      class="form-control"
                                    />
                                    <button
                                      class="checkstatus-btn btn btn-primary"
                                      onClick={() => togglePanel2(!showPanel2)}
                                    >
                                      Check status
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3"></div>
                            </div>
                            {showPanel2 && (
                              <div className="after-check-status">
                                <div className="download-panel">
                                  <button
                                    class="btn btn-primary banking-btn download-btn"
                                    onClick={handleOpen}
                                  >
                                    <i
                                      class="fa fa-download"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    Download{" "}
                                    <i
                                      class="fa fa-chevron-down"
                                      aria-hidden="true"
                                    ></i>
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
                                      <h4>
                                        Financial Services <span>({financialServicesSummary.length})</span>
                                      </h4>
                                      <div className="scroll-bar-2">
                                      {financialServicesSummary.length>0 && financialServicesSummary.map((service, index)=>{
                                       return (index%2==0)?
                                        <>
                                          <div className="card-1">
                                          <p>
                                            <strong>{service.subCategoryDescription}</strong>
                                          </p>
                                          <p>{service.creditSummary.transactionCount} credit{" "}{service.creditSummary.transactionCount<2?'transaction':'transactions'} (on {service.creditSummary.lastTransaction.substring(0, 4)>='1997'?service.creditSummary.lastTransaction:'--'})</p>
                                          <p>
                                            <strong>{service.debitSummary.transactionCount}</strong> debit{" "}
                                            {service.debitSummary.transactionCount<2?'transaction':'transactions'} (last on{" "}
                                            <span>{service.debitSummary.lastTransaction.substring(0, 4)>='1997'?service.debitSummary.lastTransaction:'--'})</span>
                                          </p>
                                          <div className="box-id-1">
                                            <p>
                                              <strong>total in: +£{service.creditSummary.total}</strong>
                                            </p>
                                            <p>
                                              <strong>monthly av: +£{service.creditSummary.monthlyAverage}</strong>
                                            </p>
                                          </div>
                                          <div className="box-id-2">
                                            <p>
                                              <strong>
                                                total out: -£{service.debitSummary.total}
                                              </strong>
                                            </p>
                                            <p>
                                              <strong>
                                                monthly av: -£{service.debitSummary.monthlyAverage}
                                              </strong>
                                            </p>
                                          </div>
                                        </div>
                                        </>
                                        :
                                        <>
                                             <div className="card-1 card-2">
                                          <p>
                                            <strong>{service.subCategoryDescription}</strong>
                                          </p>
                                          <p>{service.creditSummary.transactionCount} credit{" "} {service.creditSummary.transactionCount<2?'transaction':'transactions'} (on {service.creditSummary.lastTransaction.substring(0, 4)>='1997'?service.creditSummary.lastTransaction:'--'})</p>
                                          <p>
                                            <strong>{service.debitSummary.transactionCount}</strong> debit{" "}
                                            {service.debitSummary.transactionCount<2?'transaction':'transactions'} (last on{" "}
                                            <span>{service.debitSummary.lastTransaction.substring(0, 4)>='1997'?service.debitSummary.lastTransaction:'--'})</span>
                                          </p>
                                          <div className="box-id-1">
                                            <p>
                                              <strong>total in: +£{service.creditSummary.total}</strong>
                                            </p>
                                            <p>
                                              <strong>monthly av: +£{service.creditSummary.monthlyAverage}</strong>
                                            </p>
                                          </div>
                                          <div className="box-id-2">
                                            <p>
                                              <strong>
                                                total out: -£{service.debitSummary.total}
                                              </strong>
                                            </p>
                                            <p>
                                              <strong>
                                                monthly av: -£{service.debitSummary.monthlyAverage}
                                              </strong>
                                            </p>
                                          </div>
                                        </div>
                                        </>
                                      }
                                      )}

                                      </div>
                                      <div className="card-bottom">
                                        <div className="box-id-1">
                                          <p>
                                            <strong>total in: +£{financialServicesTotalIn}</strong>
                                          </p>
                                          <p>
                                            <strong>monthly av: +£{financialServicesMonthlyAvgIn}</strong>
                                          </p>
                                        </div>
                                        <div className="box-id-2">
                                          <p>
                                            <strong>total out: -£{financialServicesTotalOut}</strong>
                                          </p>
                                          <p>
                                            <strong>
                                              monthly av: -£{financialServicesMonthlyAvgOut}
                                            </strong>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className=" financial-service income-panel">
                                      <h4>Income ({incomeAnalysisSummary.length})</h4>
                                      <div className="scroll-bar-2">

                                      {incomeAnalysisSummary.length>0 && incomeAnalysisSummary.map((income, index)=>{
                                          return(
                                            index%2==0?
                                            <>
                                               <div className="card-1 white-bg">
                                          <p>
                                            <strong>
                                              {income.vendorDescription}
                                            </strong>
                                          </p>
                                          <p>{income.creditSummary.transactionCount} credit{" "} {income.creditSummary.transactionCount<2?'transaction':'transactions'} (on {income.creditSummary.lastTransaction.substring(0, 4)>='1997'?income.creditSummary.lastTransaction:'--'})</p>
                                          <p>
                                            <strong>{income.debitSummary.transactionCount}</strong> debit{" "}
                                            {income.debitSummary.transactionCount<2?'transaction':'transactions'} (last on{" "}
                                            <span>{income.debitSummary.lastTransaction.substring(0, 4)>='1997'?income.debitSummary.lastTransaction:'--'})</span>
                                          </p>
                                          <div className="box-id-1">
                                            <p>
                                              <strong>total in: +£{income.creditSummary.total}</strong>
                                            </p>
                                            <p>
                                              <strong>monthly av: +£{income.creditSummary.monthlyAverage}</strong>
                                            </p>
                                          </div>
                                          <div className="box-id-2">
                                            <p>
                                              <strong>
                                                total out: -£{income.debitSummary.monthlyAverage}
                                              </strong>
                                            </p>
                                            <p>
                                              <strong>
                                                monthly av: -£{income.debitSummary.monthlyAverage}
                                              </strong>
                                            </p>
                                          </div>
                                        </div>
                                            </>
                                            :
                                            <>

                                          <div className="card-1 card-2 white-bg">
                                          <p>
                                            <strong>
                                            {income.vendorDescription}
                                            </strong>
                                          </p>
                                          <p>{income.creditSummary.transactionCount} credit{" "} {income.creditSummary.transactionCount<2?'transaction':'transactions'} (on {income.creditSummary.lastTransaction.substring(0, 4)>='1997'?income.creditSummary.lastTransaction:'--'})</p>
                                          <p>
                                            <strong>{income.debitSummary.transactionCount}</strong> debit{" "}
                                            {income.debitSummary.transactionCount<2?'transaction':'transactions'} (last on{" "}
                                            <span>{income.debitSummary.lastTransaction.substring(0, 4)>='1997'?income.debitSummary.lastTransaction:'--'})</span>
                                          </p>
                                          <div className="box-id-1">
                                            <p>
                                              <strong>total in: +£{income.creditSummary.total}</strong>
                                            </p>
                                            <p>
                                              <strong>monthly av: +£{income.creditSummary.monthlyAverage}</strong>
                                            </p>
                                          </div>
                                          <div className="box-id-2">
                                            <p>
                                              <strong>
                                                total out: -£{income.debitSummary.total}
                                              </strong>
                                            </p>
                                            <p>
                                              <strong>
                                                monthly av: -£{income.debitSummary.monthlyAverage}
                                              </strong>
                                            </p>
                                          </div>
                                        </div>
                                            </>
                                          )
                                      })}

                                      </div>
                                      <div className="card-bottom bottom-2">
                                        <div className="box-id-1">
                                          <p>
                                            <strong>total in: +£{incomeAnalysisTotalIn}</strong>
                                          </p>
                                          <p>
                                            <strong>monthly av: +£{incomeAnalysisMonthlyAvgIn}</strong>
                                          </p>
                                        </div>
                                        <div className="box-id-2">
                                          <p>
                                            <strong>total out: -£{incomeAnalysisTotalOut}</strong>
                                          </p>
                                          <p>
                                            <strong>
                                              monthly av: -£{incomeAnalysisMonthlyAvgOut}
                                            </strong>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="financial-service">
                                      <h4>
                                        Regular Outgoings <span>(0)</span>
                                      </h4>
                                      <div className="scroll-bar-2"></div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className=" financial-service income-panel">
                                      <h4>Event Feed ({eventCount})</h4>
                                      <div className="scroll-bar-2">
                                        {
                                          eventFeedSummary.length>0 && eventFeedSummary.map((month, index)=>{
                                          return(
                                            month&&month.data.events.map(ev=>{
                                              return(
                                                <>
                                                <div className="card-1 white-bg">
                                          <p>
                                            <strong>
                                              {ev.additionalInformation}
                                            </strong>
                                          </p>
                                          <p>
                                            Last credit on{" "}
                                            {ev.eventDate}
                                          </p>
                                          {/* <p>
                                            <strong>null</strong>
                                          </p>
                                          <p>
                                            Last credit on
                                            2020-06-05T00:00:00+01:00
                                          </p>
                                          <p>
                                            <strong>
                                              Significant transaction
                                            </strong>
                                          </p>
                                          <p>
                                            Last credit on
                                            2020-05-31T00:00:00+01:00
                                          </p>
                                          <p>
                                            <strong>
                                              Change in Income Profile (2020
                                              May)
                                            </strong>
                                          </p>
                                          <p>
                                            Last credit on
                                            2020-05-01T00:00:00+01:00
                                          </p>
                                          <p>
                                            <strong>null</strong>
                                          </p>
                                          <p>
                                            Last credit on
                                            2020-06-05T00:00:00+01:00
                                          </p>
                                          <p>
                                            <strong>
                                              Significant transaction
                                            </strong>
                                          </p>
                                          <p>
                                            Last credit on
                                            2020-06-18T00:00:00+01:00
                                          </p>
                                          <p>
                                            <strong>null</strong>
                                          </p>
                                          <p>
                                            Last credit on
                                            2020-06-05T00:00:00+01:00
                                          </p>
                                          <p>
                                            <strong>
                                              Significant transaction
                                            </strong>
                                          </p>
                                          <p>
                                            Last credit on
                                            2020-05-31T00:00:00+01:00
                                          </p>
                                          <p>
                                            <strong>
                                              Change in Income Profile (2020
                                              May)
                                            </strong>
                                          </p>
                                          <p>
                                            Last credit on
                                            2020-05-01T00:00:00+01:00
                                          </p>
                                          <p>
                                            <strong>null</strong>
                                          </p>
                                          <p>
                                            Last credit on
                                            2020-06-05T00:00:00+01:00
                                          </p> */}
                                        </div>
                                                </>
                                              )
                                            })
                                          )
                                          
                                          })
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </section>
                    </TabPanel>
                    <TabPanel>
                      <section>
                        {!showPanel3 && (
                          <button
                            class="btn btn-primary accounting-btn"
                            onClick={() => togglePanel3(!showPanel3)}
                          >
                            Link To Accounting{" "}
                            <i
                              class="fa fa-chevron-right"
                              aria-hidden="true"
                            ></i>
                          </button>
                        )}
                        {showPanel3 && (
                          <div className="accounting-panel">
                            <div class="banking-url">
                              <div class="form-group">
                                <label>Accounting URL</label>
                                <input
                                  type="text"
                                  name="url"
                                  placeholder="https://www.domain.com/dummy-url-will-be-here"
                                  class="form-control"
                                />
                                <button class="copyicon-col btn btn-primary">
                                  <i class="fa fa-clone" aria-hidden="true"></i>
                                </button>
                              </div>
                            </div>
                            <div class="banking-url">
                              <div class="form-group">
                                <label>Status</label>
                                <input
                                  type="text"
                                  name="Status"
                                  placeholder="Unlinked"
                                  class="form-control"
                                />
                                <button
                                  class="checkstatus-btn btn btn-primary"
                                  onClick={() => togglePanel4(!showPanel4)}
                                >
                                  Check status
                                </button>
                              </div>
                            </div>
                            {showPanel4 && (
                              <div className="data-panel">
                                <Codat />
                              </div>
                            )}
                          </div>
                        )}
                      </section>
                    </TabPanel>
                    <TabPanel>
                      {" "}
                      <section>
                        <div className="business-panel">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <input
                                  type="checkbox"
                                  onClick={(e) => checkMe(e.target.checked)}
                                  name="Upload Bank Statement Copies Instead"
                                  className="upload-checkbox"
                                />
                                <label>
                                  Some Checkbox condition will be here for KYC.
                                </label>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div
                                className="upload-doc-panel"
                                id="divcheck"
                                style={{ display: "none" }}
                              >
                                <div className="row">
                                  <div className="col-md-5">
                                    <div className="upload-area">
                                      <p>
                                        <strong>
                                          Please upload the following document :
                                        </strong>
                                      </p>
                                      <ul>
                                        <li>Proof of ID.</li>

                                        <li>Proof of Address.</li>
                                      </ul>
                                      <div className="uploaded-file">
                                        <p>
                                          <strong>File Uploaded:</strong>
                                        </p>
                                        <p>
                                          <span>MY-ID-PROOF.JPG</span>{" "}
                                          <i className="fa fa-trash"></i>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-1"></div>
                                  <div className="col-md-6">
                                    <div className="upload-box">
                                      <input
                                        type="file"
                                        id="upload-file"
                                        name="file"
                                        className="upload-doc"
                                      />

                                      <img
                                        src={require("../../images/file-pdf.png")}
                                        alt=""
                                        className="upload-icon"
                                      />
                                      <label
                                        for="upload-file"
                                        className="btn btn-primary upload-btn"
                                      >
                                        {" "}
                                        Upload
                                      </label>

                                      <p>Max file size: 2MB each</p>
                                      <p>
                                        Supported file types: PDF, JPG, PNG
                                        Bitmap etc.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <button className="btn btn-primary save-btn next-btn">
                                  Save <i className="fa fa-file-image-o"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MerchantHealth;

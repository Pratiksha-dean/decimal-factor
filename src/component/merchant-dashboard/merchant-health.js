import React, { useState, useEffect } from "react";
import "../../styles/master.css";
import Header from "../header/header";
import SiderBarMenu from "./component/sidebar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Codat from "../Codat";
import { Link } from "react-router-dom";
import StickyBox from "react-sticky-box";
import {
  checkAccountingStatus,
  checkBankingStatus,
  checkLinkingStatus,
  getAccountScore,
  getCompanyID,
  getDashboardData,
  getLinkToAccountingData,
  getBankingFinancialServices,
  getBankingIncome,
  getRegularOutgoings,
  getEventFeed,
  bankingInsightsDownloadFile,
} from "../../request";
import { getUserDetails } from "../login/loginpage";

function checkMe(selected) {
  if (selected) {
    document.getElementById("divcheck").style.display = "block";
  } else {
    document.getElementById("divcheck").style.display = "none";
  }
}

const weekDayArray = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dateSuffix = {
  1: "st",
  2: "nd",
  3: "rd",
  4: "th",
  5: "th",
  6: "th",
  7: "th",
  8: "th",
  9: "th",
  10: "th",
  11: "th",
  12: "th",
  13: "th",
  14: "th",
  15: "th",
  16: "th",
  17: "th",
  18: "th",
  19: "th",
  20: "th",
  21: "st",
  22: "nd",
  23: "rd",
  24: "th",
  25: "th",
  26: "th",
  27: "th",
  28: "th",
  29: "th",
  30: "th",
  31: "st",
};
function MerchantHealth() {
  const [showPanel, togglePanel] = useState(false);
  const [showPanel2, togglePanel2] = useState(false);
  const [showPanel3, togglePanel3] = useState(false);
  const [showPanel4, togglePanel4] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [linkToBaking, setLinkToBanking] = useState(false);
  const [accoutingUrl, setAccoutingUrl] = useState();
  const userDetails = getUserDetails();
  const [accountingStatus, setAccoutingStatus] = useState();
  const [dasboardData, setDashboardData] = useState();
  const [bankingUrl, setBankingUrl] = useState();
  const [bankingStatus, setBankingStatus] = useState(false);

  const [loadingBanking, setLoadingBanking] = useState(false);
  const [loadingAccouting, setLoadingAccouting] = useState(false);
  console.log(
    "🚀 ~ file: merchant-health.js ~ line 107 ~ MerchantHealth ~ loadingAccouting",
    loadingAccouting
  );

  const [financialServicesSummary, setFinancialServicesSummary] = useState([]);
  const [incomeAnalysisSummary, setIncomeAnalysisSummary] = useState([]);
  const [regularOutgoingsSummary, setRegularOutgoingsSummary] = useState([]);
  const [eventFeedSummary, setEventFeedSummary] = useState([]);
  const [eventCount, setEventCount] = useState(0);

  //Financial Services Aggregate
  const [financialServicesTotalIn, setFinancialServicesTotalIn] = useState(0);
  const [financialServicesTotalOut, setFinancialServicesTotalOut] = useState(0);
  const [financialServicesMonthlyAvgIn, setFinancialServicesMonthlyAvgIn] =
    useState(0);
  const [financialServicesMonthlyAvgOut, setFinancialServicesMonthlyAvgOut] =
    useState(0);

  //Income Analysis Aggregate
  const [incomeAnalysisTotalIn, setIncomeAnalysisTotalIn] = useState(0);
  const [incomeAnalysisTotalOut, setIncomeAnalysisTotalOut] = useState(0);
  const [incomeAnalysisMonthlyAvgIn, setIncomeAnalysisMonthlyAvgIn] =
    useState(0);
  const [incomeAnalysisMonthlyAvgOut, setIncomeAnalysisMonthlyAvgOut] =
    useState(0);

  const lead_accountScore = 6137;
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (userDetails && userDetails.lead_id) {
      console.log("lead id", userDetails.lead_id);
      getBankingFinancialServices(lead_accountScore).then((data) => {
        console.log("data", data);
        let summaries = data.response.data.summaries;
        setFinancialServicesSummary(summaries);
        let totalIn = 0;
        let totalOut = 0;
        let monthlyAvgIn = 0;
        let monthlyAvgOut = 0;

        summaries.map((summary) => {
          totalIn = Number(totalIn) + Number(summary.creditSummary.total);
          totalOut = Number(totalOut) + Number(summary.debitSummary.total);
          monthlyAvgIn =
            Number(monthlyAvgIn) + Number(summary.creditSummary.monthlyAverage);
          monthlyAvgOut =
            Number(monthlyAvgOut) + Number(summary.debitSummary.monthlyAverage);
        });

        setFinancialServicesTotalIn(totalIn);
        setFinancialServicesTotalOut(totalOut);
        setFinancialServicesMonthlyAvgIn(monthlyAvgIn);
        setFinancialServicesMonthlyAvgOut(monthlyAvgOut);
      });

      getBankingIncome(lead_accountScore).then((data) => {
        console.log("data", data);
        let summaries = data.response.data.summaries;
        setIncomeAnalysisSummary(data.response.data.summaries);
        let totalIn = 0;
        let totalOut = 0;
        let monthlyAvgIn = 0;
        let monthlyAvgOut = 0;

        summaries.map((summary) => {
          totalIn = Number(totalIn) + Number(summary.creditSummary.total);
          totalOut = Number(totalOut) + Number(summary.debitSummary.total);
          monthlyAvgIn =
            Number(monthlyAvgIn) + Number(summary.creditSummary.monthlyAverage);
          monthlyAvgOut =
            Number(monthlyAvgOut) + Number(summary.debitSummary.monthlyAverage);
        });

        setIncomeAnalysisTotalIn(totalIn);
        setIncomeAnalysisTotalOut(totalOut);
        setIncomeAnalysisMonthlyAvgIn(monthlyAvgIn);
        setIncomeAnalysisMonthlyAvgOut(monthlyAvgOut);
      });

      getRegularOutgoings(lead_accountScore).then((data) => {
        console.log("data", data);
        setRegularOutgoingsSummary(data.response.data.summaries);
      });

      getEventFeed(lead_accountScore).then((data) => {
        console.log("event data", data);
        let summaries = data.response.months;
        setEventFeedSummary(data.response.months);
        console.log("months", eventFeedSummary);
        let evCount = 0;
        summaries.map((month) => {
          month.data.events.map((ev) => {
            evCount += 1;
          });
        });
        setEventCount(evCount);
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
      });
    }
  }, []);

  const downloadFile = async (fileType) => {
    let response
    switch (fileType) {
      case 'PDF_90': {
        response = await bankingInsightsDownloadFile('90days', lead_accountScore).then(data => {
          console.log("pdf", data)
          let url = JSON.parse(data.response).Url
          if (url) {
            console.log("link", url)
            window.open(url, "_blank")
          } else {
            alert("There is no data")
          }
        }).catch(err=>{
          console.log(`Error occured: ${err}`)
          alert(err)
        })
        break;
      }
      case 'PDF_UW': {
        let baseUrl = 'https://sales.decimalfactor.com/staging/'
        response = await bankingInsightsDownloadFile('underwriters', lead_accountScore).then(data => {
          console.log("pdf", data)
          let url = JSON.parse(data.response).Url
          if (url) {
            console.log("link", url)
            window.open(`${baseUrl}${url}`, "_blank")
          } else {
            alert("There is no data")
          }
        }).catch(err=>{
          console.log(`Error occured: ${err}`)
          alert(err)
        })
        break
      }
      case 'PDF_RAW': {
        let baseUrl = 'https://sales.decimalfactor.com/staging/'
        response = await bankingInsightsDownloadFile('rawdata', lead_accountScore).then(data => {
          console.log("pdf", data)
          let url = JSON.parse(data.response).Url
          if (url) {
            console.log("link", url)
            window.open(`${baseUrl}${url}`, "_blank")
          } else {
            alert("There is no data")
          }
        }).catch(err=>{
          console.log(`Error occured: ${err}`)
          alert(err)
        })
        break
      }

      case 'PDF_FULL': {
        response = await bankingInsightsDownloadFile('fulldata', lead_accountScore).then(data => {
          console.log("pdf", data)
          let url = JSON.parse(data.response).Url
          if (url) {
            console.log("link", url)
            window.open(url, "_blank")
          } else {
            alert("There is no data")
          }
        }).catch(err=>{
          console.log(`Error occured: ${err}`)
          alert(err)
        })
        break
      }

      case 'CSV_ALL': {
        let baseUrl = 'https://sales.decimalfactor.com/staging/'
        response = await bankingInsightsDownloadFile('csvdata', lead_accountScore).then(data => {
          console.log("pdf", data)
          let url = JSON.parse(data.response).Url
          if (url) {
            console.log("link", url)
            window.open(`${baseUrl}${url}`, "_blank")
          } else {
            alert("There is no data")
          }
        }).catch(err=>{
          console.log(`Error occured: ${err}`)
          alert(err)
        })
        break
      }
    }
  };

  const getData = () => {
    if (userDetails && userDetails.lead_id) {
      setLoadingBanking(true);
      getDashboardData(userDetails.lead_id).then((resp) => {
        setLoadingBanking(false);
        setDashboardData(resp.records[0]);
      });
    }
  };

  const checkAccountingStatusClick = () => {
    // userDetails["lead_id"];
    setLoadingAccouting(true);

    checkAccountingStatus(userDetails["lead_id"])
      .then((resp) => {
        console.log(
          "🚀 ~ file: merchant-health.js ~ line 329 ~ .then ~ resp",
          resp
        );
        if (resp["message"] === "Status Updated to Linked") {
          setAccoutingStatus(true);
          setAccoutingUrl(resp.data.redirect);
          setLoadingAccouting(false);
        } else if (resp.status == "PendingAuth") {
          getLinkToAccouting();
        }
      })
      .catch((err) => {
        setAccoutingStatus(false);
        console.log(
          "🚀 ~ file: merchant-health.js ~ line 344 ~ checkAccountingStatusClick ~ accoutingUrl",
          accoutingUrl
        );
        if (!accoutingUrl) {
          getLinkToAccouting();
          console.log("sghds");
          setLoadingAccouting(false);
        } else {
          setLoadingAccouting(false);
        }
        console.log(
          "🚀 ~ file: link-banking&accounting.js ~ line 112 ~ checkLinkingStatus ~ err",
          err
        );
      });
  };

  const getLinkToAccouting = () => {
    setLoadingAccouting(true);

    let payload = {
      lm_id: userDetails["lead_id"],
      name: dasboardData["lf_business_name"],
      platformType: "0",
    };

    getLinkToAccountingData(payload).then((resp) => {
      console.log(
        "🚀 ~ file: link-banking&accounting.js ~ line 61 ~ getLinkToAccountingData ~ resp",
        resp,
        resp.success == "false" && resp.status == 500
      );
      setLoadingAccouting(false);
      if (
        resp.success == "false" &&
        resp.code == 500 &&
        resp.message == "User Already Created"
      ) {
        getCompanyID(payload.lm_id).then((resp) => {
          setAccoutingUrl(
            `https://link-uat.codat.io/company/${resp.data.codat_client_id}`
          );
          console.log(
            "🚀 ~ file: link-banking&accounting.js ~ line 86 ~ getCompanyID ~ resp",
            resp
          );
          console.log("open");
          window.open(
            `https://link-uat.codat.io/company/${resp.data.codat_client_id}`,
            "_blank"
          );
          setLoadingAccouting(false);
        });
      } else {
        setAccoutingUrl(`https://link-uat.codat.io/company/${resp.data.id}`);
        console.log("open");
        setLoadingAccouting(false);
        window.open(
          `https://link-uat.codat.io/company/${resp.data.id}`,
          "_blank"
        );
      }
    });
  };

  const checkBankingStatusClick = () => {
    // setLoadingBanking(true);
    // userDetails["lead_id"];
    checkBankingStatus(userDetails["lead_id"])
      .then((resp) => {
        console.log(
          "🚀 ~ file: link-banking&accounting.js ~ line 103 ~ checkLinkingStatus ~ resp",
          resp
        );

        if (resp["response"] === "Completed") {
          setBankingStatus(true);
          setLoadingBanking(false);
          // setAccoutingUrl(resp.data.redirect);
        }
      })
      .catch((err) => {
        setBankingStatus(false);
        setLoadingBanking(false);

        console.log(
          "🚀 ~ file: link-banking&accounting.js ~ line 112 ~ checkLinkingStatus ~ err",
          err
        );
      });
  };

  const getLinkToBanking = () => {
    setLoadingBanking(true);
    let payload = {
      lm_um_id: dasboardData["lm_id"],
      lf_customer_name: dasboardData["lf_customer_name"],
      lf_customer_first_name: dasboardData["lf_customer_first_name"],
      lf_customer_last_name: dasboardData["lf_customer_last_name"],
      lf_customer_emailID: dasboardData["lf_customer_emailID"],
      lf_customer_DOB: dasboardData["lf_customer_DOB"],
      txtHomePostCode: dasboardData["ApptxtHomePostcodeuk"],
    };

    getAccountScore(dasboardData["lm_id"], payload).then((resp) => {
      console.log(
        "🚀 ~ file: link-banking&accounting.js ~ line 61 ~ getLinkToAccountingData ~ resp",
        resp
      );
      if (resp.isSuccess == "1" && resp.url) {
        setLoadingBanking(false);

        console.log("resp.url", resp.url);
        setBankingUrl(resp.url);
        window.open(resp.url, "_blank");
      } else {
        setLoadingBanking(false);
      }
    });
  };
  // obv_account_score_status;
  useEffect(() => {
    getData();
    console.log("dashbaorddata", dasboardData);
  }, []);

  useEffect(() => {
    console.log("dasboardData", dasboardData);
    if (dasboardData) {
      if (tabIndex == 0) {
        if (dasboardData["obv_account_score_status"] == "Start") {
          setBankingUrl(
            `https://connect.consents.online/decimalfactor?externalref=${dasboardData["obv_account_score_customer_ref_id"]}`
          );
          // setBankingStatus(false);

          // window.open(
          //   `https://connect.consents.online/decimalfactor?externalref=${dasboardData["obv_account_score_customer_ref_id"]}`,
          //   "_blank"
          // );
        } else if (dasboardData["obv_account_score_status"] == "Completed") {
          // setBankingStatus(false);
          setBankingStatus(true);
        } else {
          checkBankingStatusClick();
          console.log("check");
        }
        console.log(
          "🚀 ~ file: merchant-health.js ~ line 190 ~ MerchantHealth ~ dasboardData",
          dasboardData["obv_account_score_status"]
        );
      } else if (tabIndex == 1) {
        checkAccountingStatusClick();
        console.log("checkl");
      } else {
      }
    }
  }, [dasboardData, tabIndex]);

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
                        {loadingBanking && !bankingUrl && <h3>Loading</h3>}
                        {!bankingUrl && !loadingBanking && (
                          <>
                            <button
                              class="btn btn-primary banking-btn"
                              onClick={() => getLinkToBanking()}
                            >
                              Link To Banking{" "}
                              <i
                                class="fa fa-chevron-right"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </>
                        )}

                        <div className="banking-panel">
                          {!bankingUrl && !loadingBanking && (
                            <div className="banking-info-tooltip">
                              Connect your bank account using Open Banking. Only
                              the following required data will be requested:
                              <div>
                                <ul>
                                  <li>
                                    Incoming transactions for the last year
                                  </li>
                                  <li>
                                    {" "}
                                    Outgoing transactions for the last year
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}

                          {bankingUrl && !loadingBanking && (
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
                                      disabled
                                      value={bankingUrl}
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
                                      disabled
                                      value={
                                        bankingStatus ? "Linked" : "Unlinked"
                                      }
                                    />
                                    <button
                                      class="checkstatus-btn btn btn-primary"
                                      onClick={() => checkBankingStatusClick()}
                                    >
                                      Check status
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3"></div>
                            </div>
                          )}
                          {bankingStatus && (
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
                                      <Link
                                        to="#"
                                        onClick={() => downloadFile("PDF_90")}
                                      >
                                        PDF last 90 days
                                      </Link>
                                    </li>
                                    <li className="menu-item">
                                      <Link
                                        to="#"
                                        onClick={() => downloadFile("PDF_UW")}
                                      >
                                        PDF underwriters
                                      </Link>
                                    </li>
                                    <li className="menu-item">
                                      <Link
                                        to="#"
                                        onClick={() => downloadFile("PDF_RAW")}
                                      >
                                        PDF raw transactions
                                      </Link>
                                    </li>
                                    <li className="menu-item">
                                      <Link
                                        to="#"
                                        onClick={() => downloadFile("PDF_FULL")}
                                      >
                                        PDF full data range
                                      </Link>
                                    </li>
                                    <li className="menu-item">
                                      <Link
                                        to="#"
                                        onClick={() => downloadFile("CSV_ALL")}
                                      >
                                        CSV all transactions
                                      </Link>
                                    </li>
                                  </ul>
                                ) : null}
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="financial-service">
                                    <h4>
                                      Financial Services{" "}
                                      <span>
                                        ({financialServicesSummary.length})
                                      </span>
                                    </h4>
                                    <div className="scroll-bar-2">
                                      {financialServicesSummary.length > 0 &&
                                        financialServicesSummary.map(
                                          (service, index) => {
                                            return index % 2 == 0 ? (
                                              <>
                                                <div className="card-1">
                                                  <p>
                                                    <strong>
                                                      {
                                                        service.subCategoryDescription
                                                      }
                                                    </strong>
                                                  </p>
                                                  <p>
                                                    {
                                                      service.creditSummary
                                                        .transactionCount
                                                    }{" "}
                                                    credit{" "}
                                                    {service.creditSummary
                                                      .transactionCount < 2
                                                      ? "transaction"
                                                      : "transactions"}{" "}
                                                    (on{" "}
                                                    {service.creditSummary.lastTransaction.substring(
                                                      0,
                                                      4
                                                    ) >= "1997"
                                                      ? service.creditSummary
                                                          .lastTransaction
                                                      : "--"}
                                                    )
                                                  </p>
                                                  <p>
                                                    <strong>
                                                      {
                                                        service.debitSummary
                                                          .transactionCount
                                                      }
                                                    </strong>{" "}
                                                    debit{" "}
                                                    {service.debitSummary
                                                      .transactionCount < 2
                                                      ? "transaction"
                                                      : "transactions"}{" "}
                                                    (last on{" "}
                                                    <span>
                                                      {service.debitSummary.lastTransaction.substring(
                                                        0,
                                                        4
                                                      ) >= "1997"
                                                        ? service.debitSummary
                                                            .lastTransaction
                                                        : "--"}
                                                      )
                                                    </span>
                                                  </p>
                                                  <div className="box-id-1">
                                                    <p>
                                                      <strong>
                                                        total in: +£
                                                        {
                                                          service.creditSummary
                                                            .total
                                                        }
                                                      </strong>
                                                    </p>
                                                    <p>
                                                      <strong>
                                                        monthly av: +£
                                                        {
                                                          service.creditSummary
                                                            .monthlyAverage
                                                        }
                                                      </strong>
                                                    </p>
                                                  </div>
                                                  <div className="box-id-2">
                                                    <p>
                                                      <strong>
                                                        total out: -£
                                                        {
                                                          service.debitSummary
                                                            .total
                                                        }
                                                      </strong>
                                                    </p>
                                                    <p>
                                                      <strong>
                                                        monthly av: -£
                                                        {
                                                          service.debitSummary
                                                            .monthlyAverage
                                                        }
                                                      </strong>
                                                    </p>
                                                  </div>
                                                </div>
                                              </>
                                            ) : (
                                              <>
                                                <div className="card-1 card-2">
                                                  <p>
                                                    <strong>
                                                      {
                                                        service.subCategoryDescription
                                                      }
                                                    </strong>
                                                  </p>
                                                  <p>
                                                    {
                                                      service.creditSummary
                                                        .transactionCount
                                                    }{" "}
                                                    credit{" "}
                                                    {service.creditSummary
                                                      .transactionCount < 2
                                                      ? "transaction"
                                                      : "transactions"}{" "}
                                                    (on{" "}
                                                    {service.creditSummary.lastTransaction.substring(
                                                      0,
                                                      4
                                                    ) >= "1997"
                                                      ? service.creditSummary
                                                          .lastTransaction
                                                      : "--"}
                                                    )
                                                  </p>
                                                  <p>
                                                    <strong>
                                                      {
                                                        service.debitSummary
                                                          .transactionCount
                                                      }
                                                    </strong>{" "}
                                                    debit{" "}
                                                    {service.debitSummary
                                                      .transactionCount < 2
                                                      ? "transaction"
                                                      : "transactions"}{" "}
                                                    (last on{" "}
                                                    <span>
                                                      {service.debitSummary.lastTransaction.substring(
                                                        0,
                                                        4
                                                      ) >= "1997"
                                                        ? service.debitSummary
                                                            .lastTransaction
                                                        : "--"}
                                                      )
                                                    </span>
                                                  </p>
                                                  <div className="box-id-1">
                                                    <p>
                                                      <strong>
                                                        total in: +£
                                                        {
                                                          service.creditSummary
                                                            .total
                                                        }
                                                      </strong>
                                                    </p>
                                                    <p>
                                                      <strong>
                                                        monthly av: +£
                                                        {
                                                          service.creditSummary
                                                            .monthlyAverage
                                                        }
                                                      </strong>
                                                    </p>
                                                  </div>
                                                  <div className="box-id-2">
                                                    <p>
                                                      <strong>
                                                        total out: -£
                                                        {
                                                          service.debitSummary
                                                            .total
                                                        }
                                                      </strong>
                                                    </p>
                                                    <p>
                                                      <strong>
                                                        monthly av: -£
                                                        {
                                                          service.debitSummary
                                                            .monthlyAverage
                                                        }
                                                      </strong>
                                                    </p>
                                                  </div>
                                                </div>
                                              </>
                                            );
                                          }
                                        )}
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
                                              {income.vendorDescription}{" "}<div className="">{income.subCategoryDescription}</div>
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

                                          <div className="card-1 card-2">
                                          <p>
                                            <strong>
                                            {income.vendorDescription}{" "}<div className="">{income.subCategoryDescription}</div>
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
                                      <div className="box-id-2">
                                        <p>
                                          <strong>
                                            total out: -£
                                            {financialServicesTotalOut}
                                          </strong>
                                        </p>
                                        <p>
                                          <strong>
                                            monthly av: -£
                                            {financialServicesMonthlyAvgOut}
                                          </strong>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className=" financial-service income-panel">
                                    <h4>
                                      Income ({incomeAnalysisSummary.length})
                                    </h4>
                                    <div className="scroll-bar-2">
                                      {incomeAnalysisSummary.length > 0 &&
                                        incomeAnalysisSummary.map(
                                          (income, index) => {
                                            return index % 2 == 0 ? (
                                              <>
                                                <div className="card-1 white-bg">
                                                  <p>
                                                    <strong>
                                                      {income.vendorDescription}{" "}
                                                      <div className="income-sub-category">
                                                        {
                                                          income.subCategoryDescription
                                                        }
                                                      </div>
                                                    </strong>
                                                  </p>
                                                  <p>
                                                    {
                                                      income.creditSummary
                                                        .transactionCount
                                                    }{" "}
                                                    credit{" "}
                                                    {income.creditSummary
                                                      .transactionCount < 2
                                                      ? "transaction"
                                                      : "transactions"}{" "}
                                                    (on{" "}
                                                    {income.creditSummary.lastTransaction.substring(
                                                      0,
                                                      4
                                                    ) >= "1997"
                                                      ? income.creditSummary
                                                          .lastTransaction
                                                      : "--"}
                                                    )
                                                  </p>
                                                  <p>
                                                    <strong>
                                                      {
                                                        income.debitSummary
                                                          .transactionCount
                                                      }
                                                    </strong>{" "}
                                                    debit{" "}
                                                    {income.debitSummary
                                                      .transactionCount < 2
                                                      ? "transaction"
                                                      : "transactions"}{" "}
                                                    (last on{" "}
                                                    <span>
                                                      {income.debitSummary.lastTransaction.substring(
                                                        0,
                                                        4
                                                      ) >= "1997"
                                                        ? income.debitSummary
                                                            .lastTransaction
                                                        : "--"}
                                                      )
                                                    </span>
                                                  </p>
                                                  <div className="box-id-1">
                                                    <p>
                                                      <strong>
                                                        total in: +£
                                                        {
                                                          income.creditSummary
                                                            .total
                                                        }
                                                      </strong>
                                                    </p>
                                                    <p>
                                                      <strong>
                                                        monthly av: +£
                                                        {
                                                          income.creditSummary
                                                            .monthlyAverage
                                                        }
                                                      </strong>
                                                    </p>
                                                  </div>
                                                  <div className="box-id-2">
                                                    <p>
                                                      <strong>
                                                        total out: -£
                                                        {
                                                          income.debitSummary
                                                            .monthlyAverage
                                                        }
                                                      </strong>
                                                    </p>
                                                    <p>
                                                      <strong>
                                                        monthly av: -£
                                                        {
                                                          income.debitSummary
                                                            .monthlyAverage
                                                        }
                                                      </strong>
                                                    </p>
                                                  </div>
                                                </div>
                                              </>
                                            ) : (
                                              <>
                                                <div className="card-1 card-2 white-bg">
                                                  <p>
                                                    <strong>
                                                      {income.vendorDescription}{" "}
                                                      <div className="income-sub-category">
                                                        {
                                                          income.subCategoryDescription
                                                        }
                                                      </div>
                                                    </strong>
                                                  </p>
                                                  <p>
                                                    {
                                                      income.creditSummary
                                                        .transactionCount
                                                    }{" "}
                                                    credit{" "}
                                                    {income.creditSummary
                                                      .transactionCount < 2
                                                      ? "transaction"
                                                      : "transactions"}{" "}
                                                    (on{" "}
                                                    {income.creditSummary.lastTransaction.substring(
                                                      0,
                                                      4
                                                    ) >= "1997"
                                                      ? income.creditSummary
                                                          .lastTransaction
                                                      : "--"}
                                                    )
                                                  </p>
                                                  <p>
                                                    <strong>
                                                      {
                                                        income.debitSummary
                                                          .transactionCount
                                                      }
                                                    </strong>{" "}
                                                    debit{" "}
                                                    {income.debitSummary
                                                      .transactionCount < 2
                                                      ? "transaction"
                                                      : "transactions"}{" "}
                                                    (last on{" "}
                                                    <span>
                                                      {income.debitSummary.lastTransaction.substring(
                                                        0,
                                                        4
                                                      ) >= "1997"
                                                        ? income.debitSummary
                                                            .lastTransaction
                                                        : "--"}
                                                      )
                                                    </span>
                                                  </p>
                                                  <div className="box-id-1">
                                                    <p>
                                                      <strong>
                                                        total in: +£
                                                        {
                                                          income.creditSummary
                                                            .total
                                                        }
                                                      </strong>
                                                    </p>
                                                    <p>
                                                      <strong>
                                                        monthly av: +£
                                                        {
                                                          income.creditSummary
                                                            .monthlyAverage
                                                        }
                                                      </strong>
                                                    </p>
                                                  </div>
                                                  <div className="box-id-2">
                                                    <p>
                                                      <strong>
                                                        total out: -£
                                                        {
                                                          income.debitSummary
                                                            .total
                                                        }
                                                      </strong>
                                                    </p>
                                                    <p>
                                                      <strong>
                                                        monthly av: -£
                                                        {
                                                          income.debitSummary
                                                            .monthlyAverage
                                                        }
                                                      </strong>
                                                    </p>
                                                  </div>
                                                </div>
                                              </>
                                            );
                                          }
                                        )}
                                    </div>
                                    <div className="card-bottom bottom-2">
                                      <div className="box-id-1">
                                        <p>
                                          <strong>
                                            total in: +£{incomeAnalysisTotalIn}
                                          </strong>
                                        </p>
                                        <p>
                                          <strong>
                                            monthly av: +£
                                            {incomeAnalysisMonthlyAvgIn}
                                          </strong>
                                        </p>
                                      </div>
                                      <div className="box-id-2">
                                        <p>
                                          <strong>
                                            total out: -£
                                            {incomeAnalysisTotalOut}
                                          </strong>
                                        </p>
                                        <p>
                                          <strong>
                                            monthly av: -£
                                            {incomeAnalysisMonthlyAvgOut}
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
                                      Regular Outgoings{" "}
                                      <span>
                                        ({regularOutgoingsSummary.length})
                                      </span>
                                    </h4>
                                    <div className="scroll-bar-2 scroll-height">
                                      {regularOutgoingsSummary &&
                                        regularOutgoingsSummary.map(
                                          (regOutgoing, index) => {
                                            let date = new Date(
                                              regOutgoing.debitSummary.lastTransaction
                                            );
                                            return index % 2 == 0 ? (
                                              <>
                                                <div className="card-1">
                                                  <p>
                                                    <strong>
                                                      {
                                                        regOutgoing.vendorDescription
                                                      }{" "}
                                                    </strong>
                                                    <span>
                                                      {
                                                        regOutgoing.subCategoryDescription
                                                      }
                                                    </span>
                                                  </p>

                                                  <p>
                                                    <strong>
                                                      {
                                                        regOutgoing.debitSummary
                                                          .transactionCount
                                                      }
                                                    </strong>{" "}
                                                    debit{" "}
                                                    {regOutgoing.debitSummary
                                                      .transactionCount < 2
                                                      ? "transaction"
                                                      : "transactions"}{" "}
                                                    (last on{" "}
                                                    <span>
                                                      {regOutgoing.debitSummary.lastTransaction.substring(
                                                        0,
                                                        4
                                                      ) >= "1997"
                                                        ? regOutgoing
                                                            .debitSummary
                                                            .lastTransaction
                                                        : "--"}
                                                      )
                                                    </span>
                                                  </p>
                                                  <div className="calender-div float-left">
                                                    <div class="today">
                                                      <div class="today-piece  top  day">
                                                        {
                                                          weekDayArray[
                                                            date.getDay() - 1
                                                          ]
                                                        }
                                                      </div>
                                                      <div class="today-piece  middle  month">
                                                        {
                                                          monthArray[
                                                            date.getMonth()
                                                          ]
                                                        }
                                                      </div>
                                                      <div class="today-piece  middle  date">
                                                        {date.getDate()}
                                                        {
                                                          dateSuffix[
                                                            date
                                                              .getDate()
                                                              .toString()
                                                          ]
                                                        }
                                                      </div>
                                                      <div class="today-piece  bottom  year">
                                                        {date.getFullYear()}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="box-id-2">
                                                    <p>
                                                      <strong>
                                                        total out: -£
                                                        {
                                                          regOutgoing
                                                            .debitSummary.total
                                                        }
                                                      </strong>
                                                    </p>
                                                    <p>
                                                      <strong>
                                                        monthly av: -£
                                                        {
                                                          regOutgoing
                                                            .debitSummary
                                                            .monthlyAverage
                                                        }
                                                      </strong>
                                                    </p>
                                                  </div>
                                                </div>
                                              </>
                                            ) : (
                                              <>
                                                <div className="card-1 card-2">
                                                  <p>
                                                    <strong>
                                                      {
                                                        regOutgoing.vendorDescription
                                                      }{" "}
                                                    </strong>
                                                    <span>
                                                      {
                                                        regOutgoing.subCategoryDescription
                                                      }
                                                    </span>
                                                  </p>

                                                  <p>
                                                    <strong>
                                                      {
                                                        regOutgoing.debitSummary
                                                          .transactionCount
                                                      }
                                                    </strong>{" "}
                                                    debit{" "}
                                                    {regOutgoing.debitSummary
                                                      .transactionCount < 2
                                                      ? "transaction"
                                                      : "transactions"}{" "}
                                                    (last on{" "}
                                                    <span>
                                                      {regOutgoing.debitSummary.lastTransaction.substring(
                                                        0,
                                                        4
                                                      ) >= "1997"
                                                        ? regOutgoing
                                                            .debitSummary
                                                            .lastTransaction
                                                        : "--"}
                                                      )
                                                    </span>
                                                  </p>
                                                  <div className="calender-div float-left">
                                                    <div class="today">
                                                      <div class="today-piece  top  day">
                                                        {
                                                          weekDayArray[
                                                            date.getDay() - 1
                                                          ]
                                                        }
                                                      </div>
                                                      <div class="today-piece  middle  month">
                                                        {
                                                          monthArray[
                                                            date.getMonth()
                                                          ]
                                                        }
                                                      </div>
                                                      <div class="today-piece  middle  date">
                                                        {date.getDate()}
                                                        {
                                                          dateSuffix[
                                                            date
                                                              .getDate()
                                                              .toString()
                                                          ]
                                                        }
                                                      </div>
                                                      <div class="today-piece  bottom  year">
                                                        {date.getFullYear()}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="box-id-2">
                                                    <p>
                                                      <strong>
                                                        total out: -£
                                                        {
                                                          regOutgoing
                                                            .debitSummary.total
                                                        }
                                                      </strong>
                                                    </p>
                                                    <p>
                                                      <strong>
                                                        monthly av: -£
                                                        {
                                                          regOutgoing
                                                            .debitSummary
                                                            .monthlyAverage
                                                        }
                                                      </strong>
                                                    </p>
                                                  </div>
                                                </div>
                                              </>
                                            );
                                          }
                                        )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className=" financial-service income-panel">
                                    <h4>Event Feed ({eventCount})</h4>
                                    <div className="scroll-bar-2">
                                      {eventFeedSummary.length > 0 &&
                                        eventFeedSummary.map((month, index) => {
                                          return (
                                            month &&
                                            month.data.events.map((ev) => {
                                              return (
                                                <>
                                                  <div className="card-1 white-bg">
                                                    <p>
                                                      <strong>
                                                        {
                                                          ev.additionalInformation
                                                        }
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
                                              );
                                            })
                                          );
                                        })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </section>
                    </TabPanel>
                    <TabPanel>
                      <section>
                        {loadingAccouting && !accoutingUrl && <h3>Loading</h3>}
                        {!accoutingUrl && !loadingAccouting && (
                          <>
                            <button
                              class="btn btn-primary accounting-btn"
                              onClick={() => {
                                getLinkToAccouting();
                              }}
                            >
                              Link To Accounting{" "}
                              <i
                                class="fa fa-chevron-right"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </>
                        )}

                        <div className="merchent-accounting-panel">
                          {!accoutingUrl && !loadingAccouting && (
                            <div className="banking-info-tooltip">
                              Connect your accounting software to seamlessly
                              view all your data on the portal and the help
                              increase your loan acceptance rate.
                              <div>
                                Only the following required data will be
                                requested:{" "}
                              </div>
                              <div>
                                <ul style={{ width: "235px" }}>
                                  <li>Accounts receivable information</li>
                                  <li>Accounts payable information</li>
                                  <li>Financial summary information</li>
                                </ul>
                              </div>
                            </div>
                          )}
                          {accoutingUrl && !loadingAccouting && (
                            <>
                              <div class="banking-url">
                                <div class="form-group">
                                  <label>Accounting URL</label>

                                  <input
                                    type="text"
                                    name="url"
                                    placeholder="https://www.domain.com/dummy-url-will-be-here"
                                    className="form-control"
                                    value={accoutingUrl}
                                    disabled
                                    id="accouting-url"
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
                                    placeholder=""
                                    class="form-control"
                                    disabled
                                    value={
                                      accountingStatus ? "Linked" : "Unlinked"
                                    }
                                  />
                                  <button
                                    class="checkstatus-btn btn btn-primary"
                                    onClick={() => checkAccountingStatusClick()}
                                  >
                                    Check status
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                          {accountingStatus && (
                            <div className="data-panel">
                              <Codat />
                            </div>
                          )}
                        </div>
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

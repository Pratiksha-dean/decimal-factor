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
  API_URL,
  CODAT_BASE_URL,
} from "../../request";
import { getUserDetails } from "../login/loginpage";
import { ToastMessage } from "../ToastMessage";
import Loaderspinner from "../loader";
import BusinessCreditScore from "./merachant-health/business-credit-score";
import NotFound from "../NotFound";
import { useDispatch } from "react-redux/es";
import { TRIGGER_LEAD_DETAILS } from "../../redux/actions/actionTypes";
import { dateSuffix, monthArray, weekDayArray } from "../Constants";
import moment from "moment/moment";

export const setCurrentTabIndex = (index) => {
  localStorage.setItem("activeTabIndex", index);
};

export const getCurrentTabIndex = () => {
  if (!localStorage.getItem("activeTabIndex")) {
    localStorage.setItem("activeTabIndex", 0);
  }
  return Number(localStorage.getItem("activeTabIndex"));
};

function MerchantHealth() {
  const currentTabIndex = getCurrentTabIndex();
  const [tabIndex, setTabIndex] = useState(currentTabIndex);
  const [open, setOpen] = React.useState(false);
  const [accoutingUrl, setAccoutingUrl] = useState();
  const userDetails = getUserDetails();
  const [accountingStatus, setAccoutingStatus] = useState();
  const [dasboardData, setDashboardData] = useState();
  const [bankingUrl, setBankingUrl] = useState();
  const [bankingStatus, setBankingStatus] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);
  const dispatch = useDispatch();
  const [loadingBanking, setLoadingBanking] = useState(true);
  const [loadingAccouting, setLoadingAccouting] = useState(true);
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
  const [downloadInProgress, setDownloadProgress] = useState(false);
  const lead_accountScore = userDetails["lead_id"];
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setLoadingServices(true);
    if (userDetails && userDetails.lead_id && bankingStatus) {
      let promise1 = getBankingFinancialServices(lead_accountScore)
        .then((data) => {
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
              Number(monthlyAvgIn) +
              Number(summary.creditSummary.monthlyAverage);
            monthlyAvgOut =
              Number(monthlyAvgOut) +
              Number(summary.debitSummary.monthlyAverage);
          });

          setFinancialServicesTotalIn(totalIn);
          setFinancialServicesTotalOut(totalOut);
          setFinancialServicesMonthlyAvgIn(monthlyAvgIn);
          setFinancialServicesMonthlyAvgOut(monthlyAvgOut);
          return Promise.resolve();
        })
        .catch((err) => {
          return Promise.resolve();
        });

      let promise2 = getBankingIncome(lead_accountScore)
        .then((data) => {
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
              Number(monthlyAvgIn) +
              Number(summary.creditSummary.monthlyAverage);
            monthlyAvgOut =
              Number(monthlyAvgOut) +
              Number(summary.debitSummary.monthlyAverage);
          });

          setIncomeAnalysisTotalIn(totalIn);
          setIncomeAnalysisTotalOut(totalOut);
          setIncomeAnalysisMonthlyAvgIn(monthlyAvgIn);
          setIncomeAnalysisMonthlyAvgOut(monthlyAvgOut);
          return Promise.resolve();
        })
        .catch((err) => {
          return Promise.resolve();
        });

      let promise3 = getRegularOutgoings(lead_accountScore)
        .then((data) => {
          setRegularOutgoingsSummary(data.response.data.summaries);
          return Promise.resolve();
        })
        .catch((err) => {
          return Promise.resolve();
        });

      let promise4 = getEventFeed(lead_accountScore)
        .then((data) => {
          let summaries = data.response.months;
          setEventFeedSummary(data.response.months);
          let evCount = 0;
          summaries.map((month) => {
            month.data.events.map((ev) => {
              evCount += 1;
            });
          });
          setEventCount(evCount);
          return Promise.resolve();
        })
        .catch((err) => {
          return Promise.resolve();
        });
      let combinedPromise = Promise.all([
        promise1,
        promise2,
        promise3,
        promise4,
      ]);
      combinedPromise.then((res) => {
        setLoadingServices(false);
      });
    }
  }, [bankingStatus]);

  const downloadFile = async (fileType) => {
    let response;
    setDownloadProgress(true);
    switch (fileType) {
      case "PDF_90": {
        response = await bankingInsightsDownloadFile(
          "90days",
          lead_accountScore
        )
          .then((data) => {
            let url = JSON.parse(data.response).Url;
            if (url) {
              window.open(url, "_blank");
            } else {
              alert("There is no data");
            }
            setDownloadProgress(false);
          })
          .catch((err) => {
            setDownloadProgress(false);
            alert(err);
          });
        break;
      }
      case "PDF_UW": {
        response = await bankingInsightsDownloadFile(
          "underwriters",
          lead_accountScore
        )
          .then((data) => {
            let url = JSON.parse(data.response).Url;
            if (url) {
              window.open(`${API_URL}${url}`, "_blank");
            } else {
              alert("There is no data");
            }
            setDownloadProgress(false);
          })
          .catch((err) => {
            setDownloadProgress(false);
            alert(err);
          });
        break;
      }
      case "PDF_RAW": {
        response = await bankingInsightsDownloadFile(
          "rawdata",
          lead_accountScore
        )
          .then((data) => {
            let url = JSON.parse(data.response).Url;
            if (url) {
              window.open(`${API_URL}${url}`, "_blank");
            } else {
              alert("There is no data");
            }
            setDownloadProgress(false);
          })
          .catch((err) => {
            setDownloadProgress(false);
            alert(err);
          });
        break;
      }

      case "PDF_FULL": {
        response = await bankingInsightsDownloadFile(
          "fulldata",
          lead_accountScore
        )
          .then((data) => {
            let url = JSON.parse(data.response).Url;
            if (url) {
              window.open(url, "_blank");
            } else {
              alert("There is no data");
            }
            setDownloadProgress(false);
          })
          .catch((err) => {
            setDownloadProgress(false);
            alert(err);
          });
        break;
      }

      case "CSV_ALL": {
        response = await bankingInsightsDownloadFile(
          "csvdata",
          lead_accountScore
        )
          .then((data) => {
            let url = JSON.parse(data.response).Url;
            if (url) {
              window.open(`${API_URL}${url}`, "_blank");
            } else {
              alert("There is no data");
            }
            setDownloadProgress(false);
          })
          .catch((err) => {
            setDownloadProgress(false);
            alert(err);
          });
        break;
      }
    }
  };

  const getData = () => {
    if (userDetails && userDetails.lead_id) {
      setLoadingBanking(true);
      getDashboardData(userDetails.lead_id).then((resp) => {
        setDashboardData(resp.records[0]);
        setLoadingBanking(false);
        dispatch({
          type: TRIGGER_LEAD_DETAILS,
          leadDetails: resp.records[0],
        });
      });
    }
  };

  const checkAccountingStatusClick = () => {
    setLoadingAccouting(true);

    checkAccountingStatus(userDetails["lead_id"])
      .then((resp) => {
        if (resp["message"] === "Status Updated to Linked") {
          setAccoutingStatus(true);
          setAccoutingUrl(resp.data.redirect);
          setLoadingAccouting(false);
        } else if (
          resp.status == "PendingAuth" ||
          resp["message"] === "Status Confirmed as Pending"
        ) {
          setAccoutingStatus(false);
          setLoadingAccouting(false);
        }
      })
      .catch((err) => {
        setAccoutingStatus(false);
        if (!accoutingUrl) {
          getLinkToAccouting();
        }
      });
  };

  const getLinkToAccouting = (isClicked) => {
    let payload = {
      lm_id: userDetails["lead_id"],
      name: dasboardData["lf_business_name"],
      platformType: "0",
    };

    getCompanyID(payload.lm_id).then((resp) => {
      if (resp["data"] && resp["data"]["codat_client_id"]) {
        setLoadingAccouting(false);
        setAccoutingUrl(`${CODAT_BASE_URL}${resp.data.codat_client_id}`);

        if (isClicked) {
          window.open(
            `${CODAT_BASE_URL}${resp.data.codat_client_id}`,
            "_blank"
          );
        }
      }

      if (!resp.data) {
        setLoadingAccouting(false);
        if (isClicked) {
          getLinkToAccountingData(payload)
            .then((resp) => {
              if (resp.success == "false" && resp.code == 500) {
              } else {
                setAccoutingUrl(resp.data.redirect);
                if (isClicked) {
                  window.open(resp.data.redirect, "_blank");
                }
                setLoadingAccouting(false);
              }
            })
            .catch((err) => {
              ToastMessage("Something went wrong!", "error");
              setLoadingAccouting(false);
            });
        }
      }
    });
  };

  const checkBankingStatusClick = () => {
    // response: "CompletedAddition";
    checkBankingStatus(userDetails["lead_id"])
      .then((resp) => {
        if (
          resp["response"] === "Completed" ||
          resp["response"] === "CompletedAddition" ||
          resp["response"] === "OpenBankingCancelled"
        ) {
          setBankingStatus(true);
          setLoadingBanking(false);
        }
      })
      .catch((err) => {
        setBankingStatus(false);
        setLoadingBanking(false);
      });
  };

  const getLinkToBanking = (isClicked) => {
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
      if (resp.isSuccess == "1" && resp.url) {
        setLoadingBanking(false);
        setBankingUrl(resp.url);
        if (isClicked) {
          window.open(resp.url, "_blank");
        }
      } else {
        setLoadingBanking(false);
      }
    });
  };
  useEffect(() => {
    getData();
    return () => {
      setCurrentTabIndex(0);
      setAccoutingUrl("");
    };
  }, []);

  const applyDisabledClass = (value) => {
    if (value == "0" || value == "0.00") {
      return "text-disabled";
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (dasboardData) {
      if (tabIndex == 0) {
        if (dasboardData["obv_account_score_status"] == "Start") {
          setBankingUrl(
            `https://connect.consents.online/decimalfactor?externalref=${dasboardData["obv_account_score_customer_ref_id"]}`
          );

          setBankingStatus(false);
        } else if (
          dasboardData["obv_account_score_status"] == "Completed" ||
          dasboardData["obv_account_score_status"] == "CompletedAddition" ||
          dasboardData["obv_account_score_status"] === "OpenBankingCancelled"
        ) {
          setBankingUrl(
            `https://connect.consents.online/decimalfactor?externalref=${dasboardData["obv_account_score_customer_ref_id"]}`
          );
          setBankingStatus(true);
        } else {
          setLoadingBanking(true);
          checkBankingStatusClick();
        }
      } else if (tabIndex == 1) {
        checkAccountingStatusClick();
      } else {
      }
    }
  }, [dasboardData, tabIndex]);

  const copyLinkToClipboard = (bankingUrlToCopy) => {
    navigator.clipboard.writeText(bankingUrlToCopy);
    ToastMessage("Url copied to clipboard!", "success");
  };

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
                    onSelect={(index) => {
                      setTabIndex(index);
                      setCurrentTabIndex(index);
                    }}
                  >
                    <div className="bankinglist">
                      <TabList>
                        <Tab>Banking Insights</Tab>
                        <Tab>Accounting Insights</Tab>
                        <Tab>Business Credit Score Insights</Tab>
                      </TabList>
                    </div>
                    <TabPanel>
                      <section>
                        {loadingBanking &&
                          !bankingUrl && ( //
                            <>
                              <Loaderspinner size="45px" />
                            </>
                          )}
                        {!bankingUrl && !loadingBanking && !bankingStatus && (
                          <>
                            <button
                              className="btn btn-primary banking-btn"
                              onClick={() => {
                                getLinkToBanking(true);
                              }}
                            >
                              Link To Banking{" "}
                              <i
                                className="fa fa-chevron-right"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </>
                        )}

                        <div className="banking-panel">
                          {!bankingUrl && !loadingBanking && !bankingStatus && (
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
                                <div className="banking-url">
                                  <div className="form-group">
                                    <label>Banking URL</label>
                                    <input
                                      type="text"
                                      name="url"
                                      placeholder="https://www.domain.com/dummy-url-will-be-here"
                                      className="form-control"
                                      disabled
                                      value={bankingUrl}
                                    />
                                    <button
                                      className="copyicon-col btn btn-primary"
                                      onClick={() => {
                                        copyLinkToClipboard(bankingUrl);
                                      }}
                                    >
                                      <i
                                        className="fa fa-clone"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  </div>
                                </div>
                                <div className="banking-url">
                                  <div className="form-group">
                                    <label>Status</label>
                                    <input
                                      type="text"
                                      name="Status"
                                      placeholder="Unlinked"
                                      className="form-control"
                                      disabled
                                      value={
                                        bankingStatus ? "Linked" : "Unlinked"
                                      }
                                    />
                                    <button
                                      className="checkstatus-btn btn btn-primary"
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
                                  className="btn btn-primary banking-btn download-btn"
                                  onClick={handleOpen}
                                >
                                  <i
                                    className="fa fa-download"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Download{" "}
                                  <i
                                    className="fa fa-chevron-down"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                                {open ? (
                                  <ul className="menu">
                                    <li className="menu-item">
                                      <a
                                        href={void 0}
                                        onClick={() => downloadFile("PDF_90")}
                                      >
                                        PDF last 90 days
                                      </a>
                                    </li>
                                    <li className="menu-item">
                                      <a
                                        href={void 0}
                                        onClick={() => downloadFile("PDF_UW")}
                                      >
                                        PDF underwriters
                                      </a>
                                    </li>
                                    <li className="menu-item">
                                      <a
                                        href={void 0}
                                        onClick={() => downloadFile("PDF_RAW")}
                                      >
                                        PDF raw transactions
                                      </a>
                                    </li>
                                    <li className="menu-item">
                                      <a
                                        href={void 0}
                                        onClick={() => downloadFile("PDF_FULL")}
                                      >
                                        PDF full data range
                                      </a>
                                    </li>
                                    <li className="menu-item">
                                      <a
                                        href={void 0}
                                        onClick={() => downloadFile("CSV_ALL")}
                                      >
                                        CSV all transactions
                                      </a>
                                    </li>
                                  </ul>
                                ) : null}
                              </div>

                              {bankingStatus && downloadInProgress && (
                                <>
                                  {/* <DarkBackground disappear={true}> */}
                                  <Loaderspinner size="45px" />
                                  {/* </DarkBackground> */}
                                </>
                              )}
                              {bankingStatus && loadingServices && (
                                <Loaderspinner size="45px" />
                              )}

                              {bankingStatus && !loadingServices && (
                                <div>
                                  {/* financial services start */}
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="financial-service">
                                        <h4>
                                          Financial Services
                                          <span>
                                            ({financialServicesSummary.length})
                                          </span>
                                        </h4>
                                        {(financialServicesSummary.length >
                                          0 && (
                                          <div>
                                            {" "}
                                            <div className="scroll-bar-2">
                                              {financialServicesSummary.length >
                                                0 &&
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
                                                              service
                                                                .creditSummary
                                                                .transactionCount
                                                            }{" "}
                                                            credit{" "}
                                                            {service
                                                              .creditSummary
                                                              .transactionCount <
                                                            2
                                                              ? "transaction"
                                                              : "transactions"}{" "}

                                                            {service.creditSummary.lastTransaction.substring(
                                                              0,
                                                              4
                                                            ) >= "1997" &&
                                                             '('+"on " +
                                                                moment(
                                                                  new Date(
                                                                    service.creditSummary.lastTransaction
                                                                  )
                                                                ).format(
                                                                  "DD MMM YYYY"
                                                                )+')'}

                                                          </p>
                                                          <p>
                                                            <strong>
                                                              {
                                                                service
                                                                  .debitSummary
                                                                  .transactionCount
                                                              }
                                                            </strong>{" "}
                                                            debit{" "}
                                                            {service
                                                              .debitSummary
                                                              .transactionCount <
                                                            2
                                                              ? "transaction"
                                                              : "transactions"}{" "}

                                                            <span>
                                                              {service.debitSummary.lastTransaction.substring(
                                                                0,
                                                                4
                                                              ) >= "1997" &&
                                                                '('+"last on " +
                                                                  moment(
                                                                    new Date(
                                                                      service.debitSummary.lastTransaction
                                                                    )
                                                                  ).format(
                                                                    "DD MMM YYYY"
                                                                  )+')'}

                                                            </span>
                                                          </p>
                                                          <div className="box-id-1">
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  service.debitSummary.monthlyAverage.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                total in: +£
                                                                {
                                                                  service
                                                                    .creditSummary
                                                                    .total
                                                                }
                                                              </strong>
                                                            </p>
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  service.creditSummary.monthlyAverage.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                monthly av: +£
                                                                {service.creditSummary.monthlyAverage.toFixed(
                                                                  2
                                                                )}
                                                              </strong>
                                                            </p>
                                                          </div>
                                                          <div className="box-id-2">
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  service.debitSummary.total.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                total out: -£
                                                                {service.debitSummary.total.toFixed(
                                                                  2
                                                                )}
                                                              </strong>
                                                            </p>
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  service.debitSummary.monthlyAverage.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                monthly av: -£
                                                                {
                                                                  service
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
                                                                service.subCategoryDescription
                                                              }
                                                            </strong>
                                                          </p>
                                                          <p>
                                                            {
                                                              service
                                                                .creditSummary
                                                                .transactionCount
                                                            }{" "}
                                                            credit{" "}
                                                            {service
                                                              .creditSummary
                                                              .transactionCount <
                                                            2
                                                              ? "transaction "
                                                              : "transactions "}

                                                            {service.creditSummary.lastTransaction.substring(
                                                              0,
                                                              4
                                                            ) >= "1997" &&
                                                             '('+"on " +
                                                                moment(
                                                                  new Date(
                                                                    service.creditSummary.lastTransaction
                                                                  )
                                                                ).format(
                                                                  "DD MMM YYYY"
                                                                )+')'}

                                                          </p>
                                                          <p>
                                                            <strong>
                                                              {
                                                                service
                                                                  .debitSummary
                                                                  .transactionCount
                                                              }
                                                            </strong>{" "}
                                                            debit{" "}
                                                            {service
                                                              .debitSummary
                                                              .transactionCount <
                                                            2
                                                              ? "transaction"
                                                              : "transactions"}{" "}
                                                            <span>
                                                             {service.debitSummary.lastTransaction.substring(
                                                              0,
                                                                4
                                                              ) >= "1997" &&
                                                                '('+"last on " +
                                                                  moment(
                                                                    new Date(
                                                                      service.debitSummary.lastTransaction
                                                                    )
                                                                  ).format(
                                                                    "DD MMM YYYY"
                                                                  )+')'}
                                                            </span>
                                                          </p>
                                                          <div className="box-id-1">
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  service.creditSummary.total.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                total in: +£
                                                                {
                                                                  service
                                                                    .creditSummary
                                                                    .total
                                                                }
                                                              </strong>
                                                            </p>
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  service.creditSummary.monthlyAverage.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                monthly av: +£
                                                                {service.creditSummary.monthlyAverage.toFixed(
                                                                  2
                                                                )}
                                                              </strong>
                                                            </p>
                                                          </div>
                                                          <div className="box-id-2">
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  service.debitSummary.total.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                total out: -£
                                                                {service.debitSummary.total.toFixed(
                                                                  2
                                                                )}
                                                              </strong>
                                                            </p>
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  service.debitSummary.monthlyAverage.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                monthly av: -£
                                                                {service.debitSummary.monthlyAverage.toFixed(
                                                                  2
                                                                )}
                                                              </strong>
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </>
                                                    );
                                                  }
                                                )}
                                            </div>{" "}
                                            <div className="card-bottom">
                                              <div className="box-id-1">
                                                <p>
                                                  <strong
                                                    className={applyDisabledClass(
                                                      financialServicesTotalIn
                                                    )}
                                                  >
                                                    total in: +£
                                                    {financialServicesTotalIn}
                                                  </strong>
                                                </p>
                                                <p>
                                                  <strong
                                                    className={applyDisabledClass(
                                                      financialServicesMonthlyAvgIn
                                                    )}
                                                  >
                                                    monthly av: +£
                                                    {
                                                      financialServicesMonthlyAvgIn
                                                    }
                                                  </strong>
                                                </p>
                                              </div>
                                              <div className="box-id-2">
                                                <p>
                                                  <strong
                                                    className={applyDisabledClass(
                                                      financialServicesTotalOut
                                                    )}
                                                  >
                                                    total out: -£
                                                    {financialServicesTotalOut}
                                                  </strong>
                                                </p>
                                                <p>
                                                  <strong
                                                    className={applyDisabledClass(
                                                      financialServicesMonthlyAvgOut
                                                    )}
                                                  >
                                                    monthly av: -£
                                                    {
                                                      financialServicesMonthlyAvgOut
                                                    }
                                                  </strong>
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        )) || (
                                          <div>
                                            <NotFound />
                                          </div>
                                        )}

                                        {/* </div> */}
                                      </div>
                                    </div>

                                    {/* income analysis start */}
                                    <div className="col-md-6">
                                      <div className=" financial-service income-panel">
                                        <h4>
                                          Income ({incomeAnalysisSummary.length}
                                          )
                                        </h4>
                                        {(incomeAnalysisSummary.length > 0 && (
                                          <div>
                                            <div className="scroll-bar-2">
                                              {incomeAnalysisSummary.length >
                                                0 &&
                                                incomeAnalysisSummary.map(
                                                  (income, index) => {
                                                    return index % 2 == 0 ? (
                                                      <>
                                                        <div className="card-1 white-bg">
                                                          <p>
                                                            <strong>
                                                              {
                                                                income.vendorDescription
                                                              }{" "}
                                                              <div className="">
                                                                {
                                                                  income.subCategoryDescription
                                                                }
                                                              </div>
                                                            </strong>
                                                          </p>
                                                          <p>
                                                            {
                                                              income
                                                                .creditSummary
                                                                .transactionCount
                                                            }{" "}
                                                            credit{" "}
                                                            {income
                                                              .creditSummary
                                                              .transactionCount <
                                                            2
                                                              ? "transaction"
                                                              : "transactions"}{" "}
                                                            {income.creditSummary.lastTransaction.substring(
                                                              0,
                                                              4
                                                            ) >= "1997" &&
                                                              "(" +
                                                                "on " +
                                                                moment(
                                                                  new Date(
                                                                    income.creditSummary.lastTransaction
                                                                  )
                                                                ).format(
                                                                  "DD MMM YYYY"
                                                                ) +
                                                                ")"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              {
                                                                income
                                                                  .debitSummary
                                                                  .transactionCount
                                                              }
                                                            </strong>{" "}
                                                            debit{" "}
                                                            {income.debitSummary
                                                              .transactionCount <
                                                            2
                                                              ? "transaction"
                                                              : "transactions"}{" "}
                                                            <span>
                                                              {income.debitSummary.lastTransaction.substring(
                                                                0,
                                                                4
                                                              ) >= "1997" &&
                                                                "(" +
                                                                  "last on " +
                                                                  moment(
                                                                    new Date(
                                                                      income.debitSummary.lastTransaction
                                                                    )
                                                                  ).format(
                                                                    "DD MMM YYYY"
                                                                  ) +
                                                                  ")"}
                                                            </span>
                                                          </p>
                                                          <div className="box-id-1">
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  income.creditSummary.total.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                total in: +£
                                                                {income.creditSummary.total.toFixed(
                                                                  2
                                                                )}
                                                              </strong>
                                                            </p>
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  income.creditSummary.monthlyAverage.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                monthly av: +£
                                                                {income.creditSummary.monthlyAverage.toFixed(
                                                                  2
                                                                )}
                                                              </strong>
                                                            </p>
                                                          </div>
                                                          <div className="box-id-2">
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  income.debitSummary.monthlyAverage.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                total out: -£
                                                                {
                                                                  income
                                                                    .debitSummary
                                                                    .monthlyAverage
                                                                }
                                                              </strong>
                                                            </p>
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  income.debitSummary.monthlyAverage.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                monthly av: -£
                                                                {income.debitSummary.monthlyAverage.toFixed(
                                                                  2
                                                                )}
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
                                                                income.vendorDescription
                                                              }{" "}
                                                              <div className="">
                                                                {
                                                                  income.subCategoryDescription
                                                                }
                                                              </div>
                                                            </strong>
                                                          </p>
                                                          <p>
                                                            {
                                                              income
                                                                .creditSummary
                                                                .transactionCount
                                                            }{" "}
                                                            credit{" "}
                                                            {income
                                                              .creditSummary
                                                              .transactionCount <
                                                            2
                                                              ? "transaction"
                                                              : "transactions"}{" "}
                                                            {income.creditSummary.lastTransaction.substring(
                                                              0,
                                                              4
                                                            ) >= "1997" &&
                                                              "(" +
                                                                "on " +
                                                                moment(
                                                                  new Date(
                                                                    income.creditSummary.lastTransaction
                                                                  )
                                                                ).format(
                                                                  "DD MMM YYYY"
                                                                ) +
                                                                ")"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              {
                                                                income
                                                                  .debitSummary
                                                                  .transactionCount
                                                              }
                                                            </strong>{" "}
                                                            debit{" "}
                                                            {income.debitSummary
                                                              .transactionCount <
                                                            2
                                                              ? "transaction"
                                                              : "transactions"}{" "}
                                                            <span>
                                                              {income.debitSummary.lastTransaction.substring(
                                                                0,
                                                                4
                                                              ) >= "1997" &&
                                                                "(" +
                                                                  "last on " +
                                                                  moment(
                                                                    new Date(
                                                                      income.debitSummary.lastTransaction
                                                                    )
                                                                  ).format(
                                                                    "DD MMM YYYY"
                                                                  ) +
                                                                  ")"}
                                                            </span>
                                                          </p>
                                                          <div className="box-id-1">
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  income
                                                                    .creditSummary
                                                                    .total
                                                                )}
                                                              >
                                                                total in: +£
                                                                {
                                                                  income
                                                                    .creditSummary
                                                                    .total
                                                                }
                                                              </strong>
                                                            </p>
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  income.creditSummary.monthlyAverage.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                monthly av: +£
                                                                {income.creditSummary.monthlyAverage.toFixed(
                                                                  2
                                                                )}
                                                              </strong>
                                                            </p>
                                                          </div>
                                                          <div className="box-id-2">
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  income.debitSummary.total.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                total out: -£
                                                                {
                                                                  income
                                                                    .debitSummary
                                                                    .total
                                                                }
                                                              </strong>
                                                            </p>
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  income.debitSummary.monthlyAverage.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                monthly av: -£
                                                                {income.debitSummary.monthlyAverage.toFixed(
                                                                  2
                                                                )}
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
                                                  <strong
                                                    className={applyDisabledClass(
                                                      incomeAnalysisTotalIn
                                                    )}
                                                  >
                                                    total in: +£
                                                    {incomeAnalysisTotalIn}
                                                  </strong>
                                                </p>
                                                <p>
                                                  <strong
                                                    className={applyDisabledClass(
                                                      incomeAnalysisMonthlyAvgIn
                                                    )}
                                                  >
                                                    monthly av: +£
                                                    {incomeAnalysisMonthlyAvgIn}
                                                  </strong>
                                                </p>
                                              </div>
                                              <div className="box-id-2">
                                                <p>
                                                  <strong
                                                    className={applyDisabledClass(
                                                      incomeAnalysisTotalOut
                                                    )}
                                                  >
                                                    total out: -£
                                                    {incomeAnalysisTotalOut}
                                                  </strong>
                                                </p>
                                                <p>
                                                  <strong
                                                    className={applyDisabledClass(
                                                      incomeAnalysisMonthlyAvgOut
                                                    )}
                                                  >
                                                    monthly av: -£
                                                    {
                                                      incomeAnalysisMonthlyAvgOut
                                                    }
                                                  </strong>
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        )) || (
                                          <div>
                                            <NotFound />
                                          </div>
                                        )}
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
                                        {(regularOutgoingsSummary.length >
                                          0 && (
                                          <div>
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
                                                                regOutgoing
                                                                  .debitSummary
                                                                  .transactionCount
                                                              }
                                                            </strong>{" "}
                                                            debit{" "}
                                                            {regOutgoing
                                                              .debitSummary
                                                              .transactionCount <
                                                            2
                                                              ? "transaction"
                                                              : "transactions"}{" "}
                                                            <span>
                                                              {regOutgoing.debitSummary.lastTransaction.substring(
                                                                0,
                                                                4
                                                              ) >= "1997" &&
                                                                '('+"last on " +
                                                                  moment(
                                                                    new Date(
                                                                      regOutgoing.debitSummary.lastTransaction
                                                                    )
                                                                  ).format(
                                                                    "DD MMM YYYY"
                                                                  )+')'}

                                                            </span>
                                                          </p>
                                                          <div className="calender-div float-left">
                                                            <div className="today">
                                                              <div className="today-piece  top  day">
                                                                {
                                                                  weekDayArray[
                                                                    date.getDay() -
                                                                      1
                                                                  ]
                                                                }
                                                              </div>
                                                              <div className="today-piece  middle  month">
                                                                {
                                                                  monthArray[
                                                                    date.getMonth()
                                                                  ]
                                                                }
                                                              </div>
                                                              <div className="today-piece  middle  date">
                                                                {date.getDate()}
                                                                {
                                                                  dateSuffix[
                                                                    date
                                                                      .getDate()
                                                                      .toString()
                                                                  ]
                                                                }
                                                              </div>
                                                              <div className="today-piece  bottom  year">
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
                                                                    .debitSummary
                                                                    .total
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
                                                                regOutgoing
                                                                  .debitSummary
                                                                  .transactionCount
                                                              }
                                                            </strong>{" "}
                                                            debit{" "}
                                                            {regOutgoing
                                                              .debitSummary
                                                              .transactionCount <
                                                            2
                                                              ? "transaction"
                                                              : "transactions"}{" "}

                                                            <span>
                                                              {regOutgoing.debitSummary.lastTransaction.substring(
                                                                0,
                                                                4
                                                              ) >= "1997" &&
                                                                '('+"last on " +
                                                                  moment(
                                                                    new Date(
                                                                      regOutgoing.debitSummary.lastTransaction
                                                                    )
                                                                  ).format(
                                                                    "DD MMM YYYY"
                                                                  )+')'}

                                                            </span>
                                                          </p>
                                                          <div className="calender-div float-left">
                                                            <div className="today">
                                                              <div className="today-piece  top  day">
                                                                {
                                                                  weekDayArray[
                                                                    date.getDay() -
                                                                      1
                                                                  ]
                                                                }
                                                              </div>
                                                              <div className="today-piece  middle  month">
                                                                {
                                                                  monthArray[
                                                                    date.getMonth()
                                                                  ]
                                                                }
                                                              </div>
                                                              <div className="today-piece  middle  date">
                                                                {date.getDate()}
                                                                {
                                                                  dateSuffix[
                                                                    date
                                                                      .getDate()
                                                                      .toString()
                                                                  ]
                                                                }
                                                              </div>
                                                              <div className="today-piece  bottom  year">
                                                                {date.getFullYear()}
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className="box-id-2">
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  regOutgoing.debitSummary.total.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                total out: -£
                                                                {regOutgoing.debitSummary.total.toFixed(
                                                                  2
                                                                )}
                                                              </strong>
                                                            </p>
                                                            <p>
                                                              <strong
                                                                className={applyDisabledClass(
                                                                  regOutgoing.debitSummary.monthlyAverage.toFixed(
                                                                    2
                                                                  )
                                                                )}
                                                              >
                                                                monthly av: -£
                                                                {regOutgoing.debitSummary.monthlyAverage.toFixed(
                                                                  2
                                                                )}
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
                                        )) || (
                                          <div>
                                            <NotFound />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className=" financial-service income-panel">
                                        <h4>Event Feed ({eventCount})</h4>
                                        <div className="scroll-bar-2 events-panel">
                                          {(eventFeedSummary.length > 0 && (
                                            <div>
                                              {eventFeedSummary.length > 0 &&
                                                eventFeedSummary.map(
                                                  (month, index) => {
                                                    return (
                                                      month &&
                                                      month.data.events.map(
                                                        (ev) => {
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
                                                              </div>
                                                            </>
                                                          );
                                                        }
                                                      )
                                                    );
                                                  }
                                                )}
                                            </div>
                                          )) || (
                                            <div>
                                              <NotFound />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </section>
                    </TabPanel>
                    <TabPanel>
                      <section>
                        {loadingAccouting && !accoutingUrl && (
                          <Loaderspinner size="45px" />
                        )}
                        {!accoutingUrl &&
                          !loadingAccouting &&
                          !accountingStatus && (
                            <>
                              <button
                                className="btn btn-primary accounting-btn"
                                onClick={() => {
                                  getLinkToAccouting(true);
                                }}
                              >
                                Link To Accounting{" "}
                                <i
                                  className="fa fa-chevron-right"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </>
                          )}

                        <div className="merchent-accounting-panel">
                          {!accoutingUrl &&
                            !loadingAccouting &&
                            !accountingStatus && (
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
                          {accoutingUrl &&
                            (!loadingAccouting || loadingAccouting) && (
                              <>
                                <div className="banking-url">
                                  <div className="form-group">
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
                                    <button
                                      className="copyicon-col btn btn-primary"
                                      onClick={() => {
                                        copyLinkToClipboard(accoutingUrl);
                                      }}
                                    >
                                      <i
                                        className="fa fa-clone"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  </div>
                                </div>
                                <div className="banking-url">
                                  <div className="form-group">
                                    <label>Status</label>
                                    <input
                                      type="text"
                                      name="Status"
                                      placeholder=""
                                      className="form-control"
                                      disabled
                                      value={
                                        accountingStatus ? "Linked" : "Unlinked"
                                      }
                                    />
                                    <button
                                      className="checkstatus-btn btn btn-primary"
                                      onClick={() =>
                                        checkAccountingStatusClick()
                                      }
                                    >
                                      Check status
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          {accountingStatus && (
                            <div className="data-panel">
                              <Codat leadId={lead_accountScore} />
                            </div>
                          )}
                        </div>
                      </section>
                    </TabPanel>
                    <TabPanel>
                      <BusinessCreditScore />
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

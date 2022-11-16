import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import {
  checkBankingStatus,
  checkLinkingStatus,
  getAccountScore,
  getCompanyID,
  getLinkToAccountingData,
} from "../../../request";
import { getUserDetails } from "../../login/loginpage";
import { getCompanyInfo } from "../../requestaquote/components/business-information";
import { getReviewAppData, setDashboardStepNo } from "../dashboard";

function checkMe(selected) {
  if (selected) {
    document.getElementById("divcheck").style.display = "block";
  } else {
    document.getElementById("divcheck").style.display = "none";
  }
}

export const setLinkingAndBankingData = (data) => {
  localStorage.setItem("reviewLinkingAndBankingData", JSON.stringify(data));
};

export const getLinkingAndBankingData = () => {
  return JSON.parse(localStorage.getItem("reviewLinkingAndBankingData"));
};

function LinkBankingAccounting({ data, activeStep, setActiveStep }) {
  console.log(
    "🚀 ~ file: link-banking&accounting.js ~ line 31 ~ LinkBankingAccounting ~ data",
    data
  );
  const [file, setFile] = useState();
  const storedData = getLinkingAndBankingData();
  const appData = getReviewAppData();
  console.log(
    "🚀 ~ file: link-banking&accounting.js ~ line 34 ~ LinkBankingAccounting ~ appData",
    appData
  );
  const userDetails = getUserDetails();
  const [accoutingUrl, setAccoutingUrl] = useState();
  const [bankingUrl, setBankingUrl] = useState();
  const [copiedaccoutingUrl, setCopiedAccoutingUrl] = useState();
  const [accountingStatus, setAccoutingStatus] = useState(false);
  console.log(
    "🚀 ~ file: link-banking&accounting.js ~ line 30 ~ LinkBankingAccounting ~ userDetails",
    userDetails
  );
  const companyInfo = getCompanyInfo();
  console.log(
    "🚀 ~ file: link-banking&accounting.js ~ line 29 ~ LinkBankingAccounting ~ companyInfo",
    companyInfo
  );
  const [uploadBankStatementToggle, setUploadBankStatementToggle] =
    useState(false);

  const [fileList, setFileList] = useState([]);

  const hiddenFileInput = useRef(null);
  const accountingUrlRef = useRef(null);

  const copyAccoutingUrl = (url) => {
    console.log(
      "🚀 ~ file: link-banking&accounting.js ~ line 54 ~ copyAccoutingUrl ~ url",
      url
    );
    if (document.getElementById("accouting-url")) {
      document.getElementById("accouting-url").select();
      document.execCommand("copy");
    }
  };

  function handleChange(event) {
    let list = [...fileList];
    list.push(event.target.files[0]);
    setFileList(list);

    // setFile(event.target.files[0]);
    localStorage.setItem("fileList", JSON.stringify(list));
    let newlist = [];
    fileList.forEach((item) => {
      newlist.push({
        lastModified: item["lastModified"],

        lastModifiedDate: item["lastModifiedDate"],
        name: item["name"],
        size: item["size"],
        type: item["type"],
        webkitRelativePath: item["webkitRelativePath"],
      });
    });
  }

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const getLinkToAccouting = () => {
    let payload = {
      lm_id: userDetails["lead_id"],
      name: data["lf_business_name"],
      platformType: "0",
    };

    getLinkToAccountingData(payload).then((resp) => {
      console.log(
        "🚀 ~ file: link-banking&accounting.js ~ line 61 ~ getLinkToAccountingData ~ resp",
        resp,
        resp.success == "false" && resp.status == 500
      );
      if (resp.success == "false" && resp.code == 500) {
        getCompanyID(payload.lm_id).then((resp) => {
          setAccoutingUrl(
            `https://link-uat.codat.io/company/${resp.data.codat_client_id}`
          );
          console.log(
            "🚀 ~ file: link-banking&accounting.js ~ line 86 ~ getCompanyID ~ resp",
            resp
          );
          window.open(
            `https://link-uat.codat.io/company/${resp.data.codat_client_id}`,
            "_blank"
          );
        });
      } else {
        setAccoutingUrl(resp.data.id);
        window.open(
          `https://link-uat.codat.io/company/${resp.data.id}`,
          "_blank"
        );
      }
    });
  };

  const checkLinkingStatusClick = () => {
    // userDetails["lead_id"];
    checkLinkingStatus(userDetails["lead_id"])
      .then((resp) => {
        console.log(
          "🚀 ~ file: link-banking&accounting.js ~ line 103 ~ checkLinkingStatus ~ resp",
          resp
        );

        if (resp["message"] === "Status Updated to Linked") {
          setAccoutingStatus(true);
          setAccoutingUrl(resp.data.redirect);
        }
      })
      .catch((err) => {
        setAccoutingStatus(false);
        console.log(
          "🚀 ~ file: link-banking&accounting.js ~ line 112 ~ checkLinkingStatus ~ err",
          err
        );
      });
  };

  const checkBankingStatusClick = () => {
    // userDetails["lead_id"];
    checkBankingStatus(userDetails["lead_id"])
      .then((resp) => {
        console.log(
          "🚀 ~ file: link-banking&accounting.js ~ line 103 ~ checkLinkingStatus ~ resp",
          resp
        );

        // if (resp["message"] === "Status Updated to Linked") {
        //   setAccoutingStatus(true);
        //   setAccoutingUrl(resp.data.redirect);
        // }
      })
      .catch((err) => {
        // setAccoutingStatus(false);
        console.log(
          "🚀 ~ file: link-banking&accounting.js ~ line 112 ~ checkLinkingStatus ~ err",
          err
        );
      });
  };

  const getLinkToBanking = () => {
    let payload = {
      lm_um_id: data["lm_id"],
      lf_customer_name: data["lf_customer_name"],
      lf_customer_first_name: data["lf_customer_first_name"],
      lf_customer_last_name: data["lf_customer_last_name"],
      lf_customer_emailID: data["lf_customer_emailID"],
      lf_customer_DOB: data["lf_customer_DOB"],
      txtHomePostCode: data["ApptxtHomePostcodeuk"],
    };

    getAccountScore(data["lm_id"], payload).then((resp) => {
      console.log(
        "🚀 ~ file: link-banking&accounting.js ~ line 61 ~ getLinkToAccountingData ~ resp",
        resp
      );
      if (resp.isSuccess == "1" && resp.url) {
        console.log("resp.url", resp.url);
        setBankingUrl(resp.url);
        window.open(resp.url, "_blank");
        // getCompanyID(payload.lm_id).then((resp) => {
        //   setAccoutingUrl(
        //     `https://link-uat.codat.io/company/${resp.data.codat_client_id}`
        //   );
        //   console.log(
        //     "🚀 ~ file: link-banking&accounting.js ~ line 86 ~ getCompanyID ~ resp",
        //     resp
        //   );
        //   window.open(
        //     `https://link-uat.codat.io/company/${resp.data.codat_client_id}`,
        //     "_blank"
        //   );
        // });
      } else {
        // setAccoutingUrl(resp.data.id);
        // window.open(
        //   `https://link-uat.codat.io/company/${resp.data.id}`,
        //   "_blank"
        // );
      }
    });
  };

  const deleteFile = (i) => {
    let list = [...fileList];
    list.splice(i, 1);
    setFileList(list);
  };

  useEffect(() => {
    checkLinkingStatusClick();
    // getData();
  }, []);
  return (
    <div className="dashboard-box position-relative card dashboard-card">
      <div className="review-application">
        <h3>Link Banking & Accounting</h3>
        <div className="row">
          <div
            className="col-md-7"
            style={{
              pointerEvents: uploadBankStatementToggle ? "none" : "",
              opacity: uploadBankStatementToggle ? 0.3 : "",
            }}
          >
            <div className="Accounting-left-panel d-flex align-items-center justify-content-between">
              <div>
                <button
                  className="btn btn-primary banking-btn"
                  type="button"
                  onClick={() => getLinkToBanking()}
                >
                  Link To Banking <i className="fa fa-chevron-right"></i>
                </button>
                <div className="tooltip-panel">
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id="button-tooltip-link-to-banking">
                        <div>
                          Connect your bank account using Open Banking.
                          <br /> Only the following required data will be
                          requested:
                          <div>
                            <ul style={{ width: "235px" }}>
                              <li>Incoming transactions for the last year</li>
                              <li> Outgoing transactions for the last year</li>
                            </ul>
                          </div>
                        </div>
                      </Tooltip>
                    }
                  >
                    {/* <tooltip> */}
                    {({ ref, ...triggerHandler }) => (
                      <img
                        className="cursor-pointer"
                        ref={ref}
                        {...triggerHandler}
                        src={require("../../../images/info-icon.png")}
                        alt=""
                      />
                    )}
                  </OverlayTrigger>

                  {bankingUrl && (
                    <>
                      <div className="banking-url">
                        <div className="form-group">
                          <label>Banking URL</label>
                          <input
                            type="text"
                            name="url"
                            placeholder="https://www.domain.com/dummy-url-will-be-here"
                            className="form-control"
                            disabled
                          />
                          <button className="copyicon-col btn btn-primary">
                            <i class="fa fa-clone" aria-hidden="true"></i>
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
                          />
                          <button
                            className="checkstatus-btn btn btn-primary"
                            type="button"
                            onClick={() => checkBankingStatusClick()}
                          >
                            Check status
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                {!accountingStatus && (
                  <>
                    <button
                      className="btn btn-primary accounting-btn"
                      onClick={() => {
                        getLinkToAccouting();
                      }}
                    >
                      Link To Accounting <i className="fa fa-chevron-right"></i>
                    </button>
                    <div className="tooltip-panel accounting-tooltip">
                      {/* <tooltip>
                  <i
                    className="fa fa-info-circle"
                    data-tip="Connect your Accounting software to seamlessly view all your data on the portal and help increase your loan acceptance rate."
                  >
                    <ReactTooltip className={"tooltippanel"} />
                  </i>
                </tooltip> */}
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id="button-tooltip-link-to-banking">
                            <div>
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
                          </Tooltip>
                        }
                      >
                        {/* <tooltip> */}
                        {({ ref, ...triggerHandler }) => (
                          <img
                            className="cursor-pointer"
                            ref={ref}
                            {...triggerHandler}
                            src={require("../../../images/info-icon.png")}
                            alt=""
                          />
                        )}

                        {/* </tooltip> */}
                      </OverlayTrigger>
                    </div>
                  </>
                )}

                {accoutingUrl && (
                  <>
                    {" "}
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
                          type="button"
                          onClick={copyAccoutingUrl(accoutingUrl)}
                        >
                          <i class="fa fa-clone" aria-hidden="true"></i>
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
                          value={accountingStatus ? "Linked" : "Unlinked"}
                        />
                        <button
                          className="checkstatus-btn btn btn-primary"
                          type="button"
                          onClick={() => checkLinkingStatusClick()}
                        >
                          Check status
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="upload-doc-panel">
              <div className="form-group">
                <input
                  type="checkbox"
                  onClick={(e) =>
                    setUploadBankStatementToggle(e.target.checked)
                  }
                  name="Upload Bank Statement Copies Instead"
                  className="upload-checkbox"
                  checked={uploadBankStatementToggle}
                />
                <label>Upload bank statement copies instead</label>
              </div>

              {uploadBankStatementToggle && (
                <div className="upload-area" id="divcheck">
                  <p>
                    <strong>Please upload the following document :</strong>
                  </p>
                  <ul>
                    <li>6 month bank statement.</li>
                    <li>
                      Any relevant documentation that might help your
                      application
                    </li>
                  </ul>

                  {fileList.length > 0 && (
                    <div className="uploaded-file">
                      <p>
                        <strong>File Uploaded:</strong>
                      </p>
                      {fileList.map((item, i) => {
                        return (
                          <div
                            className="d-flex justify-content-between my-2"
                            key={i}
                          >
                            <div>{item.name}</div>{" "}
                            <div className="cursor-pointer">
                              {" "}
                              <i
                                className="fa fa-trash cursor-pointer"
                                onClick={() => deleteFile(i)}
                              ></i>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="upload-box">
                    <input
                      type="file"
                      name="file"
                      ref={hiddenFileInput}
                      onChange={handleChange}
                      className="upload-doc"
                      accept="image/png,image/jpeg,.pdf"
                      hidden
                    />
                    <button
                      className="btn btn-primary upload-btn"
                      onClick={handleClick}
                    >
                      Upload
                    </button>
                    <p>Max file size: 5MB</p>
                    <p>Supported file types: PDF, PNG & JPEG</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn"
          onClick={() => {
            setActiveStep(activeStep - 1);
            setDashboardStepNo(activeStep - 1);
          }}
          style={{ backgroundColor: "#E2E2E2" }}
          type="button"
        >
          {" "}
          <i className="bi bi-chevron-left"></i>Back
        </button>
        <div className="d-flex">
          <button
            className="btn mr-2"
            style={{ backgroundColor: "transparent" }}
            onClick={() => {
              setActiveStep(activeStep + 1);
              setDashboardStepNo(activeStep + 1);
            }}
            type="button"
          >
            Skip this step
          </button>

          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#006090" }}
            onClick={() => {
              setActiveStep(activeStep + 1);
              setDashboardStepNo(activeStep + 1);
            }}
            disabled={
              (uploadBankStatementToggle && !fileList.length) ||
              (!uploadBankStatementToggle && !accoutingUrl && !bankingUrl)
            }
          >
            Next <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LinkBankingAccounting;

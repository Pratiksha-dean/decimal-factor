import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { OverlayTrigger, Toast, Tooltip } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import {
  checkAccountingStatus,
  checkBankingStatus,
  checkLinkingStatus,
  deleteDocuments,
  getAccountScore,
  getCompanyID,
  getDocumentBankStatements,
  getDocuments,
  getLinkToAccountingData,
  uploadDocuments,
} from "../../../request";
import { getUserDetails } from "../../login/loginpage";
import { getCompanyInfo } from "../../requestaquote/components/business-information";
import { ToastMessage } from "../../ToastMessage";
import { getReviewAppData, setDashboardStepNo } from "../dashboard";

export const setLinkingAndBankingData = (data) => {
  localStorage.setItem("reviewLinkingAndBankingData", JSON.stringify(data));
};

export const getLinkingAndBankingData = () => {
  return JSON.parse(localStorage.getItem("reviewLinkingAndBankingData"));
};

export const setUploadBankStatement = (data) => {
  localStorage.setItem("uploadBankStatement", JSON.stringify(data));
};

export const getUploadBankStatement = () => {
  return JSON.parse(localStorage.getItem("uploadBankStatement"));
};

function LinkBankingAccounting({ data, activeStep, setActiveStep, request }) {
  const [file, setFile] = useState();
  const storedData = getUploadBankStatement();
  const appData = getReviewAppData();
  console.log(
    "🚀 ~ file: link-banking&accounting.js ~ line 34 ~ LinkBankingAccounting ~ appData",
    appData
  );
  const userDetails = getUserDetails();
  const [accoutingUrl, setAccoutingUrl] = useState();
  const [bankingUrl, setBankingUrl] = useState();
  const [bankingStatus, setBankingStatus] = useState(false);
  const [accountingStatus, setAccoutingStatus] = useState(false);
  const [loadingBanking, setLoadingBanking] = useState(false);
  const [loadingAccouting, setLoadingAccouting] = useState(false);

  const companyInfo = getCompanyInfo();
  const [uploadBankStatementToggle, setUploadBankStatementToggle] =
    useState(storedData);

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = () => {
    if (userDetails && userDetails["lead_id"] && storedData) {
      getDocumentBankStatements(userDetails["lead_id"]).then((resp) => {
        if (resp.records.length > 0 && resp["record_count"] !== 0) {
          let list = [];
          resp.records.forEach((item) => {
            console.log("****", item);

            list.push({
              file: { name: item["la_file_description"] },
              type: item["la_doc_type"],
              id: item["la_id"],
            });

            console.log(
              "🚀 ~ file: business-credit-score.js ~ line 41 ~ resp.records.forEach ~ item",
              item
            );
            console.log(
              "🚀 ~ file: business-credit-score.js ~ line 29 ~ list.map ~ item",
              item
            );
          });
          console.log(
            "🚀 ~ file: business-credit-score.js ~ line 28 ~ getDocuments ~ list",
            list
          );
          setFileList(list);
        }
        // setFileList(resp.records);
        console.log(
          "🚀 ~ file: business-credit-score.js ~ line 28 ~ getDocuments ~ resp",
          resp
        );
      });
    }
  };

  const hiddenFileInput = useRef(null);
  const accountingUrlRef = useRef(null);

  const copyLinkToClipboard = (bankingUrlToCopy) => {
    navigator.clipboard.writeText(bankingUrlToCopy);
    ToastMessage("Url copied to clipboard!", "success");
  };

  function handleChange(event) {
    let list = [...fileList];
    let totalSizeMB = event.target.files[0]["size"] / Math.pow(1024, 2);

    console.log(
      "🚀 ~ file: business-credit-score.js ~ line 33 ~ handleChange ~ totalSizeMB",
      totalSizeMB,
      totalSizeMB < 5
    );
    if (totalSizeMB < 5) {
      list.push({ file: event.target.files[0] });
      setFileList(list);
    } else {
      ToastMessage("File size needs to be less than 5 MB", "error");
    }
  }

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const getLinkToAccouting = (isClicked) => {
    let payload = {
      lm_id: userDetails["lead_id"],
      name: data["lf_business_name"],
      platformType: "0",
    };

    getCompanyID(payload.lm_id).then((resp) => {
      console.log(
        "🚀 ~ file: link-banking&accounting.js ~ line 140 ~ getCompanyID ~ resp",
        resp
      );
      if (resp["data"] && resp["data"]["codat_client_id"]) {
        setLoadingAccouting(false);
        setAccoutingUrl(
          `https://link-uat.codat.io/company/${resp.data.codat_client_id}`
        );
      }
      console.log(
        "🚀 ~ file: link-banking&accounting.js ~ line 140 ~ getCompanyID ~ resp",
        resp
      );
      setLoadingAccouting(false);

      console.log(
        "🚀 ~ file: link-banking&accounting.js ~ line 140 ~ getCompanyID ~ resp",
        resp
      );

      if (!resp.data) {
        console.log("&&");
        if (isClicked) {
          getLinkToAccountingData(payload)
            .then((resp) => {
              console.log(
                "🚀 ~ file: link-banking&accounting.js ~ line 152 ~ .then ~ resp",
                resp
              );
              if (resp.success == "false" && resp.code == 500) {
                //  getCompanyID(payload.lm_id).then((resp) => {
                //    setLoadingAccouting(false);
                //    setAccoutingUrl(
                //      `https://link-uat.codat.io/company/${resp.data.codat_client_id}`
                //    );
                //    if (isClicked) {
                //      window.open(
                //        `https://link-uat.codat.io/company/${resp.data.codat_client_id}`,
                //        "_blank"
                //      );
                //    }
                //  });
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

      // setAccoutingUrl(
      //   `https://link-uat.codat.io/company/${resp.data.codat_client_id}`
      // );
      // if (isClicked) {
      //   window.open(
      //     `https://link-uat.codat.io/company/${resp.data.codat_client_id}`,
      //     "_blank"
      //   );
      // }
    });
    return;
    getLinkToAccountingData(payload)
      .then((resp) => {
        if (resp.success == "false" && resp.code == 500) {
          getCompanyID(payload.lm_id).then((resp) => {
            setLoadingAccouting(false);

            setAccoutingUrl(
              `https://link-uat.codat.io/company/${resp.data.codat_client_id}`
            );
            if (isClicked) {
              window.open(
                `https://link-uat.codat.io/company/${resp.data.codat_client_id}`,
                "_blank"
              );
            }
          });
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
  };

  const checkAccountingStatusClick = () => {
    // userDetails["lead_id"];
    // setLoadingAccouting(true);
    checkAccountingStatus(userDetails["lead_id"])
      .then((resp) => {
        console.log(
          "🚀 ~ file: link-banking&accounting.js ~ line 113 ~ .then ~ resp",
          resp
        );
        if (resp["message"] === "Status Updated to Linked") {
          setAccoutingStatus(true);
          setAccoutingUrl(resp.data.redirect);
          setLoadingAccouting(false);
        } else if (resp["status"] == "PendingAuth") {
          setAccoutingStatus(false);
          setLoadingAccouting(false);

          // setAccoutingUrl(resp.data.redirect);
        }
      })
      .catch((err) => {
        setAccoutingStatus(false);
        if (!accoutingUrl) {
          getLinkToAccouting();
        }
        console.log(
          "🚀 ~ file: link-banking&accounting.js ~ line 112 ~ checkLinkingStatus ~ err",
          err
        );
      });
  };

  const checkBankingStatusClick = () => {
    // userDetails["lead_id"];
    // setLoadingBanking(true);
    checkBankingStatus(userDetails["lead_id"])
      .then((resp) => {
        console.log(
          "🚀 ~ file: link-banking&accounting.js ~ line 145 ~ .then ~ resp",
          resp
        );

        if (resp["response"] == "Completed") {
          setBankingUrl(
            `https://connect.consents.online/decimalfactor?externalref=${data["obv_account_score_customer_ref_id"]}`
          );
          setBankingStatus(true);
          console.log(data, "**");
        }
        setLoadingBanking(false);
      })
      .catch((err) => {
        setBankingStatus(false);
        setLoadingBanking(false);
      });
  };

  const getLinkToBanking = (isClicked) => {
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
      if (resp.isSuccess == "1" && resp.url) {
        setBankingUrl(resp.url);
        if (isClicked) {
          window.open(resp.url, "_blank");
        }
      } else {
      }
    });
  };

  const deleteFile = (item, i) => {
    let list = [...fileList];

    console.log(
      "🚀 ~ file: business-credit-score.js ~ line 66 ~ deleteFile ~ item",
      item
    );
    if (item["id"]) {
      deleteDocuments(item["id"]).then((resp) => {
        console.log(
          "🚀 ~ file: business-credit-score.js ~ line 72 ~ deleteDocuments ~ resp",
          resp,
          resp.status == "success"
        );
        if (resp.status == "success") {
          ToastMessage(resp.records, "success");
          // getFiles();
          list.splice(i, 1);
          setFileList(list);
        }
        console.log(
          "🚀 ~ file: business-credit-score.js ~ line 75 ~ deleteFile ~ resp",
          resp
        );
      });
    } else {
      list.splice(i, 1);
      setFileList(list);
      ToastMessage("Lead Attachments Deleted Successfully.", "success");
    }
  };

  useEffect(() => {
    request();
    checkAccountingStatusClick();
    checkBankingStatusClick();
  }, []);

  useEffect(() => {
    if (data) {
      setLoadingAccouting(true);

      checkAccountingStatusClick();

      if (data["obv_account_score_status"] == "Start") {
        setBankingUrl(
          `https://connect.consents.online/decimalfactor?externalref=${data["obv_account_score_customer_ref_id"]}`
        );
        setBankingStatus(false);
      } else if (data["obv_account_score_status"] == "Completed") {
        setBankingStatus(true);
      }
    } else {
      setLoadingBanking(true);
      checkBankingStatusClick();
    }
  }, [data]);

  const onSubmit = () => {
    if (uploadBankStatementToggle) {
      console.log("filelist", fileList);
      let identityProofDocs = fileList.map((item) => {
        console.log(
          "🚀 ~ file: business-credit-score.js ~ line 114 ~ ).map ~ item",
          item
        );
        if (!item.id) {
          return item.file;
        } else {
          return;
        }
      });

      console.log(
        "🚀 ~ file: link-banking&accounting.js ~ line 286 ~ onSubmit ~ identityProofDocs",
        identityProofDocs
      );
      uploadDocuments(
        {
          fullname: `${userDetails["first_name"]} ${userDetails["last_name"]}`,
          bank_statements: identityProofDocs,
        },
        userDetails["lead_id"]
      )
        .then((resp) => {
          if (resp.isSuccess == 1) {
            ToastMessage("Attachments uploaded successfully!", "success");
            setActiveStep(activeStep + 1);
            setDashboardStepNo(activeStep + 1);
          }
          console.log(
            "🚀 ~ file: business-credit-score.js ~ line 193 ~ ).then ~ resp",
            resp
          );
        })
        .catch((err) => {
          ToastMessage("Something went wrong!", "error");
        });
    } else {
      setActiveStep(activeStep + 1);
      setDashboardStepNo(activeStep + 1);
    }
  };
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
            {loadingBanking && <h6>Loading Banking Data...</h6>}
            <div className="Accounting-left-panel">
              {!bankingUrl && !loadingBanking && (
                <>
                  <button
                    className="btn btn-primary banking-btn"
                    type="button"
                    onClick={() => getLinkToBanking(true)}
                  >
                    Link To Banking <i className="fa fa-chevron-right"></i>
                  </button>
                  <div className="tooltip-panel accounting-tooltip mr-2">
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
                                <li>
                                  {" "}
                                  Outgoing transactions for the last year
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Tooltip>
                      }
                    >
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
                  </div>
                </>
              )}

              {bankingUrl && !loadingBanking && (
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
                        value={bankingUrl}
                      />
                      <button
                        className="copyicon-col btn btn-primary"
                        type="button"
                        onClick={() => copyLinkToClipboard(bankingUrl)}
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
                        value={bankingStatus ? "Linked" : "Unlinked"}
                        disabled
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

              {loadingAccouting && <h6>Loading Accouting Data.....</h6>}

              {!accoutingUrl && !loadingAccouting && (
                <>
                  <button
                    className="btn btn-primary accounting-btn"
                    onClick={() => {
                      getLinkToAccouting(true);
                    }}
                  >
                    Link To Accounting <i className="fa fa-chevron-right"></i>
                  </button>
                  <div className="tooltip-panel accounting-tooltip">
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="button-tooltip-link-to-banking">
                          <div>
                            Connect your accounting software to seamlessly view
                            all your data on the portal and the help increase
                            your loan acceptance rate.
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
                  </div>
                </>
              )}

              {accoutingUrl && !loadingAccouting && (
                <>
                  <div className="banking-url">
                    <hr />

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
                        onClick={() => copyLinkToClipboard(accoutingUrl)}
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
                        onClick={() => checkAccountingStatusClick(true)}
                      >
                        Check status
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-md-5">
            <div className="upload-doc-panel">
              <div className="form-group">
                <input
                  type="checkbox"
                  onClick={(e) => {
                    setUploadBankStatementToggle(e.target.checked);
                    setUploadBankStatement(e.target.checked);
                  }}
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
                            <div className="file-name">{item.file ? item.file.name : ""}</div>{" "}
                            <div className="cursor-pointer">
                              {" "}
                              <i
                                className="fa fa-trash cursor-pointer"
                                onClick={() => deleteFile(item, i)}
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
              onSubmit();
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

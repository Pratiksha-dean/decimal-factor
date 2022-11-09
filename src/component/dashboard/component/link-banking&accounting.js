import React from "react";
import { useRef } from "react";
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { setDashboardStepNo } from "../dashboard";

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

function LinkBankingAccounting({ activeStep, setActiveStep }) {
  const [file, setFile] = useState();
  const storedData = getLinkingAndBankingData();
  const [uploadBankStatementToggle, setUploadBankStatementToggle] =
    useState(false);

  const [fileList, setFileList] = useState([]);

  const hiddenFileInput = useRef(null);

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
            <div className="Accounting-left-panel">
              <button className="btn btn-primary banking-btn">
                Link To Banking <i className="fa fa-chevron-right"></i>
              </button>
              <div className="tooltip-panel">
                <tooltip>
                  <i
                    className="fa fa-info-circle"
                    data-tip="Use Open Banking to directly link your bank account information without the need of providing bank statements."
                  >
                    <ReactTooltip className={"tooltippanel"} />
                  </i>
                </tooltip>
              </div>

              <div className="banking-url">
                <div className="form-group">
                  <label>Banking URL</label>
                  <input
                    type="text"
                    name="url"
                    placeholder="https://www.domain.com/dummy-url-will-be-here"
                    className="form-control"
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
                  <button className="checkstatus-btn btn btn-primary">
                    Check status
                  </button>
                </div>
              </div>

              <button className="btn btn-primary accounting-btn">
                Link To Accounting <i className="fa fa-chevron-right"></i>
              </button>
              <div className="tooltip-panel accounting-tooltip">
                <tooltip>
                  <i
                    className="fa fa-info-circle"
                    data-tip="Connect your Accounting software to seamlessly view all your data on the portal and help increase your loan acceptance rate."
                  >
                    <ReactTooltip className={"tooltippanel"} />
                  </i>
                </tooltip>
              </div>

              <div className="banking-url">
                <div className="form-group">
                  <label>Accounting URL</label>
                  <input
                    type="text"
                    name="url"
                    placeholder="https://www.domain.com/dummy-url-will-be-here"
                    className="form-control"
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
                  <button className="checkstatus-btn btn btn-primary">
                    Check status
                  </button>
                </div>
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
                <label>Upload Bank Statement Copies Instead</label>
              </div>

              {uploadBankStatementToggle && (
                <div className="upload-area" id="divcheck">
                  <p>
                    <strong>Please upload the following document :</strong>
                  </p>
                  <ul>
                    <li>6 month bank statement.</li>
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
                            <div>
                              {" "}
                              <i
                                className="fa fa-trash cursor-pointer"
                                onClick={() => setFile("")}
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
                      accept="application/pdf"
                    />
                    <button
                      className="btn btn-primary upload-btn"
                      onClick={handleClick}
                    >
                      Upload
                    </button>
                    <p>Max file size: 2MB</p>
                    <p>Supported file types: PDF</p>
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
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Next <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LinkBankingAccounting;

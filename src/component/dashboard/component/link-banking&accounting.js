import React from 'react';
import ReactTooltip from 'react-tooltip';

function checkMe(selected) {
  if (selected) {
    document.getElementById("divcheck").style.display = "block";
  } else {
    document.getElementById("divcheck").style.display = "none";
  }
}

function LinkBankingAccounting() {
  useEffect(() => {
    console.log(document.getElementsByClassName("buttonsdiv")[0]);
  });

  return (
    <div className="dashboard-box position-relative card dashboard-card">
                <div className="review-application">
                   <h3>Link Banking & Accounting</h3>
                   <div className="row">

                  <div className="col-md-7">
                    <div className="Accounting-left-panel">
                      <button className="btn btn-primary banking-btn">Link To Banking <i className="fa fa-chevron-right"></i></button>
                      <div className="tooltip-panel">
                      <tooltip><i className="fa fa-info-circle" data-tip="Use Open Banking to directly link your bank account information without the need of providing bank statements."><ReactTooltip className={"tooltippanel"} /></i></tooltip>
                      </div>

                      <div className="banking-url">
                        <div className="form-group">
                          <label>Banking URL</label>
                          <input type="text" name="url" placeholder="https://www.domain.com/dummy-url-will-be-here" className="form-control" />
                          <button className="copyicon-col btn btn-primary"><i class="fa fa-clone" aria-hidden="true"></i></button>
                        </div>
                      </div>
                      <div className="banking-url">
                        <div className="form-group">
                          <label>Status</label>
                          <input type="text" name="Status" placeholder="Unlinked" className="form-control" />
                          <button className="checkstatus-btn btn btn-primary">Check status</button>
                        </div>
                      </div>

                      <button className="btn btn-primary accounting-btn">Link To Accounting <i className="fa fa-chevron-right"></i>
                      </button>
                      <div className="tooltip-panel accounting-tooltip">
                      <tooltip><i className="fa fa-info-circle" data-tip="Connect your Accounting software to seamlessly view all your data on the portal and help increase your loan acceptance rate."><ReactTooltip className={"tooltippanel"} /></i></tooltip>
                       </div>

                      <div className="banking-url">
                        <div className="form-group">
                          <label>Accounting URL</label>
                          <input type="text" name="url" placeholder="https://www.domain.com/dummy-url-will-be-here" className="form-control" />
                          <button className="copyicon-col btn btn-primary"><i class="fa fa-clone" aria-hidden="true"></i></button>
                        </div>
                      </div>
                      <div className="banking-url">
                        <div className="form-group">
                          <label>Status</label>
                          <input type="text" name="Status" placeholder="Unlinked" className="form-control" />
                          <button className="checkstatus-btn btn btn-primary">Check status</button>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="col-md-5">
                    <div className="upload-doc-panel">
                      <div className="form-group">

                        <input type="checkbox" onClick={(e)=>checkMe(e.target.checked)} name="Upload Bank Statement Copies Instead" className="upload-checkbox" />
                        <label>Upload Bank Statement Copies Instead</label>
                      </div>
                      <div className="upload-area" id="divcheck" style={{display:"none"}}>
                      <p><strong>Please upload the following document :</strong></p>
                      <ul>
                        <li>6 month bank statement.</li>
                      </ul>
                      <div className="uploaded-file">
                        <p><strong>File Uploaded:</strong></p>
                        <p><span>MY-BANK-STATEMENT-2022.PDF</span> <i className="fa fa-trash"></i></p>
                      </div>
                      <div className="upload-box">

                        <input type="file" name="file" className="upload-doc" />
                        <button className="btn btn-primary upload-btn">Upload</button>
                        <p>Max file size: 2MB</p>
                        <p>Supported file types: PDF</p>
                      </div>
                      </div>
                    </div>
                  </div>
                 </div>

                 </div>


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
                  onClick={(e) => checkMe(e.target.checked)}
                  name="Upload Bank Statement Copies Instead"
                  className="upload-checkbox"
                />
                <label>Upload Bank Statement Copies Instead</label>
              </div>
              <div
                className="upload-area"
                id="divcheck"
                style={{ display: "none" }}
              >
                <p>
                  <strong>Please upload the following document :</strong>
                </p>
                <ul>
                  <li>6 month bank statement.</li>
                </ul>
                <div className="uploaded-file">
                  <p>
                    <strong>File Uploaded:</strong>
                  </p>
                  <p>
                    <span>MY-BANK-STATEMENT-2022.PDF</span>{" "}
                    <i className="fa fa-trash"></i>
                  </p>
                </div>
                <div className="upload-box">
                  <input type="file" name="file" className="upload-doc" />
                  <button className="btn btn-primary upload-btn">Upload</button>
                  <p>Max file size: 2MB</p>
                  <p>Supported file types: PDF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkBankingAccounting;

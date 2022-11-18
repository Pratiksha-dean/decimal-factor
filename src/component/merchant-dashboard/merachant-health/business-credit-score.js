import React from "react";

export default function BusinessCreditScore() {
  function checkMe(selected) {
    if (selected) {
      document.getElementById("divcheck").style.display = "block";
    } else {
      document.getElementById("divcheck").style.display = "none";
    }
  }

  const totalSizeMB = 1990 / Math.pow(1024, 2);

  return (
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
                I confirm that I am an authorised personal (Director or UBO) and
                consent to a soft business credit check.
              </label>
            </div>
          </div>
          <div className="col-md-12">
            <div
              className="upload-doc-panel upload-doc-panel-merchant"
              id="divcheck"
              style={{ display: "none" }}
            >
              <div className="row">
                <div className="col-md-5">
                  <div className="upload-area">
                    <p>
                      <strong>Please upload the following document :</strong>
                    </p>
                    <ul>
                      <li>
                        <b>Proof of ID.</b>
                        <ul>
                          <li>-Drivers License -Passport Copy</li>
                          <li>-Passport Copy</li>
                        </ul>
                      </li>

                      <li>
                        <b>Proof of Address.</b>
                        <ul>
                          <li>
                            -Bank Statement (Dated within the last 90 days)
                          </li>
                          <li>-Utility Bill (Dated within the last 90 days)</li>
                          <li>-Drivers License</li>
                        </ul>
                      </li>
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
                      accept="image/png,image/jpeg,.pdf"
                    />

                    <img
                      src={require("../../../images/file-pdf.png")}
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

                    <p>Max file size: 5MB each</p>
                    <p>Supported file types: PDF, JPG, PNG Bitmap etc.</p>
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
  );
}

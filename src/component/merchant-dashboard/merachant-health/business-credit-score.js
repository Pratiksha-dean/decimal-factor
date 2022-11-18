import React, { useRef, useState } from "react";
import { ToastMessage } from "../../ToastMessage";

export default function BusinessCreditScore() {
  const [checkBusinessCredit, setCheckBusinessCreditScore] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [identityProofList, setIdentityProofList] = useState([]);
  const [addressProofList, setAddressProofList] = useState([]);
  const [isIdentityProof, setIsIdentityProof] = useState(false);
  const [isAddressProof, setIsAddressProof] = useState(false);

  const hiddenFileInput = useRef(null);
  function checkMe(selected) {
    if (selected) {
      document.getElementById("divcheck").style.display = "block";
    } else {
      document.getElementById("divcheck").style.display = "none";
    }
  }

  const deleteFile = (i) => {
    let list = [...fileList];
    list.splice(i, 1);
    setFileList(list);
  };

  const totalSizeMB = 1990 / Math.pow(1024, 2);
  function handleChange(event) {
    let list = [...fileList];
    let totalSizeMB = event.target.files[0]["size"] / Math.pow(1024, 2);
    console.log(
      "🚀 ~ file: business-credit-score.js ~ line 33 ~ handleChange ~ totalSizeMB",
      totalSizeMB,
      totalSizeMB < 5
    );
    if (totalSizeMB < 5) {
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
    } else {
      ToastMessage("File size needs to be less than 5 MB", "error");
    }
  }

  const submitDocuments = () => {
    if (!checkBusinessCredit) {
      ToastMessage("Please select the checkbox", "error");
    }
  };

  return (
    <section>
      <div className="business-panel">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <input
                type="checkbox"
                onClick={(e) => setCheckBusinessCreditScore(e.target.checked)}
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
                        {/* <p>
                        <span>MY-ID-PROOF.JPG</span>{" "}
                        <i className="fa fa-trash"></i>
                      </p> */}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-6">
                  <p>
                    <strong>Select Document Category</strong>
                  </p>
                  <div className="d-flex justify-space-evenly my-3">
                    <button
                      className="btn btn-primary proof-btns mr-2"
                      type="button"
                      onClick={() => {
                        setIsIdentityProof(true);
                      }}
                    >
                      Proof of Identity
                    </button>
                    <button
                      className="btn btn-primary proof-btns"
                      type="button"
                      onClick={() => {
                        setIsIdentityProof(true);
                      }}
                    >
                      Proof of Address
                    </button>
                  </div>

                  {isIdentityProof && (
                    <>
                      <label className="form-label">
                        Upload Identity Proof
                      </label>
                      <div className="upload-box">
                        <input
                          type="file"
                          id="upload-file"
                          name="file"
                          className="upload-doc"
                          accept="image/png,image/jpeg,.pdf"
                          ref={hiddenFileInput}
                          onChange={handleChange}
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
                    </>
                  )}

                  {isIdentityProof && (
                    <>
                      {" "}
                      <label className="form-label">Upload Address Proof</label>
                      <div className="upload-box">
                        <input
                          type="file"
                          id="upload-file"
                          name="file"
                          className="upload-doc"
                          accept="image/png,image/jpeg,.pdf"
                          ref={hiddenFileInput}
                          onChange={handleChange}
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
                    </>
                  )}
                </div>
              </div>
              <button
                className="btn btn-primary save-btn next-btn"
                type="submit"
                onClick={() => {
                  submitDocuments();
                }}
              >
                Save <i className="fa fa-file-image-o"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

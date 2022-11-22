import { type } from "@testing-library/user-event/dist/type";
import clsx from "clsx";
import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import {
  deleteDocuments,
  downloadBusinessAccountScore,
  getBusinessAccountScore,
  getDocuments,
  uploadDocuments,
} from "../../../request";
import Loaderspinner from "../../loader";
import { getUserDetails } from "../../login/loginpage";
import { ToastMessage } from "../../ToastMessage";

export default function BusinessCreditScore() {
  const [checkBusinessCredit, setCheckBusinessCreditScore] = useState(false);
  const [fileList, setFileList] = useState([]);
  console.log(
    "🚀 ~ file: business-credit-score.js ~ line 16 ~ BusinessCreditScore ~ fileList",
    fileList
  );
  const [identityProofList, setIdentityProofList] = useState([]);
  const [addressProofList, setAddressProofList] = useState([]);
  const [isIdentityProof, setIsIdentityProof] = useState(false);
  const [isAddressProof, setIsAddressProof] = useState(false);
  const [selectedFileType, setSelectedFileType] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [businessCreditScore, setBusinessCreditScore] = useState(null);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingCreditScore, setLoadingCreditScore] = useState(false);
  console.log(
    "🚀 ~ file: business-credit-score.js ~ line 29 ~ BusinessCreditScore ~  !==null",
    businessCreditScore
  );
  console.log(
    "🚀 ~ file: business-credit-score.js ~ line 27 ~ BusinessCreditScore ~ isApproved",
    isApproved
  );
  const [error, setError] = useState(false);
  console.log(
    "🚀 ~ file: business-credit-score.js ~ line 18 ~ BusinessCreditScore ~ selectedFileType",
    selectedFileType
  );
  const userDetails = getUserDetails();

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = () => {
    if (userDetails && userDetails["lead_id"]) {
      getDocuments(userDetails["lead_id"]).then((resp) => {
        console.log(
          "🚀 ~ file: business-credit-score.js ~ line 40 ~ getDocuments ~ resp",
          resp
        );
        if (resp.records.length > 0 && resp["record_count"] !== 0) {
          let countAddressProofApproved = 0;
          let countIdentityProofApproved = 0;
          let list = [];
          resp.records.forEach((item) => {
            console.log("****", item["la_status"]);
            if (
              item["la_status"] == 1 &&
              item["la_doc_type"] == "Proof of Identity"
            ) {
              countIdentityProofApproved = countIdentityProofApproved + 1;
            } else if (
              item["la_status"] == 1 &&
              item["la_doc_type"] == "Proof of Address"
            ) {
              countAddressProofApproved = countAddressProofApproved + 1;
            }

            if (
              countAddressProofApproved > 0 &&
              countIdentityProofApproved > 0
            ) {
              setIsApproved(true);
            }
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
            "🚀 ~ file: business-credit-score.js ~ line 55 ~ resp.records.forEach ~ countAddressProofApproved",
            countAddressProofApproved,
            countAddressProofApproved
          );
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

  const hiddenFileAddressProofInput = useRef(null);
  const hiddenFileIndentityProofInput = useRef(null);

  useEffect(() => {
    if (isApproved) {
      setLoadingCreditScore(true);
      getBusinessAccountScore(userDetails["lead_id"])
        .then((resp) => {
          setBusinessCreditScore(resp.data);
          setLoadingCreditScore(false);

          console.log(
            "🚀 ~ file: business-credit-score.js ~ line 120 ~ getBusinessAccountScore ~ resp",
            resp
          );
        })
        .catch((err) => {
          setLoadingCreditScore(false);
        });
    }
  }, [isApproved]);

  const deleteFile = (item, i) => {
    console.log(
      "🚀 ~ file: business-credit-score.js ~ line 66 ~ deleteFile ~ item",
      item
    );

    let list = [...fileList];

    if (item["id"]) {
      deleteDocuments(item["id"]).then((resp) => {
        console.log(
          "🚀 ~ file: business-credit-score.js ~ line 72 ~ deleteDocuments ~ resp",
          resp,
          resp.status == "success"
        );
        if (resp.status == "success") {
          ToastMessage(resp.records, "success");
          list.splice(i, 1);
          setFileList(list);
          // getFiles();
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

  function handleChange(event, type) {
    console.log(
      "🚀 ~ file: business-credit-score.js ~ line 30 ~ handleChange ~ type",
      type
    );
    let list = [...fileList];
    let totalSizeMB = event.target.files[0]["size"] / Math.pow(1024, 2);

    console.log(
      "🚀 ~ file: business-credit-score.js ~ line 33 ~ handleChange ~ totalSizeMB",
      totalSizeMB,
      totalSizeMB < 5
    );
    if (totalSizeMB < 5) {
      list.push({ file: event.target.files[0], type: type });
      setFileList(list);
    } else {
      ToastMessage("File size needs to be less than 5 MB", "error");
    }
  }

  function handleAddressFileChange(event, type) {
    console.log(
      "🚀 ~ file: business-credit-score.js ~ line 73 ~ handleAddressFileChange ~ event",
      event
    );
    console.log(
      "🚀 ~ file: business-credit-score.js ~ line 96 ~ handleAddressFileChange ~ type",
      type
    );

    let list = [...fileList];
    let totalSizeMB = event.target.files[0]["size"] / Math.pow(1024, 2);
    // const binaryData = generateBinaryData(event.target.files[0]);
    // console.log(
    //   "🚀 ~ file: business-credit-score.js ~ line 59 ~ handleAddressFileChange ~ binaryData",
    //   binaryData
    // );

    console.log(
      "🚀 ~ file: business-credit-score.js ~ line 33 ~ handleChange ~ totalSizeMB",
      totalSizeMB,
      totalSizeMB < 5
    );
    if (totalSizeMB < 5) {
      list.push({ file: event.target.files[0], type: type });
      setFileList(list);
    } else {
      ToastMessage("File size needs to be less than 5 MB", "error");
    }
  }

  const submitDocuments = () => {
    if (!checkBusinessCredit) {
      ToastMessage("Please select the checkbox", "error");
      setError(true);
    } else {
      console.log(
        "🚀 ~ file: business-credit-score.js ~ line 76 ~ submitDocuments ~ file",
        fileList
      );

      let identityProofDocs = fileList
        .filter((file) => file.type == "Identity Proof")
        .map((item) => {
          if (!item.id) {
            return item.file;
          } else {
            return;
          }
        });
      let addressProofDocs = fileList
        .filter((file) => {
          if (file.type == "Address Proof") {
            return file.file;
          }
        })
        .map((item) => {
          if (!item.id) {
            return item.file;
          } else {
            return;
          }
        });

      if (!addressProofDocs.length && identityProofDocs.length) {
        ToastMessage("You must upload both the documents!", "error");
      } else {
        uploadDocuments(
          {
            fullname: `${userDetails["first_name"]} ${userDetails["last_name"]}`,
            address_proof: addressProofDocs.length ? addressProofDocs : [],
            identity_proof: identityProofDocs.length ? identityProofDocs : [],
          },
          userDetails["lead_id"]
        )
          .then((resp) => {
            if (resp.isSuccess == 1) {
              ToastMessage("Attachments uploaded successfully!", "success");
              getFiles();
            }
            console.log(
              "🚀 ~ file: business-credit-score.js ~ line 193 ~ ).then ~ resp",
              resp
            );
          })
          .catch((err) => {
            ToastMessage("Something went wrong!", "error");
          });
      }
    }
  };

  const downaloadCreditScore = async () => {
    setLoadingDownload(true);
    let response = await downloadBusinessAccountScore(userDetails["lead_id"])
      .then((data) => {
        console.log("pdf", data);
        let url = JSON.parse(data.response).Url;
        console.log(
          "🚀 ~ file: business-credit-score.js ~ line 282 ~ .then ~ url",
          url
        );
        setLoadingDownload(false);
        if (url) {
          let alink = document.createElement("a");

          alink.href = `https://sales.decimalfactor.com/staging/${url}`;
          alink.download = "SamplePDF.pdf";
          alink.click();
        }
        // if (url) {
        //   console.log("link", url);
        //   window.open(`${baseUrl}${url}`, "_blank");
        // } else {
        //   alert("There is no data");
        // }
        // setDownloadProgress(false);
      })
      .catch((err) => {
        console.log(`Error occured: ${err}`);
        // setDownloadProgress(false);
        setLoadingDownload(false);

        alert(err);
      });
    // downloadBusinessAccountScore(userDetails["lead_id"])
    //   .then((resp) => {
    //     console.log(
    //       "🚀 ~ file: business-credit-score.js ~ line 277 ~ downloadBusinessAccountScore ~ resp",
    //       resp,
    //       JSON.parse(resp)
    //     );
    //     let fileUrl = `https://sales.decimalfactor.com/staging/${resp.file}`;
    //     console.log(
    //       "🚀 ~ file: business-credit-score.js ~ line 282 ~ .then ~ fileUrl",
    //       fileUrl
    //     );
    //     // let alink = document.createElement("a");
    //     // // alink.href = fileUrl;/
    //     // alink.download = "SamplePDF.pdf";
    //     // alink.click();
    //   })
    //   .catch((err) => {
    //     console.log(
    //       "🚀 ~ file: business-credit-score.js ~ line 280 ~ downloadBusinessAccountScore ~ err",
    //       err
    //     );
    //   });
  };

  return (
    <section>
      <div className="business-panel">
        {!isApproved ? (
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <input
                  type="checkbox"
                  onClick={(e) => setCheckBusinessCreditScore(e.target.checked)}
                  name="Upload Bank Statement Copies Instead"
                  className={clsx("upload-checkbox ", {
                    "is-invalid": error && !checkBusinessCredit,
                  })}
                />
                <label>
                  I confirm that I am an authorised personal (Director or UBO)
                  and consent to a soft business credit check.
                </label>
                {error && !checkBusinessCredit && (
                  <div className="text-danger ml-2">
                    Please select the checkbox!
                  </div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div
                className="upload-doc-panel upload-doc-panel-merchant"
                id="divcheck"
              >
                <div className="row">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
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
                            <li>
                              -Utility Bill (Dated within the last 90 days)
                            </li>
                            <li>-Drivers License</li>
                          </ul>
                        </li>
                      </ul>

                      {fileList.length > 0 && (
                        <div className="uploaded-file">
                          <p>
                            <strong>File Uploaded:</strong>
                          </p>
                          <div class="table-responsive">
                            <table class="table table-bordered">
                              <thead>
                                <tr>
                                  <th scope="col">File Name</th>
                                  <th scope="col">Document Category</th>
                                  <th scope="col">Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                {fileList.map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td className="file-name">
                                        {item.file ? item.file.name : ""}
                                      </td>
                                      <td className="text-center">
                                        {item.type}
                                      </td>
                                      <td className="text-center">
                                        {" "}
                                        <i
                                          className="fa fa-trash cursor-pointer"
                                          style={{ float: "unset" }}
                                          onClick={() => deleteFile(item, i)}
                                        ></i>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                          {/* {fileList.map((item, i) => {
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
                        })} */}
                          {/* <p>
                        <span>MY-ID-PROOF.JPG</span>{" "}
                        <i className="fa fa-trash"></i>
                      </p> */}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <div className="col-md-1"></div> */}
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <p>
                      <strong>Select Document Category</strong>
                    </p>
                    <div className="d-flex justify-space-evenly my-3">
                      <button
                        className="btn btn-primary proof-doc-btns mr-2"
                        type="button"
                        onClick={() => {
                          setIsIdentityProof(true);
                        }}
                      >
                        Proof of Identity
                      </button>
                      <button
                        className="btn btn-primary proof-doc-btns"
                        type="button"
                        onClick={() => {
                          setIsAddressProof(true);
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
                            id="Identity-Proof"
                            name="file"
                            className="upload-doc"
                            accept="image/png,image/jpeg,.pdf"
                            ref={hiddenFileIndentityProofInput}
                            hidden
                            onChange={(e) => {
                              setSelectedFileType("Identity Proof");
                              handleChange(e, "Identity Proof");
                            }}
                          />

                          <img
                            src={require("../../../images/file-pdf.png")}
                            alt=""
                            className="upload-icon"
                          />
                          <label
                            for="upload-file"
                            className="btn btn-primary upload-btn"
                            onClick={() =>
                              hiddenFileIndentityProofInput.current.click()
                            }
                          >
                            {" "}
                            Upload
                          </label>

                          <p>Max file size: 5MB each</p>
                          <p>Supported file types: PDF, JPG, PNG Bitmap etc.</p>
                        </div>
                      </>
                    )}

                    {isAddressProof && (
                      <>
                        {" "}
                        <label className="form-label">
                          Upload Address Proof
                        </label>
                        <div className="upload-box">
                          <input
                            type="file"
                            id="Address-Proof"
                            name="file"
                            className="upload-doc"
                            accept="image/png,image/jpeg,.pdf"
                            hidden
                            ref={hiddenFileAddressProofInput}
                            onChange={(e) => {
                              setSelectedFileType("Address Proof");
                              handleAddressFileChange(e, "Address Proof");
                            }}
                          />

                          <img
                            src={require("../../../images/file-pdf.png")}
                            alt=""
                            className="upload-icon"
                          />
                          <label
                            for="upload-file"
                            className="btn btn-primary upload-btn"
                            onClick={() =>
                              hiddenFileAddressProofInput.current.click()
                            }
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
        ) : (
          <div className="">
            {loadingCreditScore ? (
              <Loaderspinner size="45px" />
            ) : (
              <div className="row">
                <div className="col-12">
                  <button
                    className="btn btn-primary download-score-btn"
                    onClick={downaloadCreditScore}
                    disabled={loadingDownload}
                  >
                    <i class="fa fa-cloud-arrow-down"></i> Download Your
                    Business Credit Score
                  </button>
                </div>
                <div className="col-xxl-5 col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
                  <table
                    className="border credit-score-table mb-3"
                    style={{ width: "100%" }}
                    cellspacing="0"
                    border="0"
                  >
                    <tbody>
                      {/* <th>hello</th> */}
                      <tr className="text-center credit-score-table-head">
                        <th colspan="3">Company Summary</th>
                      </tr>
                      <tr>
                        <td style={{ width: "40%" }}>
                          <strong>Business name</strong>
                        </td>
                        <td>
                          <strong>
                            {businessCreditScore &&
                              businessCreditScore["report"]["companySummary"][
                                "businessName"
                              ]}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Country</strong>
                        </td>
                        <td>
                          <strong>
                            {" "}
                            {businessCreditScore &&
                              businessCreditScore["report"]["companySummary"][
                                "country"
                              ]}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Company Number</strong>
                        </td>
                        <td>
                          {" "}
                          <strong>
                            {businessCreditScore &&
                              businessCreditScore["report"]["companySummary"][
                                "companyNumber"
                              ]}
                          </strong>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Company Registration Number</strong>
                        </td>
                        <td>
                          {" "}
                          <strong>
                            {" "}
                            {businessCreditScore &&
                              businessCreditScore["report"]["companySummary"][
                                "companyRegistrationNumber"
                              ]}
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table
                    className="border credit-score-table mb-3"
                    style={{ width: "100%" }}
                    cellspacing="0"
                    border="0"
                  >
                    <tbody>
                      {/* <th>hello</th> */}
                      <tr className="text-center credit-score-table-head">
                        <th colspan="3">Latest Shareholders Equity Figure </th>
                      </tr>
                      <tr>
                        <td style={{ width: "40%" }}>
                          <strong>Currency</strong>
                        </td>
                        <td>
                          <strong>
                            {businessCreditScore &&
                              businessCreditScore["report"][
                                "shareCapitalStructure"
                              ]["issuedShareCapital"]["currency"]}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Value</strong>
                        </td>
                        <td>
                          <strong>
                            {" "}
                            {businessCreditScore &&
                              businessCreditScore["report"][
                                "shareCapitalStructure"
                              ]["issuedShareCapital"]["value"]}
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-xxl-7 col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                      <table
                        className="border credit-score-table mb-3"
                        style={{ width: "100%" }}
                      >
                        <tr className="text-center credit-score-table-head">
                          <th colspan="3">Credit Rating</th>
                        </tr>
                        <tr>
                          <td>
                            <strong>Common Value</strong>
                          </td>
                          <td>
                            <strong>
                              {" "}
                              {businessCreditScore &&
                                businessCreditScore["report"]["companySummary"][
                                  "creditRating"
                                ]["commonValue"]}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Common Description</strong>
                          </td>
                          <td>
                            <strong>
                              {" "}
                              {businessCreditScore &&
                                businessCreditScore["report"]["companySummary"][
                                  "creditRating"
                                ]["commonDescription"]}
                            </strong>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                      <table
                        className="border credit-score-table "
                        style={{ width: "100%" }}
                      >
                        <tr className="text-center credit-score-table-head">
                          <th colspan="3">Credit Limit</th>
                        </tr>
                        <tr>
                          <td>
                            <strong>Currency</strong>
                          </td>
                          <td>
                            <strong>
                              {" "}
                              {businessCreditScore &&
                                businessCreditScore["report"]["companySummary"][
                                  "creditRating"
                                ]["creditLimit"]["currency"]}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Value</strong>
                          </td>
                          <td>
                            <strong>
                              {" "}
                              {businessCreditScore &&
                                businessCreditScore["report"]["companySummary"][
                                  "creditRating"
                                ]["creditLimit"]["value"]}
                            </strong>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <div className="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                      <table
                        className="border credit-score-table mt-3"
                        style={{ width: "100%" }}
                      >
                        <tr className="text-center credit-score-table-head">
                          <th colspan="3">Provider Value</th>
                        </tr>
                        <tr>
                          <td>
                            <strong>Max Value</strong>
                          </td>
                          <td>
                            <strong>
                              {" "}
                              {businessCreditScore &&
                                businessCreditScore["report"]["companySummary"][
                                  "creditRating"
                                ]["providerValue"]["maxValue"]}
                            </strong>
                          </td>{" "}
                        </tr>
                        <tr>
                          <td>
                            <strong>Min Value</strong>
                          </td>
                          <td>
                            <strong>
                              {" "}
                              {businessCreditScore &&
                                businessCreditScore["report"]["companySummary"][
                                  "creditRating"
                                ]["providerValue"]["minValue"]}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Value</strong>
                          </td>
                          <td>
                            <strong>
                              {" "}
                              {businessCreditScore &&
                                businessCreditScore["report"]["companySummary"][
                                  "creditRating"
                                ]["providerValue"]["value"]}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Provider Description</strong>
                          </td>
                          <td>
                            <strong>
                              {" "}
                              {businessCreditScore &&
                                businessCreditScore["report"]["companySummary"][
                                  "creditRating"
                                ]["providerDescription"]}
                            </strong>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <div className="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                      <table
                        className="border credit-score-table mt-3"
                        style={{ width: "100%" }}
                      >
                        <tr className="text-center credit-score-table-head">
                          <th colspan="3">Ccj Summary</th>
                        </tr>
                        <tr>
                          <td>
                            <strong>Exact Registered</strong>
                          </td>
                          <td>
                            <strong>
                              {businessCreditScore &&
                                businessCreditScore["report"][
                                  "negativeInformation"
                                ]["ccjSummary"]["exactRegistered"]}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Possible Registered</strong>
                          </td>
                          <td>
                            <strong>
                              {businessCreditScore &&
                                businessCreditScore["report"][
                                  "negativeInformation"
                                ]["ccjSummary"]["possibleRegistered"]}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Number Of Exact</strong>
                          </td>
                          <td>
                            <strong>
                              {" "}
                              {businessCreditScore &&
                                businessCreditScore["report"][
                                  "negativeInformation"
                                ]["ccjSummary"]["numberOfExact"]}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Number Of Possible</strong>
                          </td>
                          <td>
                            <strong>
                              {" "}
                              {businessCreditScore &&
                                businessCreditScore["report"][
                                  "negativeInformation"
                                ]["ccjSummary"]["numberOfPossible"]}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Number Of Satisfied</strong>
                          </td>
                          <td>
                            <strong>
                              {" "}
                              {businessCreditScore &&
                                businessCreditScore["report"][
                                  "negativeInformation"
                                ]["ccjSummary"]["numberOfSatisfied"]}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Number Of Writs</strong>
                          </td>
                          <td>
                            <strong>
                              {" "}
                              {businessCreditScore &&
                                businessCreditScore["report"][
                                  "negativeInformation"
                                ]["ccjSummary"]["numberOfWrits"]}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Currency</strong>
                          </td>
                          <td>
                            <strong>
                              {" "}
                              {businessCreditScore &&
                                businessCreditScore["report"][
                                  "negativeInformation"
                                ]["ccjSummary"]["currency"]}
                            </strong>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

{
  /* <table
                  className="border credit-score-table"
                  style={{ width: "100%" }}
                >
                  <tr className="text-center credit-score-table-head">
                    <th colspan="3">Company Summary</th>
                  </tr>
                  <tr>
                    <td>Business Name</td>
                    <td>Smith</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>Jackson</td>
                  </tr>
                  <tr>
                    <td>Company Number</td>
                    <td>Jackson</td>
                  </tr>

                  <tr>
                    <td>Company Registration Number</td>
                    <td>Jackson</td>
                  </tr>
                </table> */
}

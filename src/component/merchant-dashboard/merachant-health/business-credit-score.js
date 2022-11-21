import { type } from "@testing-library/user-event/dist/type";
import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import {
  deleteDocuments,
  getDocuments,
  uploadDocuments,
} from "../../../request";
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

  const hiddenFileAddressProofInput = useRef(null);
  const hiddenFileIndentityProofInput = useRef(null);

  const deleteFile = (item, i) => {
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
          getFiles();
        }
        console.log(
          "🚀 ~ file: business-credit-score.js ~ line 75 ~ deleteFile ~ resp",
          resp
        );
      });
    } else {
      let list = [...fileList];
      list.splice(i, 1);
      setFileList(list);
    }
  };

  const totalSizeMB = 1990 / Math.pow(1024, 2);
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
    } else {
      console.log(
        "🚀 ~ file: business-credit-score.js ~ line 76 ~ submitDocuments ~ file",
        fileList
      );

      let identityProofDocs = fileList
        .filter((file) => file.type == "Identity Proof")
        .map((item) => {
          return item.file;
          console.log(
            "🚀 ~ file: business-credit-score.js ~ line 114 ~ ).map ~ item",
            item
          );
        });
      let addressProofDocs = fileList
        .filter((file) => {
          if (file.type == "Address Proof") {
            return file.file;
          }
        })
        .map((item) => {
          return item.file;
        });

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
          }
          console.log(
            "🚀 ~ file: business-credit-score.js ~ line 193 ~ ).then ~ resp",
            resp
          );
        })
        .catch((err) => {
          ToastMessage("Something went wrong!", "error");
        });
      console.log(
        "🚀 ~ file: business-credit-score.js ~ line 151 ~ submitDocuments ~ addressProofDocs",
        addressProofDocs
      );
      console.log(
        "🚀 ~ file: business-credit-score.js ~ line 80 ~ submitDocuments ~ identityProofDocs",
        identityProofDocs
      );
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
                                    <td>{item.file ? item.file.name : ""}</td>
                                    <td className="text-center">{item.type}</td>
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
                <div className="col-md-1"></div>
                <div className="col-md-6">
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
                      <label className="form-label">Upload Address Proof</label>
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
      </div>
    </section>
  );
}

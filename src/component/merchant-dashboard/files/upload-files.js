import React from "react";
import Header from "../../header/header";
import SiderBarMenu from "../component/sidebar";
import StickyBox from "react-sticky-box";
import { useState } from "react";
import { useRef } from "react";
import { ToastMessage } from "../../ToastMessage";
import clsx from "clsx";
import {
  deleteDocuments,
  getAllDocuments,
  uploadFiles,
} from "../../../request";
import { getUserDetails } from "../../login/loginpage";
import moment from "moment";

export default function UploadFiles() {
  const [typeOfDocument, setTypeOfDocument] = useState();
  const hiddenFileInput = useRef(null);
  const [fileList, setFileList] = useState([]);
  const userDetails = getUserDetails();
  const [loading, setLoading] = useState(false);
  const [customDocumentType, setCustomDocumentType] = useState("");

  const getFiles = (list1) => {
    if (userDetails && userDetails["lead_id"]) {
      setLoading(true);
      getAllDocuments(userDetails["lead_id"])
        .then((resp) => {
          if (
            resp &&
            resp.records &&
            resp.records.length > 0 &&
            resp["record_count"] !== 0
          ) {
            setLoading(false);
            let list = [];
            resp.records.forEach((item) => {
              list.push({
                file: { name: item["la_file_description"] },
                type: item["la_doc_type"],
                id: item["la_id"],
                date: moment(item["la_update_date"]).format("DD-MM-YYYY"),
                path: item["la_filename"],
              });
            });
            let newList = [];
            let length = list1.length - 1;
            list.forEach((ele, i) => {
              if (i <= length) {
                newList.push(ele);
              }
            });

            setFileList(newList);
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  function handleChange(event) {
    if (event.target.files[0]) {
      setLoading(true);
      let list = [...fileList];
      let totalSizeMB = event.target.files[0]["size"] / Math.pow(1024, 2);
      if (totalSizeMB < 5) {
        let payload = {
          file_type:
            typeOfDocument !== "Others"
              ? typeOfDocument
              : typeOfDocument + "-" + customDocumentType,
          fullname: `${userDetails["first_name"]} ${userDetails["last_name"]}`,
          filedata: event.target.files[0],
        };
        uploadFiles(userDetails["lead_id"], payload)
          .then((resp) => {
            if (resp.isSuccess == 1) {
              ToastMessage("Attachment uploaded successfully!", "success");
              setCustomDocumentType("");
              setLoading(false);
              list.push({
                file: event.target.files[0],
                type:
                  typeOfDocument !== "Others"
                    ? typeOfDocument
                    : typeOfDocument + "-" + customDocumentType,
              });
              setFileList(list);
              getFiles(list);
            }
          })
          .catch((err) => {
            setLoading(false);
            ToastMessage("Something went wrong!", "error");
          });
      } else {
        ToastMessage("File size needs to be less than 5 MB", "error");
      }
      event.target.value = null;
    }
  }

  const deleteFile = (item, i) => {
    if (window.confirm("Are you sure remove the file!")) {
      let list = [...fileList];
      deleteDocuments(item["id"]).then((resp) => {
        if (resp.status == "success") {
          ToastMessage(resp.records, "success");
          list.splice(i, 1);
          setFileList(list);
        }
      });
    }
  };
  return (
    <div className="dashboard-panel upload-files">
      <Header />
      <div className="dashboard-body bg-change-color">
        <div className="container-fluid  merchant-body">
          <div
            style={{ display: "flex", alignItems: "flex-start", width: "100%" }}
          >
            <StickyBox>
              <SiderBarMenu />
            </StickyBox>
            <div className="right-panel-main">
              <h3>
                <i className="fa fa-file" aria-hidden="true"></i> Upload Files
              </h3>
              <div className="dashboard-box position-relative card dashboard-card">
                <p>
                  <strong>Document Categories</strong>
                </p>
                <div className="d-flex flex-wrap">
                  {/* <div className="col-xxl-2 col-xl-2 col-lg-3 col-md-3 col-sm-12 col-12"> */}
                  <button
                    className="btn btn-primary proof-doc-btns  mr-2"
                    type="button"
                    style={{
                      backgroundColor:
                        typeOfDocument === "Proof of Identity" ? "gray" : "",
                    }}
                    onClick={() => {
                      setTypeOfDocument("Proof of Identity");
                    }}
                  >
                    Proof of Identity
                  </button>
                  {/* </div> */}
                  {/* <div className="col-xxl-2 col-xl-2 col-lg-3 col-md-3 col-sm-12 col-12"> */}
                  <button
                    className="btn btn-primary proof-doc-btns  mr-2"
                    type="button"
                    onClick={() => {
                      setTypeOfDocument("Proof of Address");
                    }}
                    style={{
                      backgroundColor:
                        typeOfDocument === "Proof of Address" ? "gray" : "",
                    }}
                  >
                    Proof of Address
                  </button>
                  {/* </div> */}
                  {/* <div className="col-xxl-2 col-xl-2 col-lg-3 col-md-3 col-sm-12 col-12"> */}
                  <button
                    className="btn btn-primary proof-doc-btns mr-2"
                    type="button"
                    onClick={() => {
                      setTypeOfDocument("Bank Statements");
                    }}
                    style={{
                      backgroundColor:
                        typeOfDocument === "Bank Statements" ? "gray" : "",
                    }}
                  >
                    Bank Statements
                  </button>
                  <button
                    className="btn btn-primary proof-doc-btns mr-2"
                    type="button"
                    onClick={() => {
                      setTypeOfDocument("Financial Statements");
                    }}
                    style={{
                      backgroundColor:
                        typeOfDocument === "Financial Statements" ? "gray" : "",
                    }}
                  >
                    Financial Statements
                  </button>
                  <button
                    className="btn btn-primary proof-doc-btns mr-2"
                    type="button"
                    onClick={() => {
                      setTypeOfDocument("Others");
                    }}
                    style={{
                      backgroundColor:
                        typeOfDocument === "Others" ? "gray" : "",
                    }}
                  >
                    Others
                  </button>
                </div>

                <div className="row">
                  <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                    {typeOfDocument && (
                      <div className="mt-3">
                        <p>
                          <strong>
                            Selected Document Category : {typeOfDocument}
                          </strong>
                        </p>

                        {typeOfDocument == "Others" && (
                          <div className="form-group">
                            <label>Type Of Document</label>
                            <input
                              type="text"
                              placeholder="Enter Type Of Document"
                              //   name={fieldNames.FIRSTNAME}
                              className={clsx("form-control ")}
                              onChange={(e) => {
                                setCustomDocumentType(e.target.value);
                              }}
                              value={customDocumentType}
                            />
                          </div>
                        )}

                        <div className="upload-box">
                          <input
                            type="file"
                            id="Identity-Proof"
                            name="file"
                            className="upload-doc"
                            accept={
                              typeOfDocument !== "Bank Statements" &&
                              typeOfDocument !== "Financial Statements" &&
                              typeOfDocument !== "Others"
                                ? "image/png,image/jpeg,.pdf"
                                : "image/png,image/jpeg,.pdf,.csv,.xlsx,.xml"
                            }
                            ref={hiddenFileInput}
                            hidden
                            onChange={(e) => {
                              //   setSelectedFileType("Identity Proof");
                              handleChange(e, "Identity Proof");
                            }}
                          />

                          <img
                            src={require("../../../images/file-pdf.png")}
                            alt=""
                            className="upload-icon"
                          />
                          <button
                            htmlFor="upload-file"
                            className="btn btn-primary upload-btn"
                            onClick={() => hiddenFileInput.current.click()}
                            disabled={loading}
                          >
                            {loading ? "Uploading..." : "Upload"}
                          </button>

                          <p>Max file size: 5MB each</p>
                          <p>
                            Supported file types: PDF, JPG, PNG
                            {typeOfDocument === "Bank Statements" ||
                            typeOfDocument === "Financial Statements" ||
                            typeOfDocument === "Others"
                              ? ",CSV,XLSX,XML"
                              : ""}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                    {fileList.length > 0 && (
                      <div className="uploaded-file mt-3">
                        {/* <p>
                          <strong>File Uploaded:</strong>
                        </p> */}
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th scope="col">File Name</th>
                                <th scope="col">Document Category</th>
                                <th scope="col" className="text-center">
                                  Delete
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {fileList.map((item, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="file-name">
                                      {item.file ? item.file.name : ""}
                                    </td>
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
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Header from "../../header/header";
import SiderBarMenu from "../component/sidebar";
import StickyBox from "react-sticky-box";
import { useState } from "react";
import { API_URL, deleteDocuments, getAllDocuments } from "../../../request";
import { getUserDetails } from "../../login/loginpage";
import { useEffect } from "react";
import moment from "moment";
import Loaderspinner from "../../loader-spinner-inner";
import { ToastMessage } from "../../ToastMessage";

export default function ViewFiles() {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const userDetails = getUserDetails();

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = () => {
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
            setFileList(list);
          } else {
            setLoading(false);

            //   setLoadingCreditScore(false);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

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
    <div className="dashboard-panel">
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
                <i className="fa fa-file" aria-hidden="true"></i> View Files
              </h3>
              <div className="dashboard-box position-relative card dashboard-card">
                {loading ? (
                  <div className="center">
                    <Loaderspinner size="45px" />
                  </div>
                ) : fileList.length > 0 ? (
                  <div className="uploaded-file mt-3">
                    {/* <p>
                      <strong>File Uploaded:</strong>
                    </p> */}
                    <div className="table-responsive view-files">
                      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <table className="table table-bordered collapse-border">
                          <thead>
                            <tr>
                              <th scope="col">File Name</th>
                              <th scope="col">Document Category</th>
                              <th scope="col">Upload Date</th>
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
                                    <a
                                      href={`${API_URL}api/${item.path}`}
                                      target="_blank"
                                    >
                                      {item.file ? item.file.name : ""}
                                    </a>
                                  </td>
                                  <td>{item.type}</td>
                                  <td>{item.date}</td>
                                  <td className="text-center">
                                    <i
                                      className="fa fa-trash cursor-pointer"
                                      style={{ float: "unset" }}
                                      onClick={() => {
                                        deleteFile(item, i);
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="center text-center">
                    <i
                      className="fa fa-file-text-o file-icon"
                      aria-hidden="true"
                    ></i>
                    <div className="empty-text">No Files</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import ReactTooltip from "react-tooltip";
import Header from "../header/header";
import SiderBarMenu from "./component/sidebar";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { fieldNames } from "../requestaquote/components/application-information";
import PhoneInput from "react-phone-input-2";
import { useRef } from "react";
import { useState } from "react";
import { getUserDetails, setToken, setUserDetails } from "../login/loginpage";
import { useEffect } from "react";
import {
  API_URL,
  getDashboardData,
  getUserDetailsApi,
  updateUpdateCustomerInfo,
} from "../../request";
import StickyBox from "react-sticky-box";
import { ToastMessage } from "../ToastMessage";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { TRIGGER_USER_DETAILS } from "../../redux/actions/actionTypes";
import { useDispatch } from "react-redux/es";

function PersonalDetails() {
  const storeData = {};
  const data = {};

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const hiddenFileInput = useRef(null);
  const [dasboardData, setDashboardData] = useState();
  const userDetails = getUserDetails();
  const [file, setFile] = useState({
    file: "",
    preview: userDetails["profile_pic"]
      ? `${API_URL}${userDetails["profile_pic"]}`
      : "",
  });

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  const getData = () => {
    if (userDetails && userDetails.lead_id) {
      getDashboardData(userDetails.lead_id).then((resp) => {
        setDashboardData(resp.records[0]);
      });
    }
  };

  const initialValues = {
    [fieldNames.FIRSTNAME]: userDetails
      ? userDetails["first_name"]
      : dasboardData["lf_opener_name"].split(" ")[0],
    [fieldNames.LASTNAME]: userDetails
      ? userDetails["last_name"]
      : dasboardData["lf_opener_name"].split(" ")[1],
    [fieldNames.EMAIL]: userDetails
      ? userDetails["email"]
      : dasboardData["lf_business_email"],
    [fieldNames.PHONE]: userDetails["phone"]
      ? userDetails["phone"]
      : dasboardData && dasboardData["lf_telephone"],
    address: userDetails["address"] || "",
  };

  const validationSchema = Yup.object().shape({
    [fieldNames.FIRSTNAME]: Yup.string().required(),
    [fieldNames.LASTNAME]: Yup.string().required(),
    [fieldNames.EMAIL]: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Email is required"),
    [fieldNames.PHONE]: Yup.string().required("required"),
    address: Yup.string(),
  });

  function handleFileChange(event) {
    setFile({
      file: event.target.files[0],
      preview: URL.createObjectURL(event.target.files[0]),
    });
  }

  const handleClick = (event) => {
    hiddenFileInput.current.click();
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
                <i className="fa fa-user" aria-hidden="true"></i> Personal
                Details
              </h3>
              <div className="dashboard-box position-relative card dashboard-card">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  enableReinitialize={userDetails}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    let payload = { ...values };
                    payload["uploadimage"] = file.file;

                    updateUpdateCustomerInfo(payload, userDetails["lead_id"])
                      .then((resp) => {
                        setLoading(false);
                        if (resp.isSuccess == 1) {
                          ToastMessage("Data saved successfully!", "success");
                          getUserDetailsApi(userDetails.lead_id)
                            .then((response) => {
                              if (response.data.status == 1) {
                                setUserDetails(response.data);
                                dispatch({
                                  type: TRIGGER_USER_DETAILS,
                                  userDetails: response.data,
                                });
                                setToken(response.data.token);
                              }
                            })
                            .catch((err) => {});
                        } else {
                          ToastMessage("Something went wrong!", "error");
                        }
                      })
                      .catch((err) => {
                        setLoading(false);
                        ToastMessage("Something went wrong!", "error");
                      });

                    setTimeout(() => {
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="review-application">
                        <div className="row">
                          <div className="col-md-8">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>First Name</label>

                                  <input
                                    type="text"
                                    placeholder="First Name"
                                    name={fieldNames.FIRSTNAME}
                                    className={clsx(
                                      "form-control ",
                                      {
                                        "is-invalid":
                                          touched[fieldNames.FIRSTNAME] &&
                                          errors[fieldNames.FIRSTNAME],
                                      },
                                      {
                                        "is-valid":
                                          touched[fieldNames.FIRSTNAME] &&
                                          !errors[fieldNames.FIRSTNAME],
                                      }
                                    )}
                                    onChange={handleChange}
                                    onBlur={() => {
                                      // setReviewPersonalData(values);
                                    }}
                                    value={values[fieldNames.FIRSTNAME]}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group ">
                                  <label>Last Name</label>
                                  <input
                                    type="text"
                                    placeholder="Last Name"
                                    name={fieldNames.LASTNAME}
                                    className={clsx(
                                      "form-control ",
                                      {
                                        "is-invalid":
                                          touched[fieldNames.LASTNAME] &&
                                          errors[fieldNames.LASTNAME],
                                      },
                                      {
                                        "is-valid":
                                          touched[fieldNames.LASTNAME] &&
                                          !errors[fieldNames.LASTNAME],
                                      }
                                    )}
                                    onChange={handleChange}
                                    onBlur={() => {
                                      // setReviewPersonalData(values);
                                    }}
                                    value={values[fieldNames.LASTNAME]}
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    Email Address{" "}
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip id="button-tooltip-2">
                                          This is the email address where all
                                          communication will sent to.
                                        </Tooltip>
                                      }
                                    >
                                      {({ ref, ...triggerHandler }) => (
                                        <span
                                          ref={ref}
                                          {...triggerHandler}
                                          className="ml-2 cursor-pointer"
                                        >
                                          <img
                                            ref={ref}
                                            {...triggerHandler}
                                            src={require("../../images/info-icon.png")}
                                            alt=""
                                          />
                                        </span>
                                      )}
                                    </OverlayTrigger>
                                    {/* <tooltip>
                                      <i
                                        className="fa fa-info-circle"
                                        data-tip="This is the email address where all communication will sent to."
                                      >
                                        <ReactTooltip
                                          className={"tooltippanel"}
                                        />
                                      </i>
                                    </tooltip> */}
                                  </label>
                                  <input
                                    type="email"
                                    placeholder="Email Address"
                                    name={fieldNames.EMAIL}
                                    className={clsx(
                                      "form-control ",
                                      {
                                        "is-invalid":
                                          touched[fieldNames.EMAIL] &&
                                          errors[fieldNames.EMAIL],
                                      },
                                      {
                                        "is-valid":
                                          touched[fieldNames.EMAIL] &&
                                          !errors[fieldNames.EMAIL],
                                      }
                                    )}
                                    onChange={handleChange}
                                    onBlur={() => {
                                      // setReviewPersonalData(values);
                                    }}
                                    value={values[fieldNames.EMAIL]}
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group business-entity">
                                  <label>Phone Number</label>
                                  <PhoneInput
                                    name={fieldNames.PHONE}
                                    country={"gb"}
                                    value={values[fieldNames.PHONE]}
                                    inputStyle={
                                      touched[fieldNames.PHONE] &&
                                      errors[fieldNames.PHONE] && {
                                        borderColor: "red",
                                      }
                                    }
                                    onChange={(phone) => {
                                      setFieldValue(fieldNames.PHONE, phone);
                                    }}
                                    onBlur={() => {
                                      // setReviewPersonalData(values);
                                    }}
                                    inputClass={"w-100"}
                                    placeholder="Enter Phone Number"
                                  />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group business-entity">
                                  <label>Address</label>
                                  <input
                                    type="text"
                                    placeholder="Address"
                                    name="address"
                                    className={clsx(
                                      "form-control ",
                                      {
                                        "is-invalid":
                                          touched.address && errors.address,
                                      },
                                      {
                                        "is-valid":
                                          touched.address && !errors.address,
                                      }
                                    )}
                                    onChange={handleChange}
                                    onBlur={() => {
                                      // setReviewPersonalData(values);
                                    }}
                                    value={values.address}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <input
                              type="file"
                              id="input-file"
                              name="uploadimage"
                              className=""
                              onChange={(e) => {
                                handleFileChange(e);
                                setFieldValue("uploadimage", e.target.files[0]);
                              }}
                              ref={hiddenFileInput}
                              accept="image/*"
                            />
                            <div className="upload-image">
                              <label
                                for="input-file"
                                style={{ pointerEvents: "none" }}
                              >
                                {file.preview ? (
                                  <img
                                    height="120px"
                                    width="120px"
                                    src={file.preview}
                                    alt=""
                                    className="upload-img profile-pic"
                                  />
                                ) : (
                                  <div className="initials-profile-pic">
                                    <div className="initials-profile-pic-text">
                                      {userDetails &&
                                        userDetails[
                                          "first_name"
                                        ][0].toUpperCase()}
                                      {userDetails &&
                                        userDetails[
                                          "last_name"
                                        ][0].toUpperCase()}
                                    </div>
                                  </div>
                                )}
                              </label>
                              <button
                                className="btn btn-primary upload-image"
                                onClick={handleClick}
                                type="button"
                              >
                                Upload Image
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary save-btn next-btn"
                          type="submit"
                          disabled={loading}
                        >
                          Save <i className="fa fa-file-image-o"></i>
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;

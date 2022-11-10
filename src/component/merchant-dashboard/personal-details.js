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
import { getUserDetails } from "../login/loginpage";
import { useEffect } from "react";
import { getDashboardData } from "../../request";

function PersonalDetails() {
  const storeData = {};
  const data = {};
  const [file, setFile] = useState();
  console.log(
    "🚀 ~ file: personal-details.js ~ line 17 ~ PersonalDetails ~ file",
    file
  );
  const hiddenFileInput = useRef(null);
  const [dasboardData, setDashboardData] = useState();
  console.log(
    "🚀 ~ file: personal-details.js ~ line 26 ~ PersonalDetails ~ dasboardData",
    dasboardData
  );
  const userDetails = getUserDetails();

  useEffect(() => {
    if (userDetails && userDetails.lead_id) {
      getDashboardData(userDetails.lead_id).then((resp) => {
        setDashboardData(resp.records[0]);
      });
    }

    return () => {};
  }, []);

  const initialValues = {
    [fieldNames.FIRSTNAME]: dasboardData
      ? dasboardData["lf_opener_name"].split(" ")[0]
      : "",
    [fieldNames.LASTNAME]: dasboardData
      ? dasboardData["lf_opener_name"].split(" ")[1]
      : "",
    [fieldNames.EMAIL]: dasboardData ? dasboardData["lf_business_email"] : "",
    [fieldNames.PHONE]: dasboardData ? dasboardData["lf_telephone"] : "",
    address: dasboardData ? dasboardData["address"] : "",
  };
  console.log(
    "🚀 ~ file: personal-details.js ~ line 39 ~ PersonalDetails ~ initialValues",
    initialValues
  );

  const validationSchema = Yup.object().shape({
    [fieldNames.FIRSTNAME]: Yup.string().required(),
    [fieldNames.LASTNAME]: Yup.string().required(),
    [fieldNames.EMAIL]: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Email is required"),
    [fieldNames.PHONE]: Yup.string().required("required"),
    address: Yup.string().required("required"),
  });

  function handleFileChange(event) {
    setFile({
      file: event.target.files[0],
      preview: URL.createObjectURL(event.target.files[0]),
    });
    console.log("file", file);
  }

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="dashboard-panel">
      <Header />
      <div className="dashboard-body bg-change-color">
        <div className="container-fluid  merchant-body">
          <SiderBarMenu />

          <div className="right-panel-main">
            <h3>
              <i className="fa fa-user" aria-hidden="true"></i> Personal Details
            </h3>
            <div className="dashboard-box position-relative card dashboard-card">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values, { setSubmitting }) => {
                  console.log(
                    "🚀 ~ file: personal-details.js ~ line 80 ~ PersonalDetails ~ values",
                    values
                  );
                  // setActiveStep(activeStep + 1);
                  // setDashboardStepNo(activeStep + 1);

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
                                  <tooltip>
                                    <i
                                      className="fa fa-info-circle"
                                      data-tip="This is the email address where all communication will sent to."
                                    >
                                      <ReactTooltip
                                        className={"tooltippanel"}
                                      />
                                    </i>
                                  </tooltip>
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
                          <div className="upload-image">
                            <input
                              type="file"
                              id="input-file"
                              name="upload image"
                              className=""
                              onChange={handleFileChange}
                              ref={hiddenFileInput}
                            />
                            <label for="input-file">
                              <img
                                height="120px"
                                width="120px"
                                src={
                                  file && file.preview
                                    ? file.preview
                                    : require("../../images/upload-img.png")
                                }
                                alt=""
                                className="upload-img"
                              />
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
  );
}

export default PersonalDetails;

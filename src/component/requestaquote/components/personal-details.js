import React from "react";
import clsx from "clsx";
import * as Yup from "yup";
import { fieldNames, getApplicationInfo } from "./application-information";
import { Formik } from "formik";
import { setStepNo } from "./request-leftpanel";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { createAccount } from "../../../request";
import { getBusinessInfo, getCompanyInfo } from "./business-information";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ToastMessage } from "../../ToastMessage";
import { directorFieldNames } from "../../Constants";

export const setVerificationToken = (token) => {
  localStorage.setItem("verificationToken", token);
};

export const getVerificationToken = () => {
  return localStorage.getItem("verificationToken");
};

export const removeData = () => {
  localStorage.removeItem("personalInfo");
  localStorage.removeItem("businessInfo");
  localStorage.removeItem("applicationInfo");
  localStorage.removeItem("applicationInfo");
  localStorage.removeItem("stepNumber");
  localStorage.removeItem("companyInfo");
};

export const generateDirectorListPayload = (data) => {
  if (data != null) {
    let data1 = data.map((item) => {
      let day = "";
      let month = "";
      let year = "";

      if (item["ShareHolderDOBFullFormat"]) {
        let splitDate = item["ShareHolderDOBFullFormat"].split("-");
        day = splitDate[2];
        month = splitDate[1];
        year = splitDate[0];
      }
      return {
        kindofShareHolder: "",
        HiddenShareHolderId: item[directorFieldNames.HIDDENSHAREHOLDERID] || "",
        natures_of_control: item[directorFieldNames.NATUREOFCONTROL] || "",
        fullName: item[directorFieldNames.FIRSTNAME],
        lastName: item[directorFieldNames.LASTNAME],
        DOB_day: day || "",
        DOB_month: month || "",
        DOB_year: year || "",
        ShareHolderDOBFullFormat: item["ShareHolderDOBFullFormat"],
        address_line_1: item["address_line_1"] || "",
        address_line_2: item["address_line_2"] || "",
        postal_code: item[directorFieldNames.POSTALCODE] || "",
        notified_on: "",
        phon_number: item[directorFieldNames.PHONENUMBER] || "",
        email: item[directorFieldNames.EMAIL],
        residentialStatus: item[directorFieldNames.RESIDENTIALSTATUS]
          ? item[directorFieldNames.RESIDENTIALSTATUS]["value"]
          : "",
        is_primary: item[directorFieldNames.ISPRIMARY] ? "1" : "0",
        house_number: item[directorFieldNames.HOUSE_NUMBER] || "",
        house_name: item[directorFieldNames.HOUSE_NAME] || "",
        county: item[directorFieldNames.COUNTY] || "",
        town: item[directorFieldNames.TOWN] || "",
        livingSince: item[directorFieldNames.LIVINGSINCE] || "",
        is_active: "1",
        street: item[directorFieldNames.STREET] || "",
        companyName: "undefined",
      };
    });
    return data1;
  }
};

function PersonalDetails({ setStep, showSelectedState }) {
  const storedData = JSON.parse(localStorage.getItem("personalInfo"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    type: "",
    text: "",
  });
  const initialValues = {
    [fieldNames.FIRSTNAME]: storedData ? storedData[fieldNames.FIRSTNAME] : "",
    [fieldNames.LASTNAME]: storedData ? storedData[fieldNames.LASTNAME] : "",
    [fieldNames.EMAIL]: storedData ? storedData[fieldNames.EMAIL] : "",
    [fieldNames.PHONE]: storedData ? storedData[fieldNames.PHONE] : "",
    [fieldNames.BUSINESSNAME]: storedData
      ? storedData[fieldNames.BUSINESSNAME]
      : "",
    [fieldNames.PASSWORD]: storedData ? storedData[fieldNames.PASSWORD] : "",
    [fieldNames.CONFIRMPASSWORD]: storedData
      ? storedData[fieldNames.CONFIRMPASSWORD]
      : "",
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const passwordRegex =
    /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;

  const validationSchema = Yup.object().shape({
    [fieldNames.FIRSTNAME]: Yup.string().required(),
    [fieldNames.LASTNAME]: Yup.string().required(),
    [fieldNames.EMAIL]: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Email is required"),
    [fieldNames.PHONE]: Yup.string().required("required"),
    [fieldNames.PASSWORD]: Yup.string()
      .required("required")
      .matches(passwordRegex, "Phone number is not valid"),
    // [fieldNames.PASSWORD]: Yup.string()
    //   .min(6, "Minimum 3 symbols")
    //   .max(8, "Maximum 50 symbols")
    //   .required("Password is required"),
    [fieldNames.CONFIRMPASSWORD]: Yup.string()
      .matches(passwordRegex, "Phone number is not valid")
      .required("New password is required")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  const setPersonalInfo = (info) => {
    localStorage.setItem("personalInfo", JSON.stringify(info));
  };

  const goBack = () => {
    setStep(2);
    showSelectedState(2);
    setStepNo(2);
  };

  return (
    <div className="right-panel">
      <h2>Personal Details</h2>
      <h5>Please enter the details below </h5>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          setPersonalInfo(values);
          const applicationInfo = getApplicationInfo();
          const businesssInfo = getBusinessInfo();
          const companyInfo = getCompanyInfo();

          let payload = { ...applicationInfo, ...businesssInfo, ...values };
          payload["businessSector"] = payload["businessSector"].value;
          payload["businessId"] = companyInfo["company_number"]
            ? companyInfo["company_number"]
            : "";
          payload["businessAddress"] =
            companyInfo["address"]["locality"] +
            "," +
            companyInfo["address"]["address_line_1"];
          payload["businessZipcode"] =
            companyInfo["address"]["postal_code"] || "";
          payload["businessName"] = companyInfo["title"];
          payload["businessEntity"] = payload["businessEntity"].value;
          payload["loanPurpose"] = payload["loanPurpose"].value;

          if (!payload["isPaymentPending"]) {
            payload["cardPaymentAmount"] = 0;
          }

          if (!payload["isPaymentProcessed"]) {
            payload["supplierDueAmount"] = 0;
          }

          createAccount(payload)
            .then((resp) => {
              if (resp.data.status == "error") {
                if (resp.data.message_text == "Email already Exist") {
                  setError({ type: "email", text: resp.data.message_text });
                  ToastMessage(resp.data.message_text, "error");
                } else if (
                  resp.data.message_text == "Error! This Lead already exists."
                ) {
                  setError({ type: "lead", text: resp.data.message_text });
                  ToastMessage(resp.data.message_text, "error");
                }
                setLoading(false);
              } else {
                setVerificationToken(resp.data.token);
                setStep(4);
                showSelectedState(4);
                setStepNo(4);
                setLoading(false);
                ToastMessage("Account created successfully", "success");
              }
            })
            .catch((err) => {
              console.log(
                "🚀 ~ file: personal-details.js ~ line 74 ~ createAccount ~ err",
                err
              );
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
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
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
                      setPersonalInfo(values);
                    }}
                    value={values[fieldNames.FIRSTNAME]}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
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
                      setPersonalInfo(values);
                    }}
                    value={values[fieldNames.LASTNAME]}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter Email Address"
                name={fieldNames.EMAIL}
                className={clsx(
                  "form-control ",
                  {
                    "is-invalid":
                      touched[fieldNames.EMAIL] && errors[fieldNames.EMAIL],
                  },
                  {
                    "is-valid":
                      touched[fieldNames.EMAIL] && !errors[fieldNames.EMAIL],
                  }
                )}
                onChange={handleChange}
                onBlur={() => {
                  setPersonalInfo(values);
                }}
                value={values[fieldNames.EMAIL]}
              />
            </div>
            <div className="form-group">
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
                  setPersonalInfo(values);
                }}
                inputClass={"w-100"}
                placeholder="Enter Phone Number"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                name={fieldNames.PASSWORD}
                className={clsx(
                  "form-control ",
                  {
                    "is-invalid":
                      touched[fieldNames.PASSWORD] &&
                      errors[fieldNames.PASSWORD],
                  },
                  {
                    "is-valid":
                      touched[fieldNames.PASSWORD] &&
                      !errors[fieldNames.PASSWORD],
                  }
                )}
                onChange={handleChange}
                onBlur={() => {
                  setPersonalInfo(values);
                }}
                value={values[fieldNames.PASSWORD]}
              />

              <>
                <p className="text-left mb-1 mt-1">Password should contain</p>
                <small className="text-left">
                  <ul className="pl-4">
                    <li>Minimum six characters</li>
                    <li>At least one upper case English letter</li>
                    <li>One lower case English letter</li>
                    <li>One number and one special character</li>
                  </ul>
                </small>
              </>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Enter Confirm Password"
                name={fieldNames.CONFIRMPASSWORD}
                className={clsx(
                  "form-control ",
                  {
                    "is-invalid":
                      touched[fieldNames.CONFIRMPASSWORD] &&
                      errors[fieldNames.CONFIRMPASSWORD],
                  },
                  {
                    "is-valid":
                      touched[fieldNames.CONFIRMPASSWORD] &&
                      !errors[fieldNames.CONFIRMPASSWORD],
                  }
                )}
                onChange={handleChange}
                onBlur={() => {
                  setPersonalInfo(values);
                }}
                value={values[fieldNames.CONFIRMPASSWORD]}
              />

              {touched[fieldNames.CONFIRMPASSWORD] &&
                errors[fieldNames.CONFIRMPASSWORD] &&
                values[fieldNames.CONFIRMPASSWORD] !==
                  values[fieldNames.PASSWORD] && (
                  <p className="text-danger">Password must match</p>
                )}
            </div>

            {error.type && error.text && (
              <>
                <Alert variant="danger">
                  {error.text}
                  {error.type == "lead" && (
                    <>
                      <br />
                      Click here to{" "}
                      <NavLink
                        to="/login"
                        onClick={() => {
                          removeData();
                        }}
                      >
                        Login
                      </NavLink>
                    </>
                  )}
                </Alert>
              </>
            )}
            <button
              type="button"
              className="btn btn-primary back-btn"
              onClick={() => goBack()}
            >
              <i className="fa fa-chevron-left"></i> Back{" "}
            </button>
            <button
              className="btn btn-primary next-btn"
              type="submit"
              disabled={loading}
            >
              Create an Account <i className="fa fa-chevron-right"></i>
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default PersonalDetails;

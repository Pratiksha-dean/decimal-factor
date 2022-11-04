import React from "react";
import clsx from "clsx";
import * as Yup from "yup";
import { fieldNames } from "./application-information";
import { Formik } from "formik";
import { setStepNo } from "./request-leftpanel";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function PersonalDetails({ setStep, showSelectedState }) {
  const storedData = JSON.parse(localStorage.getItem("personalInfo"));

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
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
      .min(6, "Minimum 3 symbols")
      .max(8, "Maximum 50 symbols")
      .required("Password is required"),
    [fieldNames.CONFIRMPASSWORD]: Yup.string()
      .min(6, "Minimum 3 symbols")
      .max(8, "Maximum 50 symbols")
      .required("New password is required")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  const setBusinessInfo = (info) => {
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
      <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setStep(4);
          showSelectedState(4);
          setStepNo(4);
          setBusinessInfo(values);
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
                    onBlur={handleBlur}
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
                    onBlur={handleBlur}
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
                onBlur={handleBlur}
                value={values[fieldNames.EMAIL]}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <PhoneInput
                name={fieldNames.PHONE}
                country={"in"}
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
                onBlur={handleBlur}
                value={values[fieldNames.PASSWORD]}
              />
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
                onBlur={handleBlur}
                value={values[fieldNames.CONFIRMPASSWORD]}
              />
            </div>
            <button
              className="btn btn-primary back-btn"
              onClick={() => goBack()}
            >
              <i className="fa fa-chevron-left"></i> Back{" "}
            </button>
            <button className="btn btn-primary next-btn" type="submit">
              Create an Account <i className="fa fa-chevron-right"></i>
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default PersonalDetails;

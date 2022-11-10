import React from "react";
import ReactTooltip from "react-tooltip";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { fieldNames } from "../../requestaquote/components/application-information";
import { getUserDetails } from "../../login/loginpage";
import { setDashboardStepNo } from "../dashboard";

export const setReviewPersonalData = (data) => {
  localStorage.setItem("reviewPersonalInfo", JSON.stringify(data));
};

export const getReviewPersonalData = () => {
  return JSON.parse(localStorage.getItem("reviewPersonalInfo"));
};

function ReviewPersonalDetails({ data, activeStep, setActiveStep }) {
  const userDetails = getUserDetails();
  const storeData = getReviewPersonalData();
  console.log(
    "🚀 ~ file: review-personal-details.js ~ line 23 ~ ReviewPersonalDetails ~ storeData",
    storeData
  );
  const initialValues = {
    [fieldNames.FIRSTNAME]: storeData
      ? storeData[fieldNames.FIRSTNAME]
      : data["lf_opener_name"].split(" ")[0],
    [fieldNames.LASTNAME]: storeData
      ? storeData[fieldNames.LASTNAME]
      : data["lf_opener_name"].split(" ")[1],
    [fieldNames.EMAIL]: storeData
      ? storeData[fieldNames.EMAIL]
      : data["lf_business_email"],
    [fieldNames.PHONE]: storeData
      ? storeData[fieldNames.PHONE]
      : data["lf_telephone"],
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
  });

  return (
    <div className="dashboard-box position-relative card dashboard-card">
      <div className="review-application">
        <h3>Review Personal Details</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setActiveStep(activeStep + 1);
            setDashboardStepNo(activeStep + 1);

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
                <div className="col-md-4">
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
                        setReviewPersonalData(values);
                      }}
                      value={values[fieldNames.FIRSTNAME]}
                    />
                  </div>
                </div>
                <div className="col-md-4">
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
                        setReviewPersonalData(values);
                      }}
                      value={values[fieldNames.LASTNAME]}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      Email Address{" "}
                      <tooltip>
                        <i
                          className="fa fa-info-circle"
                          data-tip="This is the email address where all communication will sent to."
                        >
                          <ReactTooltip className={"tooltippanel"} />
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
                        setReviewPersonalData(values);
                      }}
                      value={values[fieldNames.EMAIL]}
                    />
                  </div>
                </div>

                <div className="col-md-4">
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
                        setReviewPersonalData(values);
                      }}
                      inputClass={"w-100"}
                      placeholder="Enter Phone Number"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn"
                  onClick={() => {
                    setActiveStep(activeStep - 1);
                    setDashboardStepNo(activeStep - 1);
                  }}
                  type="button"
                  style={{ backgroundColor: "#E2E2E2" }}
                >
                  {" "}
                  <i className="bi bi-chevron-left"></i>Back
                </button>
                <button
                  className="btn btn-primary"
                  style={{ backgroundColor: "#006090" }}
                  type="submit"
                >
                  Next <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ReviewPersonalDetails;

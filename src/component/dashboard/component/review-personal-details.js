import React from "react";
import ReactTooltip from "react-tooltip";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { fieldNames } from "../../requestaquote/components/application-information";
import { getUserDetails } from "../../login/loginpage";

function ReviewPersonalDetails({ data }) {
  const userDetails = getUserDetails();
  const initialValues = {
    [fieldNames.FIRSTNAME]: userDetails ? userDetails["first_name"] : "",
    [fieldNames.LASTNAME]: userDetails ? userDetails["last_name"] : "",
    [fieldNames.EMAIL]: data ? data["lf_business_email"] : "",
    [fieldNames.PHONE]: data ? data["lf_telephone"] : "",
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
                        // setPersonalInfo(values);
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
                        // setPersonalInfo(values);
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
                        // setPersonalInfo(values);
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
                        // setPersonalInfo(values);
                      }}
                      inputClass={"w-100"}
                      placeholder="Enter Phone Number"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ReviewPersonalDetails;

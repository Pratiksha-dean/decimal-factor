import React from "react";
import { Link } from "react-router-link";
import "../../styles/master.css";
import { passwordRegex } from "../Constants";
import { fieldNames } from "../requestaquote/components/application-information";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik/dist";
import { getToken } from "../login/loginpage";
function InnerChangePassword() {
  const initialValues = {
    [fieldNames.PASSWORD]: "",
    [fieldNames.CONFIRMPASSWORD]: "",
    [fieldNames.CURRENTPASSWORD]: "",
  };

  const validationSchema = Yup.object().shape({
    [fieldNames.CURRENTPASSWORD]: Yup.string()
      .required("required")
      .matches(passwordRegex, "Password is not valid"),
    [fieldNames.PASSWORD]: Yup.string()
      .required("required")
      .matches(passwordRegex, "Password is not valid"),
    [fieldNames.CONFIRMPASSWORD]: Yup.string()
      .matches(passwordRegex, "Password is not valid")
      .required("New password is required")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const payload = {
        token: getToken(),
        password: values.password,
      };
      // changePassword(payload)
      //   .then((resp) => {
      //     console.log(
      //       "🚀 ~ file: change-password.js ~ line 41 ~ changePassword ~ resp",
      //       resp
      //     );
      //   })
      //   .catch((err) => {
      //     console.log(
      //       "🚀 ~ file: change-password.js ~ line 40 ~ changePassword ~ err",
      //       err
      //     );
      //   });
    },
  });
  return (
    <div className="App login-page">
      <div className="container-fluid">
        <div className="row">
          <div className="login-screen">
            <img
              src={require("../../images/login-logo.png")}
              alt=""
              className="login-logo"
            />
            <div className="login-box">
              <h3>Change Password</h3>
              {/* <h5>
                No worries, we got your back! Enter your e-mail address below to
                reset your password.
              </h5> */}
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    placeholder="Current Password"
                    name={fieldNames.PASSWORD}
                    {...formik.getFieldProps(fieldNames.CURRENTPASSWORD)}
                    className={clsx(
                      "form-control form-control-lg form-control-solid",
                      {
                        "is-invalid":
                          formik.touched.currentpassword &&
                          formik.errors.currentpassword,
                      },
                      {
                        "is-valid":
                          formik.touched.currentpassword &&
                          !formik.errors.currentpassword,
                      }
                    )}
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="New Password"
                    {...formik.getFieldProps(fieldNames.PASSWORD)}
                    className={clsx(
                      "form-control form-control-lg form-control-solid",
                      {
                        "is-invalid":
                          formik.touched.password && formik.errors.password,
                      },
                      {
                        "is-valid":
                          formik.touched.password && !formik.errors.password,
                      }
                    )}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...formik.getFieldProps(fieldNames.CONFIRMPASSWORD)}
                    className={clsx(
                      "form-control form-control-lg form-control-solid",
                      {
                        "is-invalid":
                          formik.touched[fieldNames.CONFIRMPASSWORD] &&
                          formik.errors[fieldNames.CONFIRMPASSWORD],
                      },
                      {
                        "is-valid":
                          formik.touched[fieldNames.CONFIRMPASSWORD] &&
                          !formik.errors[fieldNames.CONFIRMPASSWORD],
                      }
                    )}
                  />

                  {formik.touched[fieldNames.CONFIRMPASSWORD] &&
                    formik.errors[fieldNames.CONFIRMPASSWORD] &&
                    formik.values[fieldNames.CONFIRMPASSWORD] !==
                      formik.values[fieldNames.PASSWORD] && (
                      <p className="text-danger">Password must match</p>
                    )}
                </div>

                <button className="btn btn-primary login-btn" type="submit">
                  Submit <i className="fa fa-chevron-right"></i>
                </button>
                <div className="divider"></div>
              </form>
            </div>
            <div className="copy-right">
              <p>© Copyright 2022 | decimalFactor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InnerChangePassword;

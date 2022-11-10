import React from "react";
import { Link } from "react-router-link";
import "../../styles/master.css";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { fieldNames } from "../requestaquote/components/application-information";
import { useFormik } from "formik/dist";
import { useNavigate } from "react-router-dom/dist";
import { changePassword } from "../../request";
import { getToken } from "../login/loginpage";
import { passwordRegex } from "../Constants";

function ChangePassword() {
  const navigate = useNavigate();

  const initialValues = {
    [fieldNames.PASSWORD]: "",
    [fieldNames.CONFIRMPASSWORD]: "",
  };

  const validationSchema = Yup.object().shape({
    [fieldNames.PASSWORD]: Yup.string()
      .required("required")
      .matches(passwordRegex, "Phone number is not valid"),
    [fieldNames.CONFIRMPASSWORD]: Yup.string()
      .matches(passwordRegex, "Phone number is not valid")
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
      changePassword(payload)
        .then((resp) => {
          console.log(
            "🚀 ~ file: change-password.js ~ line 41 ~ changePassword ~ resp",
            resp
          );
        })
        .catch((err) => {
          console.log(
            "🚀 ~ file: change-password.js ~ line 40 ~ changePassword ~ err",
            err
          );
        });
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
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="New Password"
                    name={fieldNames.PASSWORD}
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
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name={fieldNames.CONFIRMPASSWORD}
                    placeholder="Confirm New Password"
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

export default ChangePassword;

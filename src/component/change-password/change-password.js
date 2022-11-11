import React, { useState } from "react";
import { Link } from "react-router-link";
import "../../styles/master.css";
import clsx from "clsx";
import * as Yup from "yup";
import { fieldNames } from "../requestaquote/components/application-information";
import { useFormik } from "formik/dist";
import { useNavigate, useParams } from "react-router-dom/dist";
import { logout, resetPassword } from "../../request";
import { passwordRegex } from "../Constants";
import { Alert } from "react-bootstrap";
import { ToastMessage } from "../ToastMessage";

function ChangePassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [message, setMessage] = useState();

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
        token: token,
        password: values.password,
      };

      resetPassword(payload)
        .then((resp) => {
          if (resp.data.isSuccess == 1) {
            setMessage({
              type: "success",
              text: "Password changed successfully",
            });
            formik.resetForm();
            ToastMessage("Password changed successfully!", "success");
          } else {
            setMessage({
              type: "error",
              text: "Invalid current password",
            });

            ToastMessage("Invalid current password!", "error");
          }
        })
        .catch((err) => {
          setMessage({
            type: "error",
            text: "Something went wrong!",
          });
          ToastMessage("Something went wrong!", "error");
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
                <div className="my-3">
                  {message && message.type && (
                    <Alert
                      variant={message.type == "success" ? "success" : "danger"}
                    >
                      <h5 className="mb-0">{message.text}</h5>
                    </Alert>
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

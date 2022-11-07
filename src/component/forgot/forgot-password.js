import React from "react";
import "../../styles/master.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

function ForgotPassword() {
  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Email is required"),
  });

  const initialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {},
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
              <h3>Forgot Password?</h3>
              <h5>
                No worries, we got your back! Enter your e-mail address below to
                reset your password.
              </h5>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="Enter email address"
                    placeholder="Enter email address"
                    {...formik.getFieldProps("email")}
                    className={clsx(
                      "form-control form-control-lg form-control-solid",
                      {
                        "is-invalid":
                          formik.touched.email && formik.errors.email,
                      },
                      {
                        "is-valid":
                          formik.touched.email && !formik.errors.email,
                      }
                    )}
                  />
                </div>

                <button className="btn btn-primary login-btn">
                  Submit <i className="fa fa-chevron-right"></i>
                </button>
                <div className="divider"></div>
                <div className="form-group loginnow-btn">
                  <p>
                    Back to Login? <NavLink to="/login">Click Here</NavLink>
                  </p>
                </div>
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

export default ForgotPassword;

import React from "react";
import "../../styles/master.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../request";

function Login() {
  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      // setLoading(true)/;
      try {
        const { data: auth } = await login(values.email, values.password);
        navigate("/authentication");
      } catch (error) {}
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
              <h3>Login to Your Account</h3>
              <h5>Welcome back! Please enter your details below...</h5>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="text"
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
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="Enter Password"
                    placeholder="Enter Password"
                    {...formik.getFieldProps("password")}
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
                  <div className="remember-div">
                    <input type="checkbox" name="remember me" />{" "}
                    <label>Remember Me</label>
                  </div>
                  <div className="forgot-div">
                    <NavLink to="/forgot-password">Forgot Password?</NavLink>
                  </div>
                </div>
                <button className="btn btn-primary login-btn">
                  Login Now <i className="fa fa-chevron-right"></i>
                </button>
                <div className="divider"></div>
                <div className="form-group loginnow-btn">
                  <p>
                    Don’t have an Account?{" "}
                    <NavLink href="#">Create Account</NavLink>
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

export default Login;

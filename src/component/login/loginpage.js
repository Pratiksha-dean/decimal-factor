import React from "react";
import "../../styles/master.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserDetailsApi, login, updateLoginTimes } from "../../request";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { isAuthenticated } from "../authentication/authentication";
import { ToastContainer } from "react-toastify";
import { ToastMessage } from "../ToastMessage";
import { useDispatch } from "react-redux";
import { TRIGGER_USER_DETAILS } from "../../redux/actions/actionTypes";

const setEmailPassword = (data) => {
  localStorage.setItem("creds", data);
};

export const setUserDetails = (data) => {
  localStorage.setItem("userDetails", JSON.stringify(data));
};

export const getUserDetails = () => {
  return JSON.parse(localStorage.getItem("userDetails"));
};

export const setToken = (data) => {
  localStorage.setItem("token", data);
};

export const getToken = (data) => {
  return localStorage.getItem("token");
};
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const savedCredentials = JSON.parse(localStorage.getItem("creds"));
  const [rememberMe, setRememberMe] = useState(savedCredentials ? true : false);
  const [loading, setLoading] = useState(false);

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
    email: savedCredentials ? savedCredentials.email : "",
    password: savedCredentials ? savedCredentials.password : "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      login(values.email, values.password)
        .then((resp) => {
          if (resp.data.status == "error") {
            setError(resp.data.message_text);
            setLoading(false);
            ToastMessage("Something went wrong!", "error");
          } else {
            if (resp.data.data.status == 1) {
              if (resp.data.is_lead_active == 1) {
                ToastMessage(
                  "Login successful! Verify code to proceed further.",
                  "success"
                );
                let obj = {
                  email: resp.data.data.email,
                  lead_id: resp.data.data.lead_id,
                };

                updateLoginTimes(obj).then((res) => {});

                // navigate("/authentication");
                navigate("/dashboard");

                setUserDetails(resp.data.data);
                dispatch({
                  type: TRIGGER_USER_DETAILS,
                  userDetails: resp.data.data,
                });
                setToken(resp.data.data.token);
                isAuthenticated(false);
                setLoading(false);
              } else {
                setLoading(false);
                ToastMessage("This account does not exists!", "error");
              }
            } else {
              setError("Please verify your email to login");
              setLoading(false);
              ToastMessage("Please verify your email to login!", "error");
            }
          }
        })
        .catch((err) => {
          setError("Something went wrong!");
          setLoading(false);
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

                {error && <Alert variant="danger">{error}</Alert>}

                <div className="form-group">
                  <div className="remember-div">
                    <input
                      type="checkbox"
                      name="remember me"
                      checked={rememberMe}
                      onChange={(e) => {
                        setRememberMe(e.target.checked);
                        if (e.target.checked) {
                          setEmailPassword(JSON.stringify(formik.values));
                        } else {
                          localStorage.removeItem("creds");
                        }
                      }}
                    />{" "}
                    <label>Remember Me</label>
                  </div>
                  <div className="forgot-div">
                    <NavLink to="/forgot-password">Forgot Password?</NavLink>
                  </div>
                </div>
                <button
                  className="btn btn-primary login-btn"
                  type="submit"
                  disabled={loading}
                >
                  Login Now <i className="fa fa-chevron-right"></i>
                </button>
                <div className="divider"></div>
                <div className="form-group loginnow-btn">
                  <p>
                    Don???t have an Account?{" "}
                    <NavLink to="/request-a-quote">Create Account</NavLink>
                  </p>
                </div>
              </form>
            </div>
            <div className="copy-right">
              <p>?? Copyright 2022 | decimalFactor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

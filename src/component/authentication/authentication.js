import React, { useEffect, useState } from "react";
import "../../styles/master.css";
import QRCode from "qrcode";
import CryptoJS from "crypto-js";
import speakeasy from "speakeasy";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { getToken, getUserDetails } from "../login/loginpage";
import { ToastMessage } from "../ToastMessage";

export const isAuthenticated = (value) => {
  localStorage.setItem("isAuthenticated", value);
};

function Authentication() {
  const [image, setImage] = useState("");
  const [secret, setSecret] = useState("");
  const [validCode, setValidCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(true);
  const naviagte = useNavigate();
  const userDetails = getUserDetails();
  console.log(
    "🚀 ~ file: authentication.js ~ line 23 ~ Authentication ~ userDetails",
    userDetails
  );

  const authenticationSchema = Yup.object().shape({
    code: Yup.string().min(6, "Too Short!").max(6, "Too Long!").required(),
  });

  const initialValues = {
    code: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: authenticationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const { base32, hex } = secret;
      const isVerified = speakeasy.totp.verify({
        secret: hex,
        encoding: "hex",
        token: values.code,
        window: 1,
      });
      if (isVerified) {
        console.log(
          "🚀 ~ file: authentication.js ~ line 43 ~ onSubmit: ~ isVerified",
          isVerified
        );
        if (userDetails["navigation_type"] == "left") {
          naviagte("/merchant-health");
          ToastMessage("Authentication successful!", "success");
        } else {
          naviagte("/dashboard");
          ToastMessage("Authentication successful!", "success");
        }
        isAuthenticated(isVerified);
      }
      setIsCodeValid(isVerified);
    },
  });

  useEffect(() => {
    const secret = {
      ascii: "?:SD%oDD<E!^q^1N):??&QkeqRkhkpt&",
      base32: "H45FGRBFN5CEIPCFEFPHCXRRJYUTUPZ7EZIWWZLRKJVWQ23QOQTA",
      hex: "3f3a5344256f44443c45215e715e314e293a3f3f26516b6571526b686b707426",
      otpauth_url:
        "otpauth://totp/decimalfactor.com?secret=H45FGRBFN5CEIPCFEFPHCXRRJYUTUPZ7EZIWWZLRKJVWQ23QOQTA",
    };

    const backupCodes = [];
    const hashedBackupCodes = [];

    for (let i = 0; i < 10; i++) {
      const randomCode = (Math.random() * 10000000000).toFixed();
      const encrypted = CryptoJS.AES.encrypt(
        randomCode,
        secret.base32
      ).toString();
      backupCodes.push(randomCode);
      hashedBackupCodes.push(encrypted);
    }

    QRCode.toDataURL(secret.otpauth_url, (err, image_data) => {
      setImage(image_data);
      setSecret(secret);
    });
  }, []);

  const getCode = () => {
    const { base32, hex } = this.state.secret;
    const code = speakeasy.totp({
      secret: hex,
      encoding: "hex",
      algorithm: "sha1",
    });

    setValidCode(code);
  };

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
              <h3>Set up 2-Step Verification for your account</h3>
              <div>
                <p className="mb-0">
                  <span style={{ fontWeight: "500" }}>Step 1: </span>Please
                  Download and Install “
                  <a
                    target="_blank"
                    href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_GB&gl=US&pli=1"
                  >
                    Google Authenticator
                  </a>
                  ” app on your mobile phone.
                </p>
                <p>
                  <span style={{ fontWeight: "500" }}>Step 2:</span> After
                  installation, please scan the below QR code to configure your
                  device.
                </p>
              </div>
              {/* <h5>
                Please Download and install Google authenticate app on your
                phone, and scan followin QR code to configure your device.
              </h5> */}
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <img src={`${image}`} className="qr-code-img" />
                </div>
                <div className="form-group">
                  <label>
                    Please enter the Authentication Code found on your Google
                    Authenticator app.
                  </label>
                  <input
                    type="text"
                    name="Enter Authentication Code"
                    placeholder="6 Digit Code"
                    {...formik.getFieldProps("code")}
                    onChange={(e) => {
                      formik.setFieldValue("code", e.target.value);
                      setIsCodeValid(true);
                    }}
                    className={clsx(
                      "form-control form-control-lg form-control-solid",
                      {
                        "is-invalid": formik.touched.code && formik.errors.code,
                      },
                      {
                        "is-valid": formik.touched.code && !formik.errors.code,
                      }
                    )}
                    value={formik.values.code}
                  />
                  {formik.touched.code && formik.errors.code && (
                    <p className="text-danger">Please enter 6 digit code</p>
                  )}
                  {!isCodeValid && formik.values.code.length == 6 && (
                    <p className="text-danger">Please enter valid code</p>
                  )}
                </div>

                <button className="btn btn-primary login-btn" type="submit">
                  Validate <i className="fa fa-chevron-right"></i>
                </button>
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

export default Authentication;

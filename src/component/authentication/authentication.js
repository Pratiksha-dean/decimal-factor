import React, { useEffect, useState } from "react";
import "../../styles/master.css";
import QRCode from "qrcode";
import CryptoJS from "crypto-js";
import speakeasy from "speakeasy";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { useNavigate } from "react-router";

function Authentication() {
  const [image, setImage] = useState("");
  const [secret, setSecret] = useState("");
  const [validCode, setValidCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(null);
  const naviagte = useNavigate();

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

      setIsCodeValid(isVerified);
      if (isCodeValid) {
        naviagte("dashboard");
      }
    },
  });

  useEffect(() => {
    const secret = {
      ascii: "?:SD%oDD<E!^q^1N):??&QkeqRkhkpt&",
      base32: "H45FGRBFN5CEIPCFEFPHCXRRJYUTUPZ7EZIWWZLRKJVWQ23QOQTA",
      hex: "3f3a5344256f44443c45215e715e314e293a3f3f26516b6571526b686b707426",
      otpauth_url:
        "otpauth://totp/Adidas%Adidas?secret=H45FGRBFN5CEIPCFEFPHCXRRJYUTUPZ7EZIWWZLRKJVWQ23QOQTA",
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
              <h3>Application Authantication</h3>
              <h5>
                Please Download and isntall Google authenticate app on your
                phone, and scan followin QR code to configure your device.
              </h5>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <img src={`${image}`} className="qr-code-img" />
                </div>
                <div className="form-group">
                  <label>Enter Authentication Code</label>
                  <input
                    type="text"
                    name="Enter Authentication Code"
                    placeholder="6 Digit Code"
                    {...formik.getFieldProps("code")}
                    className={clsx(
                      "form-control form-control-lg form-control-solid",
                      {
                        "is-invalid": formik.touched.code && formik.errors.code,
                      },
                      {
                        "is-valid": formik.touched.code && !formik.errors.code,
                      }
                    )}
                  />
                  {formik.touched.code && formik.errors.code && (
                    <p className="text-danger">Please enter 6 digit code</p>
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

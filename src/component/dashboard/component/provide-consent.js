import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { getReviewAppData, setDashboardStepNo } from "../dashboard";
import {
  getDirectorData,
  getReviewBusinessData,
} from "./review-business-information";
import { getReviewPersonalData } from "./review-personal-details";
import { updateUpdateCustomerInfo } from "../../../request";
import { getUserDetails } from "../../login/loginpage";
import { useNavigate } from "react-router";
import { ToastMessage } from "../../ToastMessage";
import { generateDirectorListPayload } from "../../requestaquote/components/personal-details";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import { generateDirectorListPayload } from "../../requestaquote/components/personal-details";

function ProvideConsent({ setActiveStep, activeStep }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    softCreditCheck: Yup.boolean().required(),
    finalInformation: Yup.boolean().required(),
  });

  const initialValues = {
    softCreditCheck: false,
    finalInformation: false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const applicationInfo = getReviewAppData();
      console.log(
        "🚀 ~ file: provide-consent.js ~ line 35 ~ onSubmit: ~ applicationInfo",
        applicationInfo
      );
      const businessData = getReviewBusinessData();
      console.log(
        "🚀 ~ file: provide-consent.js ~ line 37 ~ onSubmit: ~ businessData",
        businessData
      );
      const personalData = getReviewPersonalData();
      console.log(
        "🚀 ~ file: provide-consent.js ~ line 39 ~ onSubmit: ~ personalData",
        personalData
      );
      const userDetails = getUserDetails();
      setLoading(true);

      const payload = {
        ...applicationInfo,
        ...personalData,
        ...businessData,
        ...values,
      };
      console.log(
        "🚀 ~ file: provide-consent.js ~ line 38 ~ onSubmit: ~ payload",
        payload
      );

      payload["businessEntity"] = payload["businessEntity"].value;
      payload["businessSector"] = payload["businessSector"].value;
      payload["loanPurpose"] = payload["loanPurpose"].value;
      let directorData = getDirectorData();
      console.log(
        "🚀 ~ file: provide-consent.js ~ line 68 ~ onSubmit: ~ directorData",
        directorData,
        directorData != undefined
      );
      if (directorData !== []) {
        payload["ShareHolderArr"] = generateDirectorListPayload(directorData);
      } else {
        payload["ShareHolderArr"] = [];
      }

      delete payload["directorInfo"];
      payload["navigationType"] = "left";
      console.log(
        "🚀 ~ file: provide-consent.js ~ line 36 ~ onSubmit: ~ payload",
        payload
      );

      // return;

      updateUpdateCustomerInfo(payload, userDetails["lead_id"])
        .then((resp) => {
          setLoading(false);
          if (resp.isSuccess == 1) {
            navigate("/merchant-health");
            localStorage.removeItem("reviewPersonalInfo");
            localStorage.removeItem("reviewBusinessInfo");
            localStorage.removeItem("reviewAppInfo");
            ToastMessage("Data saved successfully!", "success");
          }

          console.log(
            "🚀 ~ file: provide-consent.js ~ line 59 ~ updateUpdateCustomerInfo ~ resp",
            resp
          );
        })
        .catch((err) => {
          setLoading(false);

          console.log(
            "🚀 ~ file: provide-consent.js ~ line 43 ~ updateUpdateCustomerInfo ~ err",
            err
          );
        });
      console.log(
        "🚀 ~ file: provide-consent.js ~ line 29 ~ onSubmit: ~ payload",
        payload
      );
      console.log(
        "🚀 ~ file: provide-consent.js ~ line 25 ~ onSubmit: ~ applicationInfo",
        applicationInfo,
        businessData,
        personalData
      );

      console.log(
        "🚀 ~ file: provide-consent.js ~ line 21 ~ ProvideConsent ~ values",
        values
      );
    },
  });

  return (
    <div className="dashboard-box position-relative card dashboard-card">
      <form onSubmit={formik.handleSubmit}>
        <div className="review-application">
          <h3>Provide Consent</h3>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group consent-panel">
                <input
                  type="checkbox"
                  name="softCreditCheck"
                  {...formik.getFieldProps("softCreditCheck")}
                  className={clsx(
                    "upload-checkbox",
                    {
                      "is-invalid":
                        formik.touched.softCreditCheck &&
                        formik.errors.softCreditCheck,
                    },
                    {
                      "is-valid":
                        formik.touched.softCreditCheck &&
                        !formik.errors.softCreditCheck,
                    }
                  )}
                  checked={formik.values.softCreditCheck}
                />
                <label>
                  I consent to run a soft credit check
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        A soft credit check will not affect your personal or
                        business credit score.
                      </Tooltip>
                    }
                  >
                    {({ ref, ...triggerHandler }) => (
                      <span
                        ref={ref}
                        {...triggerHandler}
                        className="ml-2 cursor-pointer"
                      >
                        <img
                          ref={ref}
                          {...triggerHandler}
                          src={require("../../../images/info-icon.png")}
                          alt=""
                        />
                      </span>
                    )}
                  </OverlayTrigger>
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group consent-panel">
                <input
                  type="checkbox"
                  name="finalInformation"
                  {...formik.getFieldProps("finalInformation")}
                  className={clsx(
                    "upload-checkbox",
                    {
                      "is-invalid":
                        formik.touched.finalInformation &&
                        formik.errors.finalInformation,
                    },
                    {
                      "is-valid":
                        formik.touched.finalInformation &&
                        !formik.errors.finalInformation,
                    }
                  )}
                  checked={formik.values.finalInformation}
                />
                <label>
                  I consent to provide financial information to lenders
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        Only information provided in the application will be
                        shared with lenders.
                      </Tooltip>
                    }
                  >
                    {/* <tooltip> */}
                    {({ ref, ...triggerHandler }) => (
                      <span
                        ref={ref}
                        {...triggerHandler}
                        className="ml-2 cursor-pointer"
                      >
                        <img
                          ref={ref}
                          {...triggerHandler}
                          src={require("../../../images/info-icon.png")}
                          alt=""
                        />
                      </span>
                    )}

                    {/* </tooltip> */}
                  </OverlayTrigger>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-2">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              setActiveStep(activeStep - 1);
              setDashboardStepNo(activeStep - 1);
            }}
          >
            {" "}
            <i className="bi bi-chevron-left"></i>Back
          </button>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#006090" }}
            type="submit"
            disabled={
              !formik.values.finalInformation ||
              !formik.values.softCreditCheck ||
              loading
            }
            // onClick={() => setActiveStep(activeStep + 1)}
          >
            Save
            <img
              src={require("../../../images/save_icon.png")}
              className="ml-2"
              alt=""
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProvideConsent;

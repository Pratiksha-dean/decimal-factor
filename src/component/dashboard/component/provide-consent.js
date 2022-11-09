import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";

function ProvideConsent() {
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
                <label>Consent to run a soft credit check</label>
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
                  Consent to provide financial information to lenders
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#006090" }}
            type="submit"
            disabled={
              !formik.values.finalInformation || !formik.values.softCreditCheck
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

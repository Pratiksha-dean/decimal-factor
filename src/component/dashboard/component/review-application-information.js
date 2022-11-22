import { Formik } from "formik";
import React from "react";
import clsx from "clsx";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import {
  businessEntityList,
  fieldNames,
  loadOptions,
  loadPurposeList,
  validationSchema,
} from "../../requestaquote/components/application-information";
import { SEARCH_COMPANY_URL } from "../../../request";
import axios from "axios";
import { useEffect } from "react";
import {
  getReviewAppData,
  setDashboardStepNo,
  setReviewAppData,
} from "../dashboard";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { useDispatch } from "react-redux/es";
import { TRIGGER_REVIEW_APPLICATION_DETAILS } from "../../../redux/actions/actionTypes";

function ReviewApplicationInformation({ data, setActiveStep, activeStep }) {
  const storedData = getReviewAppData();
  const dispatch = useDispatch();
  const { reviewApplicationDetails } = useAppSelector(
    (state) => state.reviewApplicationDetailsReducer
  );

  console.log(
    "🚀 ~ file: review-application-information.js ~ line 27 ~ ReviewApplicationInformation ~ reviewApplicationDetails",
    reviewApplicationDetails
  );

  const initialValues = {
    [fieldNames.AMOUNT]: storedData
      ? storedData["amount"]
      : data["lf_amount_required"],
    [fieldNames.REQUIREDFUND]: storedData
      ? storedData["requiredFund"]
      : data["lm_Funds"],
    [fieldNames.LOANPURPOSE]: storedData
      ? storedData["loanPurpose"]
      : loadPurposeList[
          loadPurposeList.findIndex(
            (item) => data.ApptxtLoanPurpose == item.value
          )
        ],
    [fieldNames.BUSINESSENTITY]: storedData
      ? storedData["businessEntity"]
      : businessEntityList[
          businessEntityList.findIndex(
            (item) => data["lf_business_activity"] == item.value
          )
        ],
    [fieldNames.BUSINESSNAME]: storedData
      ? storedData["businessName"]
      : data["lf_business_name"],
  };

  useEffect(() => {
    if (!storedData) {
      setReviewAppData(initialValues);
    }
  }, []);

  const storeReviewApplicationData = (details) => {
    console.log(
      "🚀 ~ file: review-application-information.js ~ line 71 ~ storeReviewApplicationData ~ details",
      details
    );

  };

  return (
    <div className="dashboard-box position-relative card dashboard-card">
      <div className="review-application">
        <h3>Review Application information</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setActiveStep(activeStep + 1);
            setDashboardStepNo(activeStep + 1);

            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            isValid,

            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Amount Required</label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-pound-sign"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="90,000"
                        className={clsx(
                          "form-control ",
                          {
                            "is-invalid":
                              touched[fieldNames.AMOUNT] &&
                              errors[fieldNames.AMOUNT],
                          },
                          {
                            "is-valid":
                              touched[fieldNames.AMOUNT] &&
                              !errors[fieldNames.AMOUNT],
                          }
                        )}
                        name={fieldNames.AMOUNT}
                        onChange={handleChange}
                        onBlur={(e) => {
                          setReviewAppData(values);
                          storeReviewApplicationData(values);
                        }}
                        value={values[fieldNames.AMOUNT]}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Purpose of Loan</label>
                    <Select
                      closeMenuOnSelect={true}
                      onChange={(selectedOption) => {
                        setFieldValue(fieldNames.LOANPURPOSE, selectedOption);
                      }}
                      onBlur={(selectedOption) => {
                        setReviewAppData(values);
                        storeReviewApplicationData(values);
                      }}
                      options={loadPurposeList}
                      name={fieldNames.LOANPURPOSE}
                      placeholder="Enter purpose of loan"
                      styles={{
                        control: (styles, state) => {
                          const borderColor =
                            !state.hasValue &&
                            touched[fieldNames.LOANPURPOSE] &&
                            errors[fieldNames.LOANPURPOSE]
                              ? "red"
                              : "#ced4da";

                          return { ...styles, borderColor };
                        },
                      }}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      value={values[fieldNames.LOANPURPOSE]}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Term of Funds Required (Months)</label>
                    <input
                      type="text"
                      placeholder="12"
                      name={fieldNames.REQUIREDFUND}
                      onChange={handleChange}
                      onBlur={(e) => {
                        setReviewAppData(values);
                        storeReviewApplicationData(values);
                      }}
                      value={values[fieldNames.REQUIREDFUND]}
                      className={clsx(
                        "form-control ",
                        {
                          "is-invalid":
                            touched[fieldNames.REQUIREDFUND] &&
                            errors[fieldNames.REQUIREDFUND],
                        },
                        {
                          "is-valid":
                            touched[fieldNames.REQUIREDFUND] &&
                            !errors[fieldNames.REQUIREDFUND],
                        }
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group business-entity">
                    <label>Business Entity</label>
                    <Select
                      classNamePrefix={clsx(
                        "",
                        {
                          "is-invalid":
                            touched[fieldNames.BUSINESSENTITY] &&
                            errors[fieldNames.BUSINESSENTITY],
                        },
                        {
                          "is-valid":
                            touched[fieldNames.BUSINESSENTITY] &&
                            !errors[fieldNames.BUSINESSENTITY],
                        }
                      )}
                      closeMenuOnSelect={true}
                      onChange={(selectedOption) => {
                        setFieldValue(
                          fieldNames.BUSINESSENTITY,
                          selectedOption
                        );
                      }}
                      onBlur={(selectedOption) => {
                        setReviewAppData(values);
                        storeReviewApplicationData(values);
                      }}
                      options={businessEntityList}
                      name={fieldNames.BUSINESSENTITY}
                      placeholder="Select Business Entity"
                      styles={{
                        control: (styles, state) => {
                          const borderColor =
                            !state.hasValue &&
                            touched[fieldNames.BUSINESSENTITY] &&
                            errors[fieldNames.BUSINESSENTITY]
                              ? "red"
                              : "#ced4da";

                          return { ...styles, borderColor };
                        },
                      }}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      value={values[fieldNames.BUSINESSENTITY]}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group business-entity">
                    <label>Business Name</label>
                    <AsyncSelect
                      closeMenuOnSelect={true}
                      value={{ label: values[fieldNames.BUSINESSNAME] }}
                      name={fieldNames.BUSINESSNAME}
                      loadOptions={loadOptions}
                      onChange={(selectedOption) => {
                        setFieldValue(
                          fieldNames.BUSINESSNAME,
                          selectedOption.value
                        );
                        // setBusinessInfo(selectedOption);
                        setReviewAppData(values);
                        storeReviewApplicationData(values);
                      }}
                      components={{
                        IndicatorSeparator: () => null,
                        DropdownIndicator: () => null,
                      }}
                      // onInputChange={handleInputChange}
                      onBlur={(selectedOption) => {
                        setReviewAppData(values);
                        storeReviewApplicationData(values);
                      }}
                      placeholder="Select Business Name"
                      styles={{
                        control: (styles, state) => {
                          const borderColor =
                            !state.hasValue &&
                            touched[fieldNames.BUSINESSNAME] &&
                            errors[fieldNames.BUSINESSNAME]
                              ? "red"
                              : "#ced4da";

                          return { ...styles, borderColor };
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                {/* <button className="btn btn-secondary">
                  {" "}
                  <i className="bi bi-chevron-left"></i>Back
                </button> */}
                <button
                  className="btn btn-primary"
                  style={{ backgroundColor: "#006090" }}
                  type="submit"
                >
                  Next <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ReviewApplicationInformation;

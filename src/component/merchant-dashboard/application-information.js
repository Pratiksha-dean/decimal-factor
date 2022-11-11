import { Formik } from "formik";
import React from "react";
import clsx from "clsx";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import Header from "../header/header";
import SiderBarMenu from "./component/sidebar";
import {
  businessEntityList,
  fieldNames,
  loadOptions,
  loadPurposeList,
  validationSchema,
} from "../requestaquote/components/application-information";
import { useState } from "react";
import { getUserDetails } from "../login/loginpage";
import { getDashboardData } from "../../request";
import { useEffect } from "react";

function ApplicationInformation() {
  const [dasboardData, setDashboardData] = useState();
  const userDetails = getUserDetails();

  console.log(initialValues);

  useEffect(() => {
    if (userDetails && userDetails.lead_id) {
      getDashboardData(userDetails.lead_id).then((resp) => {
        setDashboardData(resp.records[0]);
      });
    }

    return () => {};
  }, []);

  const initialValues = {
    [fieldNames.AMOUNT]: dasboardData ? dasboardData["lf_amount_required"] : "",
    [fieldNames.REQUIREDFUND]: dasboardData ? dasboardData["lm_Funds"] : "",
    [fieldNames.LOANPURPOSE]: dasboardData
      ? loadPurposeList[
          loadPurposeList.findIndex(
            (item) => dasboardData["ApptxtLoanPurpose"] == item.value
          )
        ]
      : "",
    [fieldNames.BUSINESSENTITY]: dasboardData
      ? businessEntityList[
          businessEntityList.findIndex(
            (item) => dasboardData["lf_business_entity"] == item.value
          )
        ]
      : "",
    [fieldNames.BUSINESSNAME]: dasboardData
      ? dasboardData["lf_business_name"]
      : "",
  };

  return (
    <div className="dashboard-panel">
      <Header />
      <div className="dashboard-body bg-change-color">
        <div className="container-fluid  merchant-body">
          <SiderBarMenu />

          <div className="right-panel-main">
            <h3>
              <i className="fa fa-laptop" aria-hidden="true"></i> Application
              Information{" "}
            </h3>
            <div className="dashboard-box position-relative card dashboard-card">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values, { setSubmitting }) => {
                  // setActiveStep(activeStep + 1);
                  // setDashboardStepNo(activeStep + 1);

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
                    <div className="review-application">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group amount-required">
                            <label>Amount Required</label>
                            <span className="dollor-col">
                              <i className="fa fa-usd"></i>
                            </span>
                            <input
                              type="number"
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
                                console.log(e.target.value);
                                // setReviewAppData(values);
                              }}
                              value={values[fieldNames.AMOUNT]}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Purpose of Loan</label>
                            <Select
                              closeMenuOnSelect={true}
                              onChange={(selectedOption) => {
                                setFieldValue(
                                  fieldNames.LOANPURPOSE,
                                  selectedOption
                                );
                              }}
                              onBlur={(selectedOption) => {
                                // setReviewAppData(values);
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
                              type="number"
                              placeholder="12"
                              name={fieldNames.REQUIREDFUND}
                              onChange={handleChange}
                              onBlur={(e) => {
                                // setReviewAppData(values);
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
                                // setReviewAppData(values);
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
                                // setReviewAppData(values);
                              }}
                              components={{
                                IndicatorSeparator: () => null,
                                DropdownIndicator: () => null,
                              }}
                              // onInputChange={handleInputChange}
                              onBlur={(selectedOption) => {
                                // setReviewAppData(values);
                              }}
                              placeholder="Select Business Name"
                              styles={{
                                control: (styles, state) => {
                                  console.log(
                                    state,
                                    touched[fieldNames.BUSINESSNAME] &&
                                      errors[fieldNames.BUSINESSNAME]
                                  );
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

                      <button
                        className="btn btn-primary save-btn next-btn"
                        type="submit"
                      >
                        Save <i className="fa fa-file-image-o"></i>
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationInformation;

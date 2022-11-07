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

function ReviewApplicationInformation({ data }) {
  const initialValues = {
    [fieldNames.AMOUNT]: data["lf_amount_required"],
    [fieldNames.REQUIREDFUND]: data["lm_Funds"],
    [fieldNames.LOANPURPOSE]:
      loadPurposeList[
        loadPurposeList.findIndex(
          (item) => data.ApptxtLoanPurpose == item.value
        )
      ],
    [fieldNames.BUSINESSENTITY]:
      businessEntityList[
        businessEntityList.findIndex(
          (item) => data.lf_business_activity == item.value
        )
      ],
    [fieldNames.BUSINESSNAME]: data["lf_business_name"],
  };


  return (
    <div className="dashboard-box position-relative card dashboard-card">
      <div className="review-application">
        <h3>Review Application information</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
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
                  <div className="form-group amount-required">
                    <label>Amount Required</label>
                    <span className="dollor-col">
                      <i className="fa fa-usd"></i>
                    </span>
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
                        console.log(e.target.value);
                        // setApplicationInfo(values);
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
                        setFieldValue(fieldNames.LOANPURPOSE, selectedOption);
                      }}
                      onBlur={(selectedOption) => {
                        // setApplicationInfo(values);
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
                        console.log(e.target.value);
                        // setApplicationInfo(values);
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
                        // setApplicationInfo(values);
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
                        // setApplicationInfo(values);
                      }}
                      components={{
                        IndicatorSeparator: () => null,
                        DropdownIndicator: () => null,
                      }}
                      // onInputChange={handleInputChange}
                      onBlur={(selectedOption) => {
                        // setApplicationInfo(values);
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
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ReviewApplicationInformation;

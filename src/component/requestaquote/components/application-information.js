import { Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-link";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import axios from "axios";
import clsx from "clsx";
import * as Yup from "yup";
import { setStepNo } from "./request-leftpanel";
import { setBusinessInfo } from "./business-information";

export const fieldNames = {
  AMOUNT: "amount",
  LOANPURPOSE: "loanPurpose",
  REQUIREDFUND: "requiredFund",
  BUSINESSENTITY: "businessEntity",
  BUSINESSNAME: "businessName",
  BUSINESSSECTOR: "businessSector",
  BUSINESSSTARTDATE: "businessStartDate",
  ISPAYMENTPROCESSED: "isPaymentProcessed",
  CARDPAYMENTAMOUNT: "cardPaymentAmount",
  ISPAYMENTPENDING: "isPaymentPending",
  SUPPLIERDUEAMOUNT: "supplierDueAmount",
  FIRSTNAME: "firstName",
  LASTNAME: "lastName",
  EMAIL: "email",
  PHONE: "phone",
  PASSWORD: "password",
  CONFIRMPASSWORD: "confirmPassword",
};

const loadPurposeList = [
  { value: "42001", label: "Cash Flow / Working Capital" },
  { value: "42002", label: "Expansion" },
  { value: "42003", label: "Stock" },
  { value: "42004", label: "Tax / VAT" },
  { value: "42005", label: "Hiring Staff" },
  { value: "42006", label: "Debt Refinance" },
  { value: "42007", label: "Invoice Finance" },
  { value: "42008", label: "Trade Internationally" },
  { value: "42009", label: "Starting a business" },
  { value: "42010", label: "Refurbishments" },
  { value: "42011", label: "Insolvency/restructuring" },
  { value: "42012", label: "Purchasing Assets - Vehicles - Construction" },
  { value: "42013", label: "Purchasing Assets - Vehicles - Haulage" },
  { value: "42014", label: "Purchasing Assets - Vehicles - Agricultural" },
  { value: "42015", label: "Purchasing Assets - Vehicles - Company Cars" },
  { value: "42016", label: "Purchasing Assets - Machinery - Bespoke" },
  { value: "42017", label: "Purchasing Assets - Machinery - General" },
  { value: "42018", label: "Purchasing Assets - Equipment - Construction" },
  { value: "42019", label: "Purchasing Assets - Equipment - Agricultural" },
  { value: "42020", label: "Purchasing Assets - Equipment - Printing" },
  { value: "42021", label: "Purchasing Assets - Equipment - Plant" },
  { value: "42022", label: "Purchasing Assets - Other - Detailed" },
  { value: "42023", label: "Property Refinance - Commercial" },
  { value: "42024", label: "Property Refinance - Residential Buy-to-let" },
  { value: "42025", label: "Property Development - Land without planning" },
  { value: "42026", label: "Property Development - Land with planning" },
  {
    value: "42027",
    label: "Property Development - Existing building(s) without planning",
  },
  {
    value: "42028",
    label: "Property Development - Existing building(s) with planning",
  },
  { value: "42029", label: "Property Bridging - Commercial - Owner Occupied" },
  { value: "42030", label: "Property Bridging - Commercial - Buy-to-let" },
  { value: "42031", label: "Property Bridging - Residential - Buy-to-let" },
  { value: "42032", label: "Property Bridging - Land for development" },
  {
    value: "42033",
    label: "Property Purchase - Commercial premises (current)",
  },
  { value: "42034", label: "Property Purchase - Commercial premises (new)" },
  { value: "42035", label: "Property Purchase - Buy-to-let (commercial)" },
  { value: "42036", label: "Property Purchase - Buy-to-let (residential)" },
  { value: "42037", label: "Other" },
  { value: "42038", label: "Management Buy-Out" },
];

const businessEntityList = [
  { value: "Sole Trader", label: "Sole Trader" },
  { value: "Non-Ltd Partnership", label: "Non-Ltd Partnership" },
  { value: "Private Limited Company", label: "Private limited company" },
  { value: "Public Limited Company", label: "Public limited company" },
  { value: "Old Public Company", label: "Old public company" },
  { value: "Limited Partnership", label: "Limited partnership" },
  {
    value: "Private Limited Company use of 'Limited' exemption",
    label: "Private Limited Company use of 'Limited' exemption",
  },
  { value: "Northern Ireland Company", label: "Northern Ireland company" },
  {
    value: "Limited Liability Partnership",
    label: "Limited liability partnership ",
  },
  { value: "Unregistered Company", label: "Unregistered company" },
  { value: "UK Establishment Company", label: "UK establishment company" },
  {
    value: "Scottish Qualifying Partnership",
    label: "Scottish qualifying partnership",
  },
];

function ApplicationInformation({ setStep, showSelectedState }) {
  const storedData = JSON.parse(localStorage.getItem("applicationInfo"));
  console.log(
    "🚀 ~ file: application-information.js ~ line 107 ~ ApplicationInformation ~ storedData",
    storedData
  );
  const initialValues = {
    [fieldNames.AMOUNT]: storedData ? storedData[fieldNames.AMOUNT] : "",
    [fieldNames.REQUIREDFUND]: storedData
      ? storedData[fieldNames.REQUIREDFUND]
      : "",
    [fieldNames.LOANPURPOSE]: storedData
      ? storedData[fieldNames.LOANPURPOSE]
      : "",
    [fieldNames.BUSINESSENTITY]: storedData
      ? storedData[fieldNames.BUSINESSENTITY]
      : "",
    [fieldNames.BUSINESSNAME]: storedData
      ? storedData[fieldNames.BUSINESSNAME]
      : "",
  };

  const setApplicationInfo = (info) => {
    localStorage.setItem("applicationInfo", JSON.stringify(info));
  };

  const loadOptions = async (inputValue) => {
    const res = await axios.get(
      `https://sales.decimalfactor.com/staging/api/SearchCompanies.php?SearchValue=${inputValue}`
    );
    const data = res.data.items;
    return data;
  };

  const validationSchema = Yup.object().shape({
    [fieldNames.AMOUNT]: Yup.number().required(),
    [fieldNames.REQUIREDFUND]: Yup.string().required(),
    [fieldNames.LOANPURPOSE]: Yup.string().required(),
    [fieldNames.BUSINESSENTITY]: Yup.string().required(),
    [fieldNames.BUSINESSNAME]: Yup.string().required(),
  });

  return (
    <div className="right-panel">
      <h2>Application Information</h2>
      <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setStep(2);
          showSelectedState(2);
          setStepNo(2);
          setApplicationInfo(values);
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
            <div className="form-group amount-required">
              <label>Amount Required</label>
              <span className="dollor-col">
                <i className="fa fa-usd"></i>
              </span>
              <input
                type="number"
                placeholder="Enter amount"
                className={clsx(
                  "form-control ",
                  {
                    "is-invalid":
                      touched[fieldNames.AMOUNT] && errors[fieldNames.AMOUNT],
                  },
                  {
                    "is-valid":
                      touched[fieldNames.AMOUNT] && !errors[fieldNames.AMOUNT],
                  }
                )}
                name={fieldNames.AMOUNT}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[fieldNames.AMOUNT]}
              />
            </div>
            <div className="form-group purpose-loan">
              <label>Purpose of Loan</label>
              <Select
                closeMenuOnSelect={true}
                onBlur={handleBlur}
                onChange={(selectedOption) => {
                  console.log(
                    "🚀 ~ file: application-information.js ~ line 202 ~ ApplicationInformation ~ value",
                    selectedOption
                  );
                  setFieldValue(fieldNames.LOANPURPOSE, selectedOption);
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

              {/* <select
                placeholder="Enter purpose of loan"
                className="form-control"
                name="Purpose of Loan"
              >
                <option>Enter purpose of loan</option>
                <option>Enter purpose of loan</option>
              </select> */}
            </div>
            <div className="form-group">
              <label>Term of Funds Required (Months)</label>
              <input
                type="number"
                placeholder="12"
                name={fieldNames.REQUIREDFUND}
                onChange={handleChange}
                onBlur={handleBlur}
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
                onBlur={handleBlur}
                onChange={(selectedOption) =>
                  setFieldValue(fieldNames.BUSINESSENTITY, selectedOption)
                }
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
            {values[fieldNames.BUSINESSENTITY] && (
              <div className="form-group business-entity">
                <label>Business Name</label>

                <AsyncSelect
                  closeMenuOnSelect={true}
                  value={values[fieldNames.BUSINESSNAME]}
                  name={fieldNames.BUSINESSNAME}
                  getOptionLabel={(e) => e.title}
                  getOptionValue={(e) => e}
                  loadOptions={loadOptions}
                  onChange={(selectedOption) => {
                    console.log(
                      "🚀 ~ file: application-information.js ~ line 325 ~ ApplicationInformation ~ selectedOption",
                      selectedOption
                    );
                    setFieldValue(fieldNames.BUSINESSNAME, selectedOption);
                    setBusinessInfo(selectedOption);
                  }}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  // onInputChange={handleInputChange}
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
            )}

            <button className="btn btn-primary next-btn">
              Next <i className="fa fa-chevron-right"></i>
            </button>
            <div className="divider"></div>
            <div className="form-group loginnow-btn">
              <p>
                Already have an Account? <Link href="#">Login Now</Link>
              </p>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ApplicationInformation;

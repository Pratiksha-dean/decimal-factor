import { Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-link";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import axios from "axios";
import clsx from "clsx";
import * as Yup from "yup";
import { setStepNo } from "./request-leftpanel";
import { setBusinessInfo, setCompanyInfo } from "./business-information";
import { NavLink } from "react-router-dom";
import { SEARCH_COMPANY_URL } from "../../../request";

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
  DIRECTORINFO: "directorInfo",
  NATUREOFCONTROL: "natures_of_control",
  TOTALSHARECOUNT: "totalShareCount",
  DATEOFBIRTH: "dateOfBirth",
  POSTCODE: "postal_code",
  ADDRESS: "address_line_1",
  HOUSENUMBER: "houseNumber",
  HOUSENAME: "houseName",
  STREET: "street",
  COUNTY: "county",
  TOWN: "town",
  RESIDENTIALSTATUS: "residentialStatus",
  LIVINGSINCE: "living_since",
  BUSINESSLEGALNUMBER: "businessLegalNumber",
  ISPRIMARY: "is_primary",
  PHONENUMBER: "phonenumber",
  EMAILID: "email_id",
  CHOOSEADDRESS: "choose_address",
  CURRENTPASSWORD: "currentpassword",
};

// "PreviousAddress": [],
// "shareHolderID": "7404",
// "kindofShareHolder": "",
// "nationality": null,
// "natures_of_control": "individual-beneficial-owner",
// "country_of_residence": null,
// "fullName": "Hilary Phillips",
// "firstName": "Hilary",
// "lastName": "Phillips",
// "DOB_day": "01",
// "DOB_month": "04",
// "DOB_year": "1944",
// "locality": null,
// "address_line_1": "Old Gloucester Street",
// "postal_code": "WC1N 3AX",
// "notified_on": null,
// "phonenumber": "789654478555",
// "email_id": "badhwaryash@gmail.com",
// "is_primary": "1",
// "residentialStatus": "18003",
// "houseNumber": "27",
// "houseName": "27",
// "street": "Old Gloucester Street",
// "city": null,
// "town": "United Kingdom",
// "county": "London",
// "living_since": "04/11/2015",
// "companyName": ""

export const loadPurposeList = [
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

export const businessEntityList = [
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

export const validationSchema = Yup.object().shape({
  [fieldNames.AMOUNT]: Yup.number().required(),
  [fieldNames.REQUIREDFUND]: Yup.string().required(),
  [fieldNames.LOANPURPOSE]: Yup.string().required(),
  [fieldNames.BUSINESSENTITY]: Yup.string().required(),
  [fieldNames.BUSINESSNAME]: Yup.string().required(),
});

export const getApplicationInfo = () => {
  return JSON.parse(localStorage.getItem("applicationInfo"));
};

export const loadOptions = async (inputValue) => {
  const res = await axios.get(`${SEARCH_COMPANY_URL}${inputValue}`);
  const data = res.data.items;
  let list = res.data.items.map((item) => {
    return { label: item.title, value: item.title, data: item };
  });

  return list;
};

function ApplicationInformation({ setStep, showSelectedState }) {
  const storedData = getApplicationInfo();
  console.log(
    "🚀 ~ file: application-information.js ~ line 180 ~ ApplicationInformation ~ storedData",
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

  return (
    <div className="right-panel">
      <h2>Application Information</h2>
      <h5>Please enter the details below</h5>
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
            <div className="form-group">
              <label>Amount Required</label>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-pound-sign"></i>
                  </span>
                </div>
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
                        touched[fieldNames.AMOUNT] &&
                        !errors[fieldNames.AMOUNT],
                    }
                  )}
                  name={fieldNames.AMOUNT}
                  onChange={handleChange}
                  onBlur={(e) => {
                    setApplicationInfo(values);
                  }}
                  value={values[fieldNames.AMOUNT]}
                />
              </div>
              {/* <span className="dollor-col">
                <i className="fa fa-pound-sign"></i>
              </span> */}
            </div>
            <div className="form-group purpose-loan">
              <label>Purpose of Loan</label>
              <Select
                closeMenuOnSelect={true}
                onChange={(selectedOption) => {
                  setFieldValue(fieldNames.LOANPURPOSE, selectedOption);
                }}
                onBlur={(selectedOption) => {
                  setApplicationInfo(values);
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
            <div className="form-group">
              <label>Term of Funds Required (Months)</label>
              <input
                type="number"
                placeholder="12"
                name={fieldNames.REQUIREDFUND}
                onChange={handleChange}
                onBlur={(e) => {
                  setApplicationInfo(values);
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
                  setFieldValue(fieldNames.BUSINESSENTITY, selectedOption);
                }}
                onBlur={(selectedOption) => {
                  setApplicationInfo(values);
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
            {values[fieldNames.BUSINESSENTITY] && (
              <div className="form-group business-entity">
                <label>Business Name</label>

                <AsyncSelect
                  closeMenuOnSelect={true}
                  value={{
                    label: values[fieldNames.BUSINESSNAME],
                    value: values[fieldNames.BUSINESSNAME],
                  }}
                  name={fieldNames.BUSINESSNAME}
                  loadOptions={loadOptions}
                  onChange={(selectedOption) => {
                    setFieldValue(
                      fieldNames.BUSINESSNAME,
                      selectedOption.value
                    );
                    setApplicationInfo(values);
                    setCompanyInfo(selectedOption.data);
                  }}
                  components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => null,
                  }}
                  onBlur={(selectedOption) => {
                    setApplicationInfo(values);
                  }}
                  placeholder="Select Business Name"
                  styles={{
                    control: (styles, state) => {
                      const borderColor =
                        !values[fieldNames.BUSINESSNAME] &&
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
                Already have an Account?{" "}
                <NavLink to="/login">Login Now</NavLink>
              </p>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ApplicationInformation;

import { Formik } from "formik";
import React from "react";
import Select from "react-select";
import { fieldNames } from "./application-information";
import clsx from "clsx";
import * as Yup from "yup";
import { setStepNo } from "./request-leftpanel";

export const businessSectorList = [
  { value: "49001", label: "Hospitality - Cafe" },
  { value: "49002", label: "Hospitality - Restaurant" },
  { value: "49003", label: "Hospitality - Bar" },
  { value: "49004", label: "Hospitality - NightClub" },
  { value: "49005", label: "Hospitality - Pub - Gastro" },
  { value: "49006", label: "Hospitality - Pub - Wet-led" },
  { value: "49007", label: "Hospitality - Fast Food" },
  { value: "49008", label: "Retail - Market Stalls" },
  { value: "49009", label: "Retail - Mini Mart" },
  { value: "49010", label: "Retail - Off Licence" },
  { value: "49011", label: "Retail - Shop High Street" },
  { value: "49012", label: "Retail - Shop Online" },
  { value: "49013", label: "Retail - Shop Other" },
  { value: "49014", label: "Petrol Station" },
  { value: "49015", label: "MOT Garage/Auto repair" },
  { value: "49016", label: "Manufacturer" },
  { value: "49017", label: "Agriculture" },
  { value: "49018", label: "Accountant" },
  { value: "49019", label: "Architect" },
  { value: "49020", label: "Gym" },
  { value: "49021", label: "Vets" },
  { value: "49022", label: "Dentist" },
  { value: "49023", label: "Hotel" },
  { value: "49024", label: "Music Shop" },
  { value: "49025", label: "Electronics Shop" },
  { value: "49026", label: "Wholesale" },
  { value: "49027", label: "Other" },
];

export const setCompanyInfo = (data) => {
  localStorage.setItem("companyInfo", JSON.stringify(data));
};

export const getCompanyInfo = (data) => {
  return JSON.parse(localStorage.getItem("companyInfo"));
};

export const setBusinessInfo = (info) => {
  localStorage.setItem("businessInfo", JSON.stringify(info));
};

export const getBusinessInfo = () => {
  return JSON.parse(localStorage.getItem("businessInfo"));
};

function BusinessInformation({ setStep, showSelectedState }) {
  const storedData = JSON.parse(localStorage.getItem("businessInfo"));
  const businessInfo = getCompanyInfo();
  const validationSchema = Yup.object().shape({
    [fieldNames.CARDPAYMENTAMOUNT]: Yup.number().required(),
    [fieldNames.BUSINESSSTARTDATE]: Yup.string().required(),
    [fieldNames.ISPAYMENTPENDING]: Yup.boolean().required(),
    [fieldNames.SUPPLIERDUEAMOUNT]: Yup.string().when(
      fieldNames.ISPAYMENTPENDING,
      {
        is: true,
        then: Yup.string().required(),
      }
    ),

    [fieldNames.CARDPAYMENTAMOUNT]: Yup.string().when(
      fieldNames.ISPAYMENTPROCESSED,
      {
        is: true,
        then: Yup.string().required(),
      }
    ),

    [fieldNames.ISPAYMENTPROCESSED]: Yup.boolean().required(),
    [fieldNames.BUSINESSSECTOR]: Yup.string().required(),
  });
  const initialValues = {
    [fieldNames.CARDPAYMENTAMOUNT]: storedData
      ? storedData[fieldNames.CARDPAYMENTAMOUNT]
      : "",
    [fieldNames.BUSINESSSTARTDATE]: storedData
      ? storedData[fieldNames.BUSINESSSTARTDATE]
      : businessInfo && businessInfo["date_of_creation"]
      ? businessInfo["date_of_creation"]
      : "",
    [fieldNames.ISPAYMENTPENDING]: storedData
      ? storedData[fieldNames.ISPAYMENTPENDING]
      : false,
    [fieldNames.ISPAYMENTPROCESSED]: storedData
      ? storedData[fieldNames.ISPAYMENTPROCESSED]
      : false,
    [fieldNames.SUPPLIERDUEAMOUNT]: storedData
      ? storedData[fieldNames.SUPPLIERDUEAMOUNT]
      : "",
    [fieldNames.BUSINESSSECTOR]: storedData
      ? storedData[fieldNames.BUSINESSSECTOR]
      : "",
  };

  const goBack = () => {
    setStep(1);
    showSelectedState(1);
    setStepNo(1);
  };

  return (
    <div className="right-panel">
      <h2>Business Information</h2>
      <h5>
        We require some business information to determine your eligibility{" "}
      </h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setStep(3);
          showSelectedState(3);
          setStepNo(3);
          setBusinessInfo(values);
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group purpose-loan">
              <label>Business Sector</label>
              <Select
                closeMenuOnSelect={true}
                onBlur={() => {
                  setBusinessInfo(values);
                }}
                onChange={(selectedOption) =>
                  setFieldValue(fieldNames.BUSINESSSECTOR, selectedOption)
                }
                name={fieldNames.BUSINESSSECTOR}
                options={businessSectorList}
                placeholder="Enter business sector"
                styles={{
                  control: (styles, state) => {
                    const borderColor =
                      !state.hasValue &&
                      touched[fieldNames.BUSINESSSECTOR] &&
                      errors[fieldNames.BUSINESSSECTOR]
                        ? "red"
                        : "#ced4da";

                    return { ...styles, borderColor };
                  },
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
                value={values[fieldNames.BUSINESSSECTOR]}
              />
            </div>
            <div className="form-group business-date">
              <label>Business Start Date</label>
              <input
                type="date"
                placeholder="Enter business start date"
                name={fieldNames.BUSINESSSTARTDATE}
                className={clsx(
                  "form-control ",
                  {
                    "is-invalid":
                      touched[fieldNames.BUSINESSSTARTDATE] &&
                      errors[fieldNames.BUSINESSSTARTDATE],
                  },
                  {
                    "is-valid":
                      touched[fieldNames.BUSINESSSTARTDATE] &&
                      !errors[fieldNames.BUSINESSSTARTDATE],
                  }
                )}
                onChange={handleChange}
                onBlur={() => {
                  setBusinessInfo(values);
                }}
                value={values[fieldNames.BUSINESSSTARTDATE]}
              />
            </div>

            <div className="form-group card-payment">
              <label>Any card payments processed?</label>
              <div className="form-check form-switch">
                <div className="yes-checkbox">
                  <input
                    type="checkbox"
                    id="switch"
                    name={fieldNames.ISPAYMENTPROCESSED}
                    onChange={handleChange}
                    onClick={(e) => {
                      console.log("e", e.target.checked, values);
                      setFieldValue(
                        fieldNames.ISPAYMENTPROCESSED,
                        e.target.checked
                      );
                      let obj = { ...values };
                      obj[fieldNames.ISPAYMENTPROCESSED] = e.target.checked;
                      setBusinessInfo(obj);
                    }}
                    checked={values[fieldNames.ISPAYMENTPROCESSED]}
                  />
                  <label
                    for="switch"
                    className={clsx(
                      "form-control ",
                      {
                        "is-invalid":
                          touched[fieldNames.ISPAYMENTPROCESSED] &&
                          errors[fieldNames.ISPAYMENTPROCESSED],
                      },
                      {
                        "is-valid":
                          touched[fieldNames.ISPAYMENTPROCESSED] &&
                          !errors[fieldNames.ISPAYMENTPROCESSED],
                      }
                    )}
                  ></label>
                </div>
              </div>
            </div>

            {values[fieldNames.ISPAYMENTPROCESSED] && (
              <div className="form-group monthly-card-payment">
                <label>Monthly Card Payments Amount</label>
                <span className="dollor-col">
                  <i className="fa fa-usd"></i>
                </span>
                <input
                  type="number"
                  placeholder="Monthly Card Payments Amount"
                  name={fieldNames.CARDPAYMENTAMOUNT}
                  className={clsx(
                    "form-control ",
                    {
                      "is-invalid":
                        touched[fieldNames.CARDPAYMENTAMOUNT] &&
                        errors[fieldNames.CARDPAYMENTAMOUNT],
                    },
                    {
                      "is-valid":
                        touched[fieldNames.CARDPAYMENTAMOUNT] &&
                        !errors[fieldNames.CARDPAYMENTAMOUNT],
                    }
                  )}
                  onChange={handleChange}
                  onBlur={() => {
                    setBusinessInfo(values);
                  }}
                  value={values[fieldNames.CARDPAYMENTAMOUNT]}
                />
              </div>
            )}

            <div className="form-group card-payment">
              <label>Any pending supplier payments due to you?</label>
              <div className="form-check form-switch">
                <div className="yes-checkbox">
                  <input
                    type="checkbox"
                    id="switch3"
                    name={fieldNames.ISPAYMENTPENDING}
                    onChange={handleChange}
                    checked={values[fieldNames.ISPAYMENTPENDING]}
                    onClick={(e) => {
                      // setFieldValue(
                      //   fieldNames.ISPAYMENTPENDING,
                      //   e.target.checked
                      // );
                      let obj = { ...values };

                      obj[fieldNames.ISPAYMENTPENDING] = e.target.checked;
                      setBusinessInfo(obj);
                    }}
                  />
                  <label
                    for="switch3"
                    className={clsx(
                      "form-control ",
                      {
                        "is-invalid":
                          touched[fieldNames.ISPAYMENTPENDING] &&
                          errors[fieldNames.ISPAYMENTPENDING],
                      },
                      {
                        "is-valid":
                          touched[fieldNames.ISPAYMENTPENDING] &&
                          !errors[fieldNames.ISPAYMENTPENDING],
                      }
                    )}
                  ></label>
                </div>
              </div>
            </div>

            {values[fieldNames.ISPAYMENTPENDING] && (
              <div className="form-group Term-found">
                <label>Approx Amount due to you from supplier</label>
                <span className="dollor-col">
                  <i className="fa fa-usd"></i>
                </span>
                <input
                  type="number"
                  placeholder="Approx Amount due to you from supplier"
                  name={fieldNames.SUPPLIERDUEAMOUNT}
                  className={clsx(
                    "form-control ",
                    {
                      "is-invalid":
                        touched[fieldNames.SUPPLIERDUEAMOUNT] &&
                        errors[fieldNames.SUPPLIERDUEAMOUNT],
                    },
                    {
                      "is-valid":
                        touched[fieldNames.SUPPLIERDUEAMOUNT] &&
                        !errors[fieldNames.SUPPLIERDUEAMOUNT],
                    }
                  )}
                  min="0"
                  onChange={handleChange}
                  onBlur={() => {
                    setBusinessInfo(values);
                  }}
                  value={values[fieldNames.SUPPLIERDUEAMOUNT]}
                />
              </div>
            )}

            <button
              className="btn btn-primary back-btn"
              onClick={() => goBack()}
              type="button"
            >
              <i className="fa fa-chevron-left"></i> Back{" "}
            </button>
            <button className="btn btn-primary next-btn" type="submit">
              Next <i className="fa fa-chevron-right"></i>
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default BusinessInformation;

import { FieldArray, Formik } from "formik/dist";
import React from "react";
import { fieldNames } from "../../requestaquote/components/application-information";
import {
  businessSectorList,
  getCompanyInfo,
} from "../../requestaquote/components/business-information";
import Select from "react-select";
import clsx from "clsx";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import { setDashboardStepNo } from "../dashboard";
import { useEffect } from "react";
import { getDirectorList } from "../../../request";
import { useState } from "react";
import { directorFieldNames, residentialStatusList } from "../../Constants";

export const setReviewBusinessData = (data) => {
  localStorage.setItem("reviewBusinessInfo", JSON.stringify(data));
};

export const getReviewBusinessData = () => {
  return JSON.parse(localStorage.getItem("reviewBusinessInfo"));
};

const Accordion = ({ title, children, isPrimary, id }) => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <div className="accordion-wrapper">
      <div
        className={`accordion-title  ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
        style={{ justifyContent: "flex-start" }}
      >
        <div className="px-2"> {title}</div>
        {isPrimary == "1" && (
          <button
            className="btn btn-success btn-sm mr-2"
            style={{ backgroundColor: "#198754" }}
          >
            Primary
          </button>
        )}
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content" id={id}>
          {children}
        </div>
      </div>
    </div>
  );
};

function ReviewBusinessInformation({ data, setActiveStep, activeStep }) {
  const storedData = getReviewBusinessData();
  const [directorList, setDirectorList] = useState([]);

  useEffect(() => {
    if (data && data["lmc_bi_business_number"]) {
      getDirectorList(data["lmc_bi_business_number"]).then((resp) => {
        console.log(
          "🚀 ~ file: review-business-information.js ~ line 59 ~ getDirectorList ~ resp",
          resp
        );
        setDirectorList(resp.items);
      });
    }
  }, []);

  const validationSchema = Yup.object().shape({
    [fieldNames.CARDPAYMENTAMOUNT]: Yup.number().required(),
    [fieldNames.BUSINESSSTARTDATE]: Yup.string().required(),
    [fieldNames.SUPPLIERDUEAMOUNT]: Yup.string().required(),
    [fieldNames.BUSINESSSECTOR]: Yup.string().required(),
    [fieldNames.BUSINESSLEGALNUMBER]: Yup.string().required(),

    [fieldNames.DIRECTORINFO]: Yup.array().of(
      Yup.object().shape({
        [directorFieldNames.NATUREOFCONTROL]: Yup.string(),
        [directorFieldNames.TOTALSHARECOUNT]: Yup.string(),
        [directorFieldNames.DATEOFBIRTH]: Yup.string(),
        [directorFieldNames.POSTCODE]: Yup.string(),
        [directorFieldNames.ADDRESS]: Yup.string(),
        [directorFieldNames.HOUSENUMBER]: Yup.string(),
        [directorFieldNames.HOUSENAME]: Yup.string(),
        [directorFieldNames.STREET]: Yup.string(),
        [directorFieldNames.COUNTY]: Yup.string(),
        [directorFieldNames.TOWN]: Yup.string(),
        [directorFieldNames.RESIDENTIALSTATUS]: Yup.string(),
        [directorFieldNames.LIVINGSINCE]: Yup.string(),
        [directorFieldNames.FIRSTNAME]: Yup.string(),
        [directorFieldNames.LASTNAME]: Yup.string(),
        [directorFieldNames.PHONENUMBER]: Yup.string(),
        [directorFieldNames.EMAIL]: Yup.string(),
        [directorFieldNames.ISPRIMARY]: Yup.string(),
        [directorFieldNames.CHOOSEADDRESS]: Yup.string(),
      })
    ),
  });
  const patchDirectorData = (data) => {
    let values = directorList;
    console.log("directorList", directorList);

    if (values && values.length) {
      values = directorList.map((item) => {
        let name = item.name.split(",");
        item["firstName"] = name[0];
        item["lastName"] = name[1];
        if (item["address"]) {
          item[fieldNames.POSTCODE] = item["address"][fieldNames.POSTCODE];
          item[fieldNames.STREET] = item["address"]["address_line_1"];
          item[fieldNames.COUNTY] = item["address"]["locality"];
          item[fieldNames.HOUSENAME] = item["address"]["premises"];
          item[fieldNames.HOUSENUMBER] = "";
          item[fieldNames.TOWN] = "";
          item[fieldNames.RESIDENTIALSTATUS] = "";
        }
        item[fieldNames.LIVINGSINCE] = "";
        item[fieldNames.NATUREOFCONTROL] = "";
        item[fieldNames.EMAIL] = item["email"] ? item["email"] : "";
        item[fieldNames.PHONE] = item["phone"] ? item["phone"] : "";
        item[fieldNames.TOTALSHARECOUNT] = item["share_count"]
          ? item["share_count"]
          : "";

        item[fieldNames.ISPRIMARY] = false;
        item[fieldNames.CHOOSEADDRESS] = "";
        console.log(
          "🚀 ~ file: review-business-information.js ~ line 109 ~ values=directorList.map ~ name",
          name
        );
        if (item["date_of_birth"]) {
          item[fieldNames.DATEOFBIRTH] =
            item["date_of_birth"]["year"] +
            "-" +
            item["date_of_birth"]["month"] +
            "-" +
            item["date_of_birth"]["day"];
        }
        // delete item["address"];
        delete item["address"];
        delete item["appointed_on"];
        delete item["links"];
        delete item["date_of_birth"];
        delete item["occupation"];
        delete item["nationality"];
        delete item["resigned_on"];
        delete item["officer_role"];
        delete item["country_of_residence"];

        return item;
      });
    }
    console.log(
      "🚀 ~ file: review-business-information.js ~ line 116 ~ patchDirectorData ~ values",
      values
    );

    return values;
  };
  const initialValues = {
    [fieldNames.BUSINESSSECTOR]: storedData
      ? storedData[fieldNames.BUSINESSSECTOR]
      : businessSectorList[
          businessSectorList.findIndex(
            (item) => data.lf_business_sector == item.value
          )
        ],
    [fieldNames.BUSINESSSTARTDATE]: storedData
      ? storedData[fieldNames.BUSINESSSTARTDATE]
      : data["AppBusinessStartDate"],

    [fieldNames.CARDPAYMENTAMOUNT]: storedData
      ? storedData[fieldNames.CARDPAYMENTAMOUNT]
      : data["lf_monthly_credit_card_volume"],
    [fieldNames.SUPPLIERDUEAMOUNT]: storedData
      ? storedData[fieldNames.SUPPLIERDUEAMOUNT]
      : data["AppCurrentValueOverdueInvoices"],
    [fieldNames.BUSINESSLEGALNUMBER]: data
      ? data["lmc_bi_business_number"]
      : "",
    [fieldNames.DIRECTORINFO]: patchDirectorData(data),
  };

  useEffect(() => {
    if (!storedData) {
      console.log("no stored dara", initialValues);
      setReviewBusinessData(initialValues);
    }
  }, []);
  return (
    <div className="dashboard-box position-relative card dashboard-card">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(
            "🚀 ~ file: review-business-information.js ~ line 140 ~ ReviewBusinessInformation ~ values",
            values
          );
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="review-application">
              <h3>Review Business Information</h3>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Business Sector</label>
                    <Select
                      closeMenuOnSelect={true}
                      onBlur={() => {
                        setReviewBusinessData(values);
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
                </div>
                <div className="col-md-4">
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
                        setReviewBusinessData(values);
                        console.log("errors", errors);
                      }}
                      value={values[fieldNames.BUSINESSSTARTDATE]}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group monthly-card-payment">
                    <label>Monthly Card Takings</label>
                    <span className="dollor-col">
                      <i className="fa fa-usd"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="90,000"
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
                        setReviewBusinessData(values);
                      }}
                      value={values[fieldNames.CARDPAYMENTAMOUNT]}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group Term-found">
                    <label>Business Invoiced</label>
                    <span className="dollor-col">
                      <i className="fa fa-usd"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Business Invoiced"
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
                        setReviewBusinessData(values);
                      }}
                      value={values[fieldNames.SUPPLIERDUEAMOUNT]}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Business Legal Number</label>

                    <input
                      type="text"
                      placeholder="Business Legal Number"
                      name={fieldNames.BUSINESSLEGALNUMBER}
                      className={clsx(
                        "form-control ",
                        {
                          "is-invalid":
                            touched[fieldNames.BUSINESSLEGALNUMBER] &&
                            errors[fieldNames.BUSINESSLEGALNUMBER],
                        },
                        {
                          "is-valid":
                            touched[fieldNames.BUSINESSLEGALNUMBER] &&
                            !errors[fieldNames.BUSINESSLEGALNUMBER],
                        }
                      )}
                      min="0"
                      onChange={handleChange}
                      onBlur={() => {
                        setReviewBusinessData(values);
                      }}
                      value={values[fieldNames.BUSINESSLEGALNUMBER]}
                    />

                    {/* <PhoneInput
                      name={fieldNames.BUSINESSLEGALNUMBER}
                      country={"uk"}
                      value={values[fieldNames.BUSINESSLEGALNUMBER]}
                      inputStyle={
                        touched[fieldNames.BUSINESSLEGALNUMBER] &&
                        errors[fieldNames.BUSINESSLEGALNUMBER] && {
                          borderColor: "red",
                        }
                      }
                      onChange={(phone) => {
                        setFieldValue(fieldNames.BUSINESSLEGALNUMBER, phone);
                      }}
                      onBlur={() => {
                        setReviewBusinessData(values);
                      }}
                      inputClass={"w-100"}
                      placeholder="Enter Phone Number"
                    /> */}

                    {/* <input
                      type="text"
                      placeholder="9898979998"
                      className="form-control"
                      name="Business Number"
                    /> */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="director-panel">
                    <h4>Directors of Business Name</h4>
                    {values["directorInfo"] &&
                      values["directorInfo"].length > 0 && (
                        <FieldArray
                          name={fieldNames.DIRECTORINFO}
                          render={(arrayHelpers) => (
                            <>
                              {values.directorInfo &&
                                values.directorInfo.length &&
                                values.directorInfo.map((item, index) => (
                                  <Accordion
                                    title={
                                      item[fieldNames.FIRSTNAME] +
                                      " " +
                                      item[fieldNames.LASTNAME]
                                    }
                                    key={index}
                                    isPrimary={
                                      item[directorFieldNames.ISPRIMARY]
                                    }
                                    id={`accordian${index}`}
                                  >
                                    <div className="director-field">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="form-group">
                                            <input
                                              type="checkbox"
                                              className="primary-checkbox"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.ISPRIMARY}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames.ISPRIMARY
                                                ]
                                              }
                                            />
                                            <label className="set-primary">
                                              Set as Primary
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>First Name</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Joana"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.FIRSTNAME}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames.FIRSTNAME
                                                ]
                                              }
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>Last Name</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Last Name"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.LASTNAME}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames.LASTNAME
                                                ]
                                              }
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>Nature of Control</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Nature of Control"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.NATUREOFCONTROL}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames
                                                    .NATUREOFCONTROL
                                                ]
                                              }
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>
                                              % of Total Share Count
                                            </label>
                                            <input
                                              type="text"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.TOTALSHARECOUNT}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames
                                                    .TOTALSHARECOUNT
                                                ]
                                              }
                                              className="form-control"
                                              placeholder="% of Total Share Count"
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>Email Address</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Email Address"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.EMAILID}`}
                                              onChange={handleChange}
                                              value={
                                                item[directorFieldNames.EMAILID]
                                              }
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>Phone</label>
                                            {/* <input
                                          type="text"
                                          name="Phone"
                                          className="form-control"
                                          placeholder="Phone"
                                        /> */}

                                            <PhoneInput
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.PHONENUMBER}`}
                                              country={"gb"}
                                              value={
                                                item[
                                                  directorFieldNames.PHONENUMBER
                                                ]
                                              }
                                              inputStyle={
                                                touched[
                                                  directorFieldNames.PHONENUMBER
                                                ] &&
                                                errors[
                                                  directorFieldNames.PHONENUMBER
                                                ] && {
                                                  borderColor: "red",
                                                }
                                              }
                                              onChange={(phone) => {
                                                setFieldValue(
                                                  fieldNames.DIRECTORINFO[
                                                    index
                                                  ][
                                                    directorFieldNames
                                                      .PHONENUMBER
                                                  ],
                                                  phone
                                                );
                                              }}
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                              inputClass={"w-100"}
                                              placeholder="Enter Phone Number"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>Date of Birth</label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              placeholder="04/11/2022"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.DATEOFBIRTH}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames.DATEOFBIRTH
                                                ]
                                              }
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>Postcode</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Postcode"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.POSTCODE}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames.POSTCODE
                                                ]
                                              }
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>Choose Address</label>

                                            <select
                                              class="form-select form-control"
                                              aria-label="Default select example"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.CHOOSEADDRESS}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames
                                                    .CHOOSEADDRESS
                                                ]
                                              }
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                            >
                                              <option selected disabled>
                                                Choose Address
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>House Number</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="House Number"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.HOUSENUMBER}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames.HOUSENUMBER
                                                ]
                                              }
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>House Name</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="House Name"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.HOUSENAME}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames.HOUSENAME
                                                ]
                                              }
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>Street</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Street"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.STREET}`}
                                              onChange={handleChange}
                                              value={
                                                item[directorFieldNames.STREET]
                                              }
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>County</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="County"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.COUNTY}`}
                                              onChange={handleChange}
                                              value={
                                                item[directorFieldNames.COUNTY]
                                              }
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>Town</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Town"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.TOWN}`}
                                              onChange={handleChange}
                                              value={
                                                item[directorFieldNames.TOWN]
                                              }
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>Residential Status</label>
                                            <Select
                                              // menuIsOpen={true}
                                              closeMenuOnSelect={true}
                                              onChange={(selectedOption) =>
                                                setFieldValue(
                                                  directorFieldNames.RESIDENTIALSTATUS,
                                                  selectedOption
                                                )
                                              }
                                              name={
                                                directorFieldNames.RESIDENTIALSTATUS
                                              }
                                              options={residentialStatusList}
                                              // menuPortalTarget={document.getElementById(
                                              //   `accordian${index}`
                                              // )}
                                              placeholder="Select Residential Status"
                                              styles={{
                                                control: (styles, state) => {
                                                  const borderColor =
                                                    !state.hasValue &&
                                                    touched[
                                                      directorFieldNames
                                                        .RESIDENTIALSTATUS
                                                    ] &&
                                                    errors[
                                                      directorFieldNames
                                                        .RESIDENTIALSTATUS
                                                    ]
                                                      ? "red"
                                                      : "#ced4da";

                                                  return {
                                                    ...styles,
                                                    borderColor,
                                                  };
                                                },
                                                menuPortal: (base) => ({
                                                  ...base,
                                                  zIndex: 9999,
                                                }),
                                              }}
                                              components={{
                                                IndicatorSeparator: () => null,
                                              }}
                                              value={
                                                values[
                                                  directorFieldNames
                                                    .RESIDENTIALSTATUS
                                                ]
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>Living Since</label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              placeholder="Living Since"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.LIVINGSINCE}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames.LIVINGSINCE
                                                ]
                                              }
                                              onBlur={() => {
                                                setReviewBusinessData(values);
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Accordion>
                                ))}
                            </>
                          )}
                        />
                      )}

                    {/* <Accordion title="Joanna Kii"></Accordion>
                    <Accordion title="Cajetan Kii"></Accordion> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn"
                onClick={() => {
                  setActiveStep(activeStep - 1);
                  setDashboardStepNo(activeStep - 1);
                }}
                style={{ backgroundColor: "#E2E2E2" }}
                type="button"
              >
                {" "}
                <i className="bi bi-chevron-left"></i>Back
              </button>
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
  );
}

export default ReviewBusinessInformation;

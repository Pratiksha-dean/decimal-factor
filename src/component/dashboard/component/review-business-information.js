import { FieldArray, Formik } from "formik/dist";
import React from "react";
import { fieldNames } from "../../requestaquote/components/application-information";
import {
  businessSectorList,
  getCompanyInfo,
  setBusinessInfo,
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
import { ToastMessage } from "../../ToastMessage";

export const setReviewBusinessData = (data) => {
  localStorage.setItem("reviewBusinessInfo", JSON.stringify(data));
};

export const getReviewBusinessData = () => {
  return JSON.parse(localStorage.getItem("reviewBusinessInfo"));
};

export const setDirectorData = (data) => {
  localStorage.setItem("directorData", JSON.stringify(data));
};

export const getDirectorData = () => {
  return JSON.parse(localStorage.getItem("directorData"));
};

export const initialDirectorObject = {
  [directorFieldNames.NATUREOFCONTROL]: "",
  [directorFieldNames.TOTALSHARECOUNT]: "",
  [directorFieldNames.SHAREHOLDERDOBFULLFORMAT]: "",
  [directorFieldNames.POSTALCODE]: "",
  [directorFieldNames.ADDRESS]: "",
  [directorFieldNames.HOUSE_NUMBER]: "",
  [directorFieldNames.HOUSE_NAME]: "",
  [directorFieldNames.STREET]: "",
  [directorFieldNames.COUNTY]: "",
  [directorFieldNames.TOWN]: "",
  [directorFieldNames.RESIDENTIALSTATUS]: "",
  [directorFieldNames.LIVINGSINCE]: "",
  [directorFieldNames.FIRSTNAME]: "",
  [directorFieldNames.LASTNAME]: "",
  [directorFieldNames.PHONENUMBER]: "",
  [directorFieldNames.EMAIL]: "",
  [directorFieldNames.ISPRIMARY]: "",
  [directorFieldNames.CHOOSEADDRESS]: "",
  [directorFieldNames.ADDRESSLINE1]: "",
  [directorFieldNames.ADDRESSLINE2]: "",
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
        {isPrimary && (
          <button
            className="btn btn-success btn-sm mr-2"
            style={{ backgroundColor: "#198754", pointerEvents: "none" }}
            type="button"
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
    if (data && data["lmc_bi_business_number"] && !data["ShareHolderList"]) {
      getDirectorList(data["lmc_bi_business_number"]).then((resp) => {
        setDirectorList(resp.items);
        if (!getDirectorData()) {
          generateDirectorArray(resp.items);
        }
      });
    } else if (data["ShareHolderList"]) {
      setDirectorList(data["ShareHolderList"]);
      if (!getDirectorData()) {
        generateDirectorArray(data["ShareHolderList"]);
      }
    }
  }, []);

  const validationSchema = Yup.object().shape({
    [fieldNames.CARDPAYMENTAMOUNT]: Yup.number().required(),
    [fieldNames.BUSINESSSTARTDATE]: Yup.string().required(),
    [fieldNames.SUPPLIERDUEAMOUNT]: Yup.string().required(),
    [fieldNames.BUSINESSSECTOR]: Yup.string().required(),
    [fieldNames.BUSINESSLEGALNUMBER]: Yup.string().required(),

    [fieldNames.DIRECTORINFO]: Yup.array()
      .of(
        Yup.object().shape({
          [directorFieldNames.NATUREOFCONTROL]: Yup.string().nullable(true),
          [directorFieldNames.TOTALSHARECOUNT]: Yup.string().nullable(true),
          [directorFieldNames.SHAREHOLDERDOBFULLFORMAT]:
            Yup.string().nullable(true),
          [directorFieldNames.POSTALCODE]: Yup.string().nullable(true),
          [directorFieldNames.ADDRESS]: Yup.string().nullable(true),
          [directorFieldNames.HOUSE_NUMBER]: Yup.string().nullable(true),
          [directorFieldNames.HOUSE_NAME]: Yup.string().nullable(true),
          [directorFieldNames.STREET]: Yup.string().nullable(true),
          [directorFieldNames.COUNTY]: Yup.string().nullable(true),
          [directorFieldNames.TOWN]: Yup.string().nullable(true),
          [directorFieldNames.RESIDENTIALSTATUS]: Yup.string().nullable(true),
          [directorFieldNames.LIVINGSINCE]: Yup.string().nullable(true),
          [directorFieldNames.FIRSTNAME]: Yup.string().nullable(true),
          [directorFieldNames.LASTNAME]: Yup.string().nullable(true),
          [directorFieldNames.PHONENUMBER]: Yup.string().nullable(true),
          [directorFieldNames.EMAIL]: Yup.string().nullable(true),
          [directorFieldNames.ISPRIMARY]: Yup.string().nullable(true),
          [directorFieldNames.CHOOSEADDRESS]: Yup.string().nullable(true),
          [directorFieldNames.ADDRESSLINE1]: Yup.string().nullable(true),
          [directorFieldNames.ADDRESSLINE2]: Yup.string().nullable(true),
        })
      )
      .nullable(true),
  });

  const generateDirectorArray = (data) => {
    if (data) {
      let list = [...data];

      if (list.length) {
        let updatedList = [];
        list.forEach((item) => {
          if (
            item["resigned_on"] &&
            new Date(item["resigned_on"]) < new Date()
          ) {
            return;
          } else {
            updatedList.push(item);
          }
        });

        updatedList.length > 0 &&
          updatedList.map((item) => {
            let name = item.name && item.name.split(",");
            if (name.length > 1) {
              item[directorFieldNames.FIRSTNAME] = name[1] || "";
              item[directorFieldNames.LASTNAME] = name[0] || "";
            } else if (name.length == 1) {
              item[directorFieldNames.FIRSTNAME] = name[0];
              item[directorFieldNames.LASTNAME] = "";
            } else {
              item[directorFieldNames.FIRSTNAME] =
                item[directorFieldNames.FIRSTNAME];
              item[directorFieldNames.LASTNAME] =
                item[directorFieldNames.LASTNAME];
            }
            if (item["address"]) {
              item[directorFieldNames.POSTALCODE] =
                item["address"]["postal_code"] || "";
              item[directorFieldNames.STREET] =
                item["address"]["address_line_1"] || "";
              item[directorFieldNames.COUNTY] = item["address"]["locality"]
                ? item["address"]["locality"]
                : "";
              item[directorFieldNames.HOUSE_NAME] =
                item["address"]["premises"] || "";
              item[directorFieldNames.HOUSE_NUMBER] = "";
              item[directorFieldNames.TOWN] = item[directorFieldNames.TOWN]
                ? item[directorFieldNames.TOWN]
                : "";
              item[directorFieldNames.RESIDENTIALSTATUS] = "";
              if (item["address"][directorFieldNames.ADDRESSLINE1]) {
                item[directorFieldNames.ADDRESSLINE1] =
                  item["address"][directorFieldNames.ADDRESSLINE1];
              }
              if (item["address"][directorFieldNames.ADDRESSLINE2]) {
                item[directorFieldNames.ADDRESSLINE2] =
                  item["address"][directorFieldNames.ADDRESSLINE2];
              }
            }

            item[directorFieldNames.LIVINGSINCE] = "";
            item[directorFieldNames.NATUREOFCONTROL] = "";
            item[directorFieldNames.EMAIL] = item["email"] ? item["email"] : "";
            item[directorFieldNames.PHONENUMBER] = item["phone"]
              ? item["phone"]
              : item[directorFieldNames.PHONENUMBER];
            item[directorFieldNames.TOTALSHARECOUNT] = item["share_count"]
              ? item["share_count"]
              : "";

            item[directorFieldNames.CHOOSEADDRESS] = "";
            if (updatedList.length > 1) {
              if (item[directorFieldNames.ISPRIMARY] == 1) {
                item[directorFieldNames.ISPRIMARY] = true;
              } else {
                item[directorFieldNames.ISPRIMARY] = false;
              }
            } else {
              item[directorFieldNames.ISPRIMARY] = true;
            }

            item[directorFieldNames.RESIDENTIALSTATUS] =
              item[directorFieldNames.RESIDENTIALSTATUS];

            if (item["date_of_birth"]) {
              item[directorFieldNames.SHAREHOLDERDOBFULLFORMAT] =
                item["date_of_birth"]["year"] +
                "-" +
                item["date_of_birth"]["month"] +
                "-" +
                item["date_of_birth"]["day"]
                  ? item["date_of_birth"]["day"]
                  : 1;
            }
            delete item["address"];
            delete item["appointed_on"];
            delete item["links"];
            delete item["date_of_birth"];
            delete item["occupation"];
            delete item["nationality"];
            delete item["resigned_on"];
            delete item["officer_role"];
            delete item["country_of_residence"];
            delete item["identification"];

            item["HiddenShareHolderId"] = "";
            item["notified_on"] = "";
            item["is_active"] = 1;

            return item;
          });

        let newList = [...updatedList];
        newList.sort((item) => {
          if (item["is_primary"]) {
            return item["is_primary"] ? -1 : 1; // `false` values first
          } else {
            return item;
          }
        });
        setDirectorData(newList);
      }
    }
  };
  const patchDirectorData = (data) => {
    return getDirectorData();
  };

  useEffect(() => {
    if (!storedData) {
      setReviewBusinessData(initialValues);
    }
  }, []);
  const initialValues = {
    [fieldNames.BUSINESSSECTOR]: storedData
      ? storedData[fieldNames.BUSINESSSECTOR]
      : businessSectorList[
          businessSectorList.findIndex(
            (item) => data["lf_business_sector"] == item.value
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
    [fieldNames.BUSINESSLEGALNUMBER]: storedData
      ? storedData["businessLegalNumber"]
      : data["lmc_bi_business_number"],
    [fieldNames.DIRECTORINFO]: patchDirectorData(data),
  };

  return (
    <div className="dashboard-box position-relative card dashboard-card">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (values["directorInfo"] && values["directorInfo"].length) {
            let index = values["directorInfo"].findIndex(
              (item) => item["is_primary"] || item["is_primary"] == 1
            );

            if (index === -1) {
              ToastMessage(
                "It is mandatrory to mark at least one director as primary!",
                "error"
              );
            } else {
              setActiveStep(activeStep + 1);
              setDashboardStepNo(activeStep + 1);
            }
          } else {
            setActiveStep(activeStep + 1);
            setDashboardStepNo(activeStep + 1);
          }

          // setActiveStep(activeStep + 1);
          // setDashboardStepNo(activeStep + 1);
          // }

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
                      onChange={(selectedOption) => {
                        setFieldValue(
                          fieldNames.BUSINESSSECTOR,
                          selectedOption
                        );
                      }}
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
                      }}
                      value={values[fieldNames.BUSINESSSTARTDATE]}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Monthly Card Takings</label>

                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-pound-sign"></i>
                        </span>
                      </div>
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
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Business Invoiced</label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-pound-sign"></i>
                        </span>
                      </div>
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
              {
                <div className="row">
                  <div className="col-md-12">
                    <div className="director-panel">
                      {values.directorInfo &&
                        values.directorInfo.length > 0 && (
                          <h4>Directors of Business Name</h4>
                        )}

                      {
                        <FieldArray
                          name={fieldNames.DIRECTORINFO}
                          render={(arrayHelpers) => (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary bg-app-primary"
                                onClick={() => {
                                  if (
                                    values.directorInfo &&
                                    values.directorInfo.length > 0
                                  ) {
                                    arrayHelpers.insert(
                                      values.directorInfo.length + 1,
                                      initialDirectorObject
                                    );
                                  } else {
                                    initialDirectorObject[
                                      directorFieldNames.ISPRIMARY
                                    ] = true;
                                    arrayHelpers.insert(
                                      0,
                                      initialDirectorObject
                                    );
                                  }
                                  setDirectorData(values["directorInfo"]);
                                }}
                              >
                                Add Director
                              </button>
                              {values.directorInfo &&
                                values.directorInfo.length > 0 &&
                                values.directorInfo.map((item, index) => (
                                  <Accordion
                                    title={
                                      item[directorFieldNames.FIRSTNAME] +
                                      " " +
                                      (item[directorFieldNames.LASTNAME]
                                        ? item[directorFieldNames.LASTNAME]
                                        : "")
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
                                              onChange={(e) => {
                                                values.directorInfo.forEach(
                                                  (item, i) => {
                                                    if (index == i) {
                                                      setFieldValue(
                                                        `${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.ISPRIMARY}`,
                                                        e.target.checked
                                                      );
                                                    } else {
                                                      setFieldValue(
                                                        `${fieldNames.DIRECTORINFO}.${i}.${directorFieldNames.ISPRIMARY}`,
                                                        false
                                                      );
                                                    }
                                                  }
                                                );
                                              }}
                                              checked={
                                                item[
                                                  directorFieldNames.ISPRIMARY
                                                ]
                                              }
                                              onBlur={() => {
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
                                              }}
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
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
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
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
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
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
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
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
                                              }}
                                            />
                                          </div>
                                        </div>

                                        <input
                                          hidden
                                          type="text"
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.ADDRESSLINE1}`}
                                          onChange={handleChange}
                                          value={
                                            item[
                                              directorFieldNames.ADDRESSLINE1
                                            ]
                                          }
                                          className="form-control"
                                          placeholder="% of Total Share Count"
                                          onBlur={() => {
                                            setDirectorData(
                                              values["directorInfo"]
                                            );
                                          }}
                                        />

                                        <input
                                          type="text"
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.ADDRESSLINE2}`}
                                          onChange={handleChange}
                                          hidden
                                          value={
                                            item[
                                              directorFieldNames.ADDRESSLINE2
                                            ]
                                          }
                                          className="form-control"
                                          placeholder="% of Total Share Count"
                                          onBlur={() => {
                                            setDirectorData(
                                              values["directorInfo"]
                                            );
                                          }}
                                        />
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>Email Address</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Email Address"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.EMAIL}`}
                                              onChange={handleChange}
                                              value={
                                                item[directorFieldNames.EMAIL]
                                              }
                                              onBlur={() => {
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
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
                                                  `${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.PHONENUMBER}`,
                                                  phone
                                                );
                                              }}
                                              onBlur={() => {
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
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
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.SHAREHOLDERDOBFULLFORMAT}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames
                                                    .SHAREHOLDERDOBFULLFORMAT
                                                ]
                                              }
                                              onBlur={() => {
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label>POSTALCODE</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="POSTALCODE"
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.POSTALCODE}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames.POSTALCODE
                                                ]
                                              }
                                              onBlur={() => {
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-3" hidden>
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
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
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
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.HOUSE_NUMBER}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames
                                                    .HOUSE_NUMBER
                                                ]
                                              }
                                              onBlur={() => {
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
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
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.HOUSE_NAME}`}
                                              onChange={handleChange}
                                              value={
                                                item[
                                                  directorFieldNames.HOUSE_NAME
                                                ]
                                              }
                                              onBlur={() => {
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
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
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
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
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
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
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
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
                                                  `${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.RESIDENTIALSTATUS}`,
                                                  selectedOption
                                                )
                                              }
                                              name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.RESIDENTIALSTATUS}`}
                                              options={residentialStatusList}
                                              menuPortalTarget={document.body}
                                              menuPosition={"fixed"}
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
                                                item[
                                                  directorFieldNames
                                                    .RESIDENTIALSTATUS
                                                ]
                                              }
                                              onBlur={() => {
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
                                              }}
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
                                                setDirectorData(
                                                  values["directorInfo"]
                                                );
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
                      }

                      {/* <Accordion title="Joanna Kii"></Accordion>
                    <Accordion title="Cajetan Kii"></Accordion> */}
                    </div>
                  </div>
                </div>
              }
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

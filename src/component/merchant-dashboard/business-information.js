import React from "react";
import Header from "../header/header";
import { fieldNames } from "../requestaquote/components/application-information";
import SiderBarMenu from "./component/sidebar";
import Select from "react-select";
import clsx from "clsx";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import {
  businessSectorList,
  getCompanyInfo,
} from "../requestaquote/components/business-information";
import { Formik } from "formik";
import { FieldArray } from "formik";
import { useState } from "react";
import { getDashboardData, updateUpdateCustomerInfo } from "../../request";
import { useEffect } from "react";
import { getUserDetails } from "../login/loginpage";
import { directorFieldNames, residentialStatusList } from "../Constants";
import StickyBox from "react-sticky-box";
import { ToastMessage } from "../ToastMessage";
import Loaderspinner from "../loader";
import { useAppSelector } from "../../redux/hooks/hooks";

const Accordion = ({ title, children, isPrimary }) => {
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
            style={{
              backgroundColor: "#198754",
              pointerEvents: "none",
            }}
            type="button"
          >
            Primary
          </button>
        )}
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

function BusinessInformation() {
  const [directorList, setDirectorList] = useState([]);

  const validationSchema = Yup.object().shape({
    [fieldNames.CARDPAYMENTAMOUNT]: Yup.number().required(),
    [fieldNames.BUSINESSSTARTDATE]: Yup.string().required(),
    [fieldNames.SUPPLIERDUEAMOUNT]: Yup.string().required(),
    [fieldNames.BUSINESSSECTOR]: Yup.string().required(),
    [fieldNames.BUSINESSLEGALNUMBER]: Yup.string().required(),

    [fieldNames.DIRECTORINFO]: Yup.array().of(
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
        [directorFieldNames.EMAILID]: Yup.string().nullable(true),
        [directorFieldNames.ISPRIMARY]: Yup.string().nullable(true),
        [directorFieldNames.CHOOSEADDRESS]: Yup.string().nullable(true),
        [directorFieldNames.ADDRESSLINE1]: Yup.string().nullable(true),
        [directorFieldNames.ADDRESSLINE2]: Yup.string().nullable(true),
        [directorFieldNames.HIDDENSHAREHOLDERID]: Yup.number().nullable(true),
      })
    ),
  });

  const [dasboardData, setDashboardData] = useState();
  const userDetails = getUserDetails();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  const getData = () => {
    if (userDetails && userDetails.lead_id) {
      getDashboardData(userDetails.lead_id).then((resp) => {
        setDashboardData(resp.records[0]);
        setDirectorList(resp.records[0]["ShareHolderList"]);
      });
    }
  };

  const patchDirectorData = (data) => {
    let values = directorList;
    if (values && values.length) {
      values = directorList.map((item) => {
        // let name = item.name.split(",");
        item["fullName"] = item["firstName"];
        item["lastName"] = item["lastName"];
        if (item["address"]) {
          item[directorFieldNames.POSTCODE] =
            item["address"][directorFieldNames.POSTCODE];
          item[directorFieldNames.STREET] = item["address"]["address_line_1"];
          item[directorFieldNames.COUNTY] = item["address"]["locality"];

          item[directorFieldNames.TOWN] = "";
        }
        item[directorFieldNames.RESIDENTIALSTATUS] =
          residentialStatusList[
            residentialStatusList.findIndex(
              (data) => item["residentialStatus"] == data.value
            )
          ];

        item[directorFieldNames.HOUSE_NAME] = item["houseName"] || "";
        item[directorFieldNames.HOUSE_NUMBER] = item["houseNumber"];

        if (item["living_since"]) {
          let splittedDate = item["living_since"].split("/");
          let date = `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`;
          item[directorFieldNames.LIVINGSINCE] = date || "";
        }
        item[directorFieldNames.NATUREOFCONTROL] = item["natures_of_control"];
        item[directorFieldNames.EMAILID] = item[directorFieldNames.EMAILID];
        item[directorFieldNames.PHONENUMBER] = item["phonenumber"]
          ? item["phonenumber"]
          : "";
        item[directorFieldNames.TOTALSHARECOUNT] = item["share_count"]
          ? item["share_count"]
          : "";

        if (values.length > 1) {
          item[directorFieldNames.ISPRIMARY] =
            item[directorFieldNames.ISPRIMARY] == 1 ? true : false;
        } else {
          item[directorFieldNames.ISPRIMARY] = true;
        }

        item[directorFieldNames.CHOOSEADDRESS] = "";
        item[directorFieldNames.HIDDENSHAREHOLDERID] = item["shareHolderID"];

        item[directorFieldNames.SHAREHOLDERDOBFULLFORMAT] =
          item["DOB_year"] + "-" + item["DOB_month"] + "-" + item["DOB_day"];
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
    return values;
  };

  const initialValues = {
    [fieldNames.BUSINESSSECTOR]: dasboardData
      ? businessSectorList[
          businessSectorList.findIndex(
            (item) => dasboardData.lf_business_sector == item.value
          )
        ]
      : "",
    [fieldNames.BUSINESSSTARTDATE]: dasboardData
      ? dasboardData["AppBusinessStartDate"]
      : "",

    [fieldNames.CARDPAYMENTAMOUNT]: dasboardData
      ? dasboardData["lf_monthly_credit_card_volume"]
      : "",
    [fieldNames.SUPPLIERDUEAMOUNT]: dasboardData
      ? dasboardData["AppCurrentValueOverdueInvoices"]
      : "",
    [fieldNames.BUSINESSLEGALNUMBER]: dasboardData
      ? dasboardData["lmc_bi_business_number"]
      : "",
    [fieldNames.DIRECTORINFO]: patchDirectorData(dasboardData),
  };

  const updateDirectorInfo = (payload, id, resetForm) => {
    updateUpdateCustomerInfo(payload, id)
      .then((resp) => {
        setLoading(false);
        if (resp.isSuccess == 1) {
          ToastMessage("Data saved successfully!", "success");
          resetForm({});
          getData();
        } else {
          ToastMessage("Something went wrong!", "error");
        }
      })
      .catch((err) => {
        setLoading(false);
        ToastMessage("Something went wrong!", "error");
      });
  };

  const generateDirectorListPayload = (data) => {
    if (data != null) {
      let data1 = data.map((item) => {
        let day = "";
        let month = "";
        let year = "";

        if (item["ShareHolderDOBFullFormat"]) {
          let splitDate = item["ShareHolderDOBFullFormat"].split("-");
          day = splitDate[2];
          month = splitDate[1];
          year = splitDate[0];
        }
        return {
          kindofShareHolder: "",
          HiddenShareHolderId:
            item[directorFieldNames.HIDDENSHAREHOLDERID] || "",
          natures_of_control: item[directorFieldNames.NATUREOFCONTROL] || "",
          fullName: item[directorFieldNames.FIRSTNAME],
          lastName: item[directorFieldNames.LASTNAME],
          DOB_day: day || "",
          DOB_month: month || "",
          DOB_year: year || "",
          ShareHolderDOBFullFormat: item["ShareHolderDOBFullFormat"],
          address_line_1: item["address_line_1"] || "",
          address_line_2: item["address_line_2"] || "",
          postal_code: item[directorFieldNames.POSTALCODE] || "",
          notified_on: "",
          phon_number: item[directorFieldNames.PHONENUMBER] || "",
          email: item[directorFieldNames.EMAILID],
          residentialStatus: item[directorFieldNames.RESIDENTIALSTATUS]
            ? item[directorFieldNames.RESIDENTIALSTATUS]["value"]
            : "",
          is_primary: item[directorFieldNames.ISPRIMARY] ? "1" : "0",
          house_number: item[directorFieldNames.HOUSE_NUMBER] || "",
          house_name: item[directorFieldNames.HOUSE_NAME] || "",
          county: item[directorFieldNames.COUNTY] || "",
          town: item[directorFieldNames.TOWN] || "",
          livingSince: item[directorFieldNames.LIVINGSINCE] || "",
          is_active: "1",
          street: item[directorFieldNames.STREET] || "",
          companyName: "undefined",
        };
      });
      return data1;
    }
  };

  return (
    <div className="dashboard-panel">
      <Header />
      <div className="dashboard-body bg-change-color">
        <div className="container-fluid  merchant-body">
          <div
            style={{ display: "flex", alignItems: "flex-start", width: "100%" }}
          >
            <StickyBox>
              <SiderBarMenu />
            </StickyBox>

            <div className="right-panel-main">
              <h3>
                <i className="fas fa-user-tie" aria-hidden="true"></i> Business
                Information
              </h3>
              <div className="dashboard-box position-relative card dashboard-card">
                {!dasboardData ? (
                  <Loaderspinner size="45px" />
                ) : (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      let payload = { ...values };
                      payload["businessSector"] =
                        payload["businessSector"].value;
                      // payload["ShareHolderArr"] = payload["directorInfo"];
                      payload["ShareHolderArr"] = generateDirectorListPayload(
                        payload["directorInfo"]
                      );
                      delete payload["directorInfo"];

                      if (
                        payload["ShareHolderArr"] &&
                        payload["ShareHolderArr"].length
                      ) {
                        let index = payload["ShareHolderArr"].findIndex(
                          (item) => item["is_primary"] == 1
                        );
                        if (index === -1) {
                          ToastMessage(
                            "It is mandatrory to mark at least one director as primary!",
                            "error"
                          );
                        } else {
                          updateDirectorInfo(
                            payload,
                            userDetails["lead_id"],
                            resetForm
                          );
                        }
                      } else {
                        updateDirectorInfo(
                          payload,
                          userDetails["lead_id"],
                          resetForm
                        );

                        setTimeout(() => {
                          setSubmitting(false);
                        }, 400);
                      }
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                      setFieldValue,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="review-application">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>Business Sector</label>
                                <Select
                                  closeMenuOnSelect={true}
                                  onChange={(selectedOption) =>
                                    setFieldValue(
                                      fieldNames.BUSINESSSECTOR,
                                      selectedOption
                                    )
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
                                  value={values[fieldNames.BUSINESSSTARTDATE]}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>Monthly Card Takings</label>
                                <div className="input-group mb-3">
                                  <div className="input-group-prepend">
                                    <span
                                      className="input-group-text"
                                      id="basic-addon1"
                                    >
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
                                          touched[
                                            fieldNames.CARDPAYMENTAMOUNT
                                          ] &&
                                          errors[fieldNames.CARDPAYMENTAMOUNT],
                                      },
                                      {
                                        "is-valid":
                                          touched[
                                            fieldNames.CARDPAYMENTAMOUNT
                                          ] &&
                                          !errors[fieldNames.CARDPAYMENTAMOUNT],
                                      }
                                    )}
                                    onChange={handleChange}
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
                                    <span
                                      className="input-group-text"
                                      id="basic-addon1"
                                    >
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
                                          touched[
                                            fieldNames.SUPPLIERDUEAMOUNT
                                          ] &&
                                          errors[fieldNames.SUPPLIERDUEAMOUNT],
                                      },
                                      {
                                        "is-valid":
                                          touched[
                                            fieldNames.SUPPLIERDUEAMOUNT
                                          ] &&
                                          !errors[fieldNames.SUPPLIERDUEAMOUNT],
                                      }
                                    )}
                                    min="0"
                                    onChange={handleChange}
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
                                        touched[
                                          fieldNames.BUSINESSLEGALNUMBER
                                        ] &&
                                        errors[fieldNames.BUSINESSLEGALNUMBER],
                                    },
                                    {
                                      "is-valid":
                                        touched[
                                          fieldNames.BUSINESSLEGALNUMBER
                                        ] &&
                                        !errors[fieldNames.BUSINESSLEGALNUMBER],
                                    }
                                  )}
                                  min="0"
                                  onChange={handleChange}
                                  value={values[fieldNames.BUSINESSLEGALNUMBER]}
                                />
                              </div>
                            </div>
                          </div>
                          {values.directorInfo &&
                            values.directorInfo.length > 0 && (
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="director-panel">
                                    <h4>Directors of Business Name</h4>
                                    <FieldArray
                                      name={fieldNames.DIRECTORINFO}
                                      render={(arrayHelpers) => (
                                        <>
                                          {values.directorInfo &&
                                            values.directorInfo.length > 0 &&
                                            values.directorInfo.map(
                                              (item, index) => (
                                                <Accordion
                                                  title={
                                                    item[
                                                      directorFieldNames
                                                        .FIRSTNAME
                                                    ] +
                                                      " " +
                                                      item[
                                                        directorFieldNames
                                                          .LASTNAME
                                                      ] || ""
                                                  }
                                                  key={index}
                                                  isPrimary={
                                                    item[
                                                      directorFieldNames
                                                        .ISPRIMARY
                                                    ]
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
                                                                  if (
                                                                    index == i
                                                                  ) {
                                                                    setFieldValue(
                                                                      `${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.ISPRIMARY}`,
                                                                      e.target
                                                                        .checked
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
                                                                directorFieldNames
                                                                  .ISPRIMARY
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
                                                          <label>
                                                            First Name
                                                          </label>
                                                          <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Joana"
                                                            name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.FIRSTNAME}`}
                                                            onChange={
                                                              handleChange
                                                            }
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .FIRSTNAME
                                                              ]
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="col-md-3">
                                                        <div className="form-group">
                                                          <label>
                                                            Last Name
                                                          </label>
                                                          <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Last Name"
                                                            name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.LASTNAME}`}
                                                            onChange={
                                                              handleChange
                                                            }
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .LASTNAME
                                                              ]
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="col-md-3">
                                                        <div className="form-group">
                                                          <label>
                                                            Nature of Control
                                                          </label>
                                                          <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Nature of Control"
                                                            name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.NATUREOFCONTROL}`}
                                                            onChange={
                                                              handleChange
                                                            }
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .NATUREOFCONTROL
                                                              ]
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="col-md-3">
                                                        <div className="form-group">
                                                          <label>
                                                            % of Total Share
                                                            Count
                                                          </label>
                                                          <input
                                                            type="text"
                                                            name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.TOTALSHARECOUNT}`}
                                                            onChange={
                                                              handleChange
                                                            }
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .TOTALSHARECOUNT
                                                              ]
                                                            }
                                                            className="form-control"
                                                            placeholder="% of Total Share Count"
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="col-md-3">
                                                        <div className="form-group">
                                                          <label>
                                                            Email Address
                                                          </label>
                                                          <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Email Address"
                                                            name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.EMAILID}`}
                                                            onChange={
                                                              handleChange
                                                            }
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .EMAILID
                                                              ]
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="col-md-3">
                                                        <div className="form-group">
                                                          <label>Phone</label>

                                                          <PhoneInput
                                                            name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.PHONENUMBER}`}
                                                            country={"gb"}
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .PHONENUMBER
                                                              ]
                                                            }
                                                            inputStyle={
                                                              touched[
                                                                directorFieldNames
                                                                  .PHONENUMBER
                                                              ] &&
                                                              errors[
                                                                directorFieldNames
                                                                  .PHONENUMBER
                                                              ] && {
                                                                borderColor:
                                                                  "red",
                                                              }
                                                            }
                                                            onChange={(
                                                              phone
                                                            ) => {
                                                              setFieldValue(
                                                                `${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.PHONENUMBER}`,
                                                                phone
                                                              );
                                                            }}
                                                            inputClass={"w-100"}
                                                            placeholder="Enter Phone Number"
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="col-md-3">
                                                        <div className="form-group">
                                                          <label>
                                                            Date of Birth
                                                          </label>
                                                          <input
                                                            type="date"
                                                            className="form-control"
                                                            placeholder="04/11/2022"
                                                            name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.SHAREHOLDERDOBFULLFORMAT}`}
                                                            onChange={
                                                              handleChange
                                                            }
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .SHAREHOLDERDOBFULLFORMAT
                                                              ]
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="col-md-3">
                                                        <div className="form-group">
                                                          <label>
                                                            POSTALCODE
                                                          </label>
                                                          <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="POSTALCODE"
                                                            name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.POSTALCODE}`}
                                                            onChange={
                                                              handleChange
                                                            }
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .POSTALCODE
                                                              ]
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                      <div
                                                        className="col-md-3"
                                                        hidden
                                                      >
                                                        <div className="form-group">
                                                          <label>
                                                            Choose Address
                                                          </label>

                                                          <select
                                                            class="form-select form-control"
                                                            aria-label="Default select example"
                                                            name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.CHOOSEADDRESS}`}
                                                            onChange={
                                                              handleChange
                                                            }
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .CHOOSEADDRESS
                                                              ]
                                                            }
                                                          >
                                                            <option
                                                              selected
                                                              disabled
                                                            >
                                                              Choose Address
                                                            </option>
                                                          </select>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <input
                                                      hidden
                                                      type="text"
                                                      name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.ADDRESSLINE1}`}
                                                      onChange={handleChange}
                                                      value={
                                                        item[
                                                          directorFieldNames
                                                            .ADDRESSLINE1
                                                        ]
                                                      }
                                                      className="form-control"
                                                      placeholder="% of Total Share Count"
                                                    />

                                                    <input
                                                      type="text"
                                                      name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.ADDRESSLINE2}`}
                                                      onChange={handleChange}
                                                      hidden
                                                      value={
                                                        item[
                                                          directorFieldNames
                                                            .ADDRESSLINE2
                                                        ]
                                                      }
                                                      className="form-control"
                                                      placeholder="% of Total Share Count"
                                                    />

                                                    <input
                                                      type="text"
                                                      name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.HIDDENSHAREHOLDERID}`}
                                                      onChange={handleChange}
                                                      hidden
                                                      value={
                                                        item[
                                                          directorFieldNames
                                                            .HIDDENSHAREHOLDERID
                                                        ]
                                                      }
                                                      className="form-control"
                                                      placeholder="% of Total Share Count"
                                                    />
                                                    <div className="row">
                                                      <div className="col-md-3">
                                                        <div className="form-group">
                                                          <label>
                                                            House Number
                                                          </label>
                                                          <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="House Number"
                                                            name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.HOUSE_NUMBER}`}
                                                            onChange={
                                                              handleChange
                                                            }
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .HOUSE_NUMBER
                                                              ]
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="col-md-3">
                                                        <div className="form-group">
                                                          <label>
                                                            House Name
                                                          </label>
                                                          <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="House Name"
                                                            name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.HOUSE_NAME}`}
                                                            onChange={
                                                              handleChange
                                                            }
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .HOUSE_NAME
                                                              ]
                                                            }
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
                                                            onChange={
                                                              handleChange
                                                            }
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .STREET
                                                              ]
                                                            }
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
                                                            onChange={
                                                              handleChange
                                                            }
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .COUNTY
                                                              ]
                                                            }
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
                                                            onChange={
                                                              handleChange
                                                            }
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .TOWN
                                                              ]
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="col-md-3">
                                                        <div className="form-group">
                                                          <label>
                                                            Residential Status
                                                          </label>

                                                          <Select
                                                            closeMenuOnSelect={
                                                              true
                                                            }
                                                            onChange={(
                                                              selectedOption
                                                            ) =>
                                                              setFieldValue(
                                                                `${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.RESIDENTIALSTATUS}`,
                                                                selectedOption
                                                              )
                                                            }
                                                            name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.RESIDENTIALSTATUS}`}
                                                            options={
                                                              residentialStatusList
                                                            }
                                                            menuPortalTarget={
                                                              document.body
                                                            }
                                                            menuPosition={
                                                              "fixed"
                                                            }
                                                            placeholder="Select Residential Status"
                                                            styles={{
                                                              control: (
                                                                styles,
                                                                state
                                                              ) => {
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
                                                              menuPortal: (
                                                                base
                                                              ) => ({
                                                                ...base,
                                                                zIndex: 9999,
                                                              }),
                                                            }}
                                                            components={{
                                                              IndicatorSeparator:
                                                                () => null,
                                                            }}
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .RESIDENTIALSTATUS
                                                              ]
                                                            }
                                                            onBlur={() => {
                                                              // setDirectorData(
                                                              //   values["directorInfo"]
                                                              // );
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="col-md-3">
                                                        <div className="form-group">
                                                          <label>
                                                            Living Since
                                                          </label>
                                                          <input
                                                            type="date"
                                                            className="form-control"
                                                            placeholder="Living Since"
                                                            name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.LIVINGSINCE}`}
                                                            onChange={
                                                              handleChange
                                                            }
                                                            value={
                                                              item[
                                                                directorFieldNames
                                                                  .LIVINGSINCE
                                                              ]
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </Accordion>
                                              )
                                            )}
                                        </>
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                        <button
                          className="btn btn-primary save-btn next-btn"
                          type="submit"
                          disabled={loading}
                        >
                          Save <i className="fa fa-file-image-o"></i>
                        </button>
                      </form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessInformation;

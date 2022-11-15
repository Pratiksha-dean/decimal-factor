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
import {
  getDashboardData,
  getDirectorList,
  updateUpdateCustomerInfo,
} from "../../request";
import { useEffect } from "react";
import { getUserDetails } from "../login/loginpage";
import { directorFieldNames, residentialStatusList } from "../Constants";
import StickyBox from "react-sticky-box";
import { ToastMessage } from "../ToastMessage";
import { generateDirectorListPayload } from "../requestaquote/components/personal-details";
// import { setMerchantDirectorData } from "../dashboard/component/review-business-information";

export const setMerchantDirectorData = (data) => {
  localStorage.setItem("merchantDirectorData", JSON.stringify(data));
};

export const getMerchantDirectorData = () => {
  return JSON.parse(localStorage.getItem("merchantDirectorData"));
};

const Accordion = ({ title, children }) => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <div className="accordion-wrapper">
      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
      >
        {title}
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

function BusinessInformation() {
  const storedData = {};
  const data = {};
  const companyInfo = getCompanyInfo();

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
        [directorFieldNames.EMAIL]: Yup.string().nullable(true),
        [directorFieldNames.ISPRIMARY]: Yup.string().nullable(true),
        [directorFieldNames.CHOOSEADDRESS]: Yup.string().nullable(true),
        [directorFieldNames.ADDRESSLINE1]: Yup.string().nullable(true),
        [directorFieldNames.ADDRESSLINE2]: Yup.string().nullable(true),
      })
    ),
  });

  const [dasboardData, setDashboardData] = useState();
  const userDetails = getUserDetails();
  const [loading, setLoading] = useState(false);

  console.log(initialValues);

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  const getData = () => {
    if (userDetails && userDetails.lead_id) {
      getDashboardData(userDetails.lead_id).then((resp) => {
        setDashboardData(resp.records[0]);
        setDirectorList(resp.records[0]["ShareHolderList"]);
        console.log("dashboarddara", dasboardData);
      });
    }
  };

  // useEffect(() => {
  //   if (companyInfo && companyInfo["company_number"]) {
  //     getDirectorList(companyInfo["company_number"]).then((resp) => {
  //       setDirectorList(resp.items);
  //     });
  //   }
  // }, []);

  const patchDirectorData = (data) => {
    let values = directorList;
    console.log("directorList", directorList);

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
          item[directorFieldNames.HOUSENAME] = item["address"]["premises"];
          item[directorFieldNames.HOUSENUMBER] = "";
          item[directorFieldNames.TOWN] = "";
          item[directorFieldNames.RESIDENTIALSTATUS] = "";
        }
        item[directorFieldNames.LIVINGSINCE] = "";
        item[directorFieldNames.NATUREOFCONTROL] = "";
        item[directorFieldNames.EMAIL] = item["email"] ? item["email"] : "";
        item[directorFieldNames.PHONENUMBER] = item["phone"]
          ? item["phone"]
          : "";
        item[directorFieldNames.TOTALSHARECOUNT] = item["share_count"]
          ? item["share_count"]
          : "";

        item[directorFieldNames.ISPRIMARY] = false;
        item[directorFieldNames.CHOOSEADDRESS] = "";

        // if (item["date_of_birth"]) {
        item[directorFieldNames.SHAREHOLDERDOBFULLFORMAT] =
          item["DOB_year"] + "-" + item["DOB_month"] + "-" + item["DOB_day"];
        // }

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
  console.log(initialValues);

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
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  enableReinitialize
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    let payload = { ...values };
                    payload["businessSector"] = payload["businessSector"].value;
                    // payload["ShareHolderArr"] = payload["directorInfo"];
                    payload["ShareHolderArr"] = generateDirectorListPayload(
                      payload["directorInfo"]
                    );
                    delete payload["directorInfo"];
                    // return;
                    updateUpdateCustomerInfo(payload, userDetails["lead_id"])
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
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Business Sector</label>
                              <Select
                                closeMenuOnSelect={true}
                                onBlur={() => {
                                  // setReviewBusinessData(values);
                                }}
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
                                onBlur={() => {
                                  // setReviewBusinessData(values);
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
                                    // setReviewBusinessData(values);
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
                                    // setReviewBusinessData(values);
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
                                  // setReviewBusinessData(values);
                                }}
                                value={values[fieldNames.BUSINESSLEGALNUMBER]}
                              />
                            </div>
                          </div>
                        </div>
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
                                      values.directorInfo.map((item, index) => (
                                        <Accordion
                                          title={
                                            item["firstName"] +
                                              " " +
                                              item[
                                                directorFieldNames.LASTNAME
                                              ] || ""
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
                                                  <label>First Name</label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Joana"
                                                    name={`${fieldNames.DIRECTORINFO}.${index}.${directorFieldNames.FIRSTNAME}`}
                                                    onChange={handleChange}
                                                    value={
                                                      item[
                                                        directorFieldNames
                                                          .FIRSTNAME
                                                      ]
                                                    }
                                                    onBlur={() => {
                                                      setMerchantDirectorData(
                                                        values
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
                                                        directorFieldNames
                                                          .LASTNAME
                                                      ]
                                                    }
                                                    onBlur={() => {
                                                      setMerchantDirectorData(
                                                        values
                                                      );
                                                    }}
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
                                                    onChange={handleChange}
                                                    value={
                                                      item[
                                                        directorFieldNames
                                                          .NATUREOFCONTROL
                                                      ]
                                                    }
                                                    onBlur={() => {
                                                      setMerchantDirectorData(
                                                        values
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
                                                      setMerchantDirectorData(
                                                        values
                                                      );
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
                                                      item[
                                                        directorFieldNames
                                                          .EMAILID
                                                      ]
                                                    }
                                                    onBlur={() => {
                                                      setMerchantDirectorData(
                                                        values
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
                                                  {
                                                    item[
                                                      directorFieldNames
                                                        .PHONENUMBER
                                                    ]
                                                  }

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
                                                      setMerchantDirectorData(
                                                        values
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
                                                      setMerchantDirectorData(
                                                        values
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
                                                        directorFieldNames
                                                          .POSTALCODE
                                                      ]
                                                    }
                                                    onBlur={() => {
                                                      setMerchantDirectorData(
                                                        values
                                                      );
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
                                                      setMerchantDirectorData(
                                                        values
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
                                                      setMerchantDirectorData(
                                                        values
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
                                                        directorFieldNames
                                                          .HOUSE_NAME
                                                      ]
                                                    }
                                                    onBlur={() => {
                                                      setMerchantDirectorData(
                                                        values
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
                                                      item[
                                                        directorFieldNames
                                                          .STREET
                                                      ]
                                                    }
                                                    onBlur={() => {
                                                      setMerchantDirectorData(
                                                        values
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
                                                      item[
                                                        directorFieldNames
                                                          .COUNTY
                                                      ]
                                                    }
                                                    onBlur={() => {
                                                      setMerchantDirectorData(
                                                        values
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
                                                      item[
                                                        directorFieldNames.TOWN
                                                      ]
                                                    }
                                                    onBlur={() => {
                                                      setMerchantDirectorData(
                                                        values
                                                      );
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-3">
                                                <div className="form-group">
                                                  <label>
                                                    Residential Status
                                                  </label>
                                                  <Select
                                                    // menuIsOpen={true}
                                                    closeMenuOnSelect={true}
                                                    onChange={(
                                                      selectedOption
                                                    ) =>
                                                      setFieldValue(
                                                        directorFieldNames.RESIDENTIALSTATUS,
                                                        selectedOption
                                                      )
                                                    }
                                                    name={
                                                      directorFieldNames.RESIDENTIALSTATUS
                                                    }
                                                    options={
                                                      residentialStatusList
                                                    }
                                                    // menuPortalTarget={document.getElementById(
                                                    //   `accordian${index}`
                                                    // )}
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
                                                      menuPortal: (base) => ({
                                                        ...base,
                                                        zIndex: 9999,
                                                      }),
                                                    }}
                                                    components={{
                                                      IndicatorSeparator: () =>
                                                        null,
                                                    }}
                                                    value={
                                                      values[
                                                        directorFieldNames
                                                          .RESIDENTIALSTATUS
                                                      ]
                                                    }
                                                    onBlur={() => {
                                                      setMerchantDirectorData(
                                                        values
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
                                                        directorFieldNames
                                                          .LIVINGSINCE
                                                      ]
                                                    }
                                                    onBlur={() => {
                                                      setMerchantDirectorData(
                                                        values
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
                            </div>
                          </div>
                        </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessInformation;

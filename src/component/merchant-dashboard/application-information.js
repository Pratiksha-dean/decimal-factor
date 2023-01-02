import { Formik } from "formik";
import React from "react";
import clsx from "clsx";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import Header from "../header/header";
import SiderBarMenu from "./component/sidebar";
import {
  businessEntityList,
  checkCompanyType,
  fieldNames,
  loadOptions,
  loadPurposeList,
  validationSchema,
} from "../requestaquote/components/application-information";
import { useState } from "react";
import { getUserDetails } from "../login/loginpage";
import { getDashboardData, updateUpdateCustomerInfo } from "../../request";
import { useEffect } from "react";
import StickyBox from "react-sticky-box";
import { ToastMessage } from "../ToastMessage";
import Loaderspinner from "../loader";
import { useDispatch } from "react-redux/es";
import { TRIGGER_LEAD_DETAILS } from "../../redux/actions/actionTypes";
import { formatNumberInput, numberRegex, removeComma } from "../Constants";

function ApplicationInformation() {
  const [dasboardData, setDashboardData] = useState();
  const userDetails = getUserDetails();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getData = () => {
    if (userDetails && userDetails.lead_id) {
      getDashboardData(userDetails.lead_id).then((resp) => {
        dispatch({
          type: TRIGGER_LEAD_DETAILS,
          leadDetails: resp.records[0],
        });
        setDashboardData(resp.records[0]);
      });
    }
  };

  useEffect(() => {
    getData();

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
            (item) => dasboardData["lf_business_activity"] == item.value
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
          <div
            style={{ display: "flex", alignItems: "flex-start", width: "100%" }}
          >
            <StickyBox>
              <SiderBarMenu />
            </StickyBox>

            <div className="right-panel-main">
              <h3>
                <i className="fa fa-laptop" aria-hidden="true"></i> Application
                Information{" "}
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

                      payload["businessEntity"] =
                        payload["businessEntity"].value;
                      payload["loanPurpose"] = payload["loanPurpose"].value;
                      payload[fieldNames.AMOUNT] = removeComma(
                        payload[fieldNames.AMOUNT]
                      );
                      payload[fieldNames.REQUIREDFUND] = removeComma(
                        payload[fieldNames.REQUIREDFUND]
                      );

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
                      isValid,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="review-application">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>Amount Required</label>
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
                                    onChange={(e) => {
                              
                                      if (e.target.value) {
                                        if (
                                          numberRegex.test(
                                            removeComma(e.target.value)
                                          )
                                        ) {
                                          setFieldValue(
                                            fieldNames.AMOUNT,
                                            e.target.value
                                          );
                                        } else {
                                          setFieldValue(
                                            fieldNames.AMOUNT,
                                            values[fieldNames.AMOUNT]
                                          );
                                        }
                                      } else {
                                        setFieldValue(fieldNames.AMOUNT, "");
                                      }
                                    }}
                                    value={formatNumberInput(
                                      values[fieldNames.AMOUNT]
                                    )}
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
                                    setFieldValue(
                                      fieldNames.LOANPURPOSE,
                                      selectedOption
                                    );
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
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      if (
                                        numberRegex.test(
                                          removeComma(e.target.value)
                                        )
                                      ) {
                                        setFieldValue(
                                          fieldNames.REQUIREDFUND,
                                          e.target.value
                                        );
                                      } else {
                                        setFieldValue(
                                          fieldNames.REQUIREDFUND,
                                          values[fieldNames.REQUIREDFUND]
                                        );
                                      }
                                    } else {
                                      setFieldValue(
                                        fieldNames.REQUIREDFUND,
                                        ""
                                      );
                                    }
                                  }}
                                  value={formatNumberInput(
                                    values[fieldNames.REQUIREDFUND]
                                  )}
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
                                {values[fieldNames.BUSINESSENTITY] && (
                                  <div className="form-group business-entity">
                                    <label>Business Name</label>
                                    {/* <AsyncSelect
                                      closeMenuOnSelect={true}
                                      value={{
                                        label: values[fieldNames.BUSINESSNAME],
                                      }}
                                      name={fieldNames.BUSINESSNAME}
                                      loadOptions={loadOptions}
                                      onChange={(selectedOption) => {
                                        setFieldValue(
                                          fieldNames.BUSINESSNAME,
                                          selectedOption.value
                                        );
                                      }}
                                      components={{
                                        IndicatorSeparator: () => null,
                                        DropdownIndicator: () => null,
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
                                    /> */}
                                    {checkCompanyType(
                                      values[fieldNames.BUSINESSENTITY]
                                    ) ? (
                                      <AsyncSelect
                                        closeMenuOnSelect={true}
                                        value={{
                                          label:
                                            values[fieldNames.BUSINESSNAME],
                                        }}
                                        name={fieldNames.BUSINESSNAME}
                                        loadOptions={loadOptions}
                                        onChange={(selectedOption) => {
                                          setFieldValue(
                                            fieldNames.BUSINESSNAME,
                                            selectedOption.value
                                          );
                                        }}
                                        components={{
                                          IndicatorSeparator: () => null,
                                          DropdownIndicator: () => null,
                                        }}
                                        placeholder="Select Business Name"
                                        styles={{
                                          control: (styles, state) => {
                                            const borderColor =
                                              !state.hasValue &&
                                              touched[
                                                fieldNames.BUSINESSNAME
                                              ] &&
                                              errors[fieldNames.BUSINESSNAME]
                                                ? "red"
                                                : "#ced4da";

                                            return { ...styles, borderColor };
                                          },
                                        }}
                                      />
                                    ) : (
                                      <input
                                        type="text"
                                        placeholder="Enter Business Name"
                                        name={fieldNames.BUSINESSNAME}
                                        onChange={handleChange}
                                        onBlur={(e) => {
                                          // setApplicationInfo(values);
                                        }}
                                        value={values[fieldNames.BUSINESSNAME]}
                                        className={clsx(
                                          "form-control ",
                                          {
                                            "is-invalid":
                                              touched[
                                                fieldNames.BUSINESSNAME
                                              ] &&
                                              errors[fieldNames.BUSINESSNAME],
                                          },
                                          {
                                            "is-valid":
                                              touched[
                                                fieldNames.BUSINESSNAME
                                              ] &&
                                              !errors[fieldNames.BUSINESSNAME],
                                          }
                                        )}
                                      />
                                    )}
                                  </div>
                                )}
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
                        </div>
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

export default ApplicationInformation;

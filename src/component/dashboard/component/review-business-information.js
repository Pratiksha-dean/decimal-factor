import { FieldArray, Formik } from "formik/dist";
import React from "react";
import { fieldNames } from "../../requestaquote/components/application-information";
import { businessSectorList } from "../../requestaquote/components/business-information";
import Select from "react-select";
import clsx from "clsx";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import { setDashboardStepNo } from "../dashboard";

export const setReviewBusinessData = (data) => {
  localStorage.setItem("reviewBusinessInfo", JSON.stringify(data));
};

export const getReviewBusinessData = () => {
  return JSON.parse(localStorage.getItem("reviewBusinessInfo"));
};

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
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

function ReviewBusinessInformation({ data, setActiveStep, activeStep }) {
  const storedData = getReviewBusinessData();

  const validationSchema = Yup.object().shape({
    [fieldNames.CARDPAYMENTAMOUNT]: Yup.number().required(),
    [fieldNames.BUSINESSSTARTDATE]: Yup.string().required(),
    [fieldNames.SUPPLIERDUEAMOUNT]: Yup.string().required(),
    [fieldNames.BUSINESSSECTOR]: Yup.string().required(),

    [fieldNames.DIRECTORINFO]: Yup.array().of(
      Yup.object().shape({
        [fieldNames.NATUREOFCONTROL]: Yup.string(),
        [fieldNames.TOTALSHARECOUNT]: Yup.string(),
        [fieldNames.DATEOFBIRTH]: Yup.string(),
        [fieldNames.POSTCODE]: Yup.string(),
        [fieldNames.ADDRESS]: Yup.string(),
        [fieldNames.HOUSENUMBER]: Yup.string(),
        [fieldNames.HOUSENAME]: Yup.string(),
        [fieldNames.STREET]: Yup.string(),
        [fieldNames.COUNTY]: Yup.string(),
        [fieldNames.TOWN]: Yup.string(),
        [fieldNames.RESIDENTIALSTATUS]: Yup.string(),
        [fieldNames.LIVINGSINCE]: Yup.string(),
        [fieldNames.FIRSTNAME]: Yup.boolean(),
        [fieldNames.LASTNAME]: Yup.string(),
        [fieldNames.PHONENUMBER]: Yup.string(),
        [fieldNames.EMAILID]: Yup.string(),
      })
    ),
  });
  const patchDirectorData = (data) => {
    let values = data["ShareHolderList"];

    if (values && values.length) {
      values = values.map((item) => {
        item[fieldNames.DATEOFBIRTH] =
          item["DOB_year"] + "-" + item["DOB_month"] + "-" + item["DOB_day"];
        return item;
      });
    }

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
    [fieldNames.BUSINESSLEGALNUMBER]: storedData
      ? storedData[fieldNames.BUSINESSLEGALNUMBER]
      : "",
    [fieldNames.DIRECTORINFO]: patchDirectorData(data),
  };

  // lf_monthly_credit_card_volume;
  // AppCurrentValueOverdueInvoices;

  return (
    <div className="dashboard-box position-relative card dashboard-card">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
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
                                isPrimary={item[fieldNames.ISPRIMARY]}
                              >
                                <div className="director-field">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <input
                                          type="checkbox"
                                          className="primary-checkbox"
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.ISPRIMARY}`}
                                          onChange={handleChange}
                                          value={item[fieldNames.ISPRIMARY]}
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
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.FIRSTNAME}`}
                                          onChange={handleChange}
                                          value={item[fieldNames.FIRSTNAME]}
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
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.LASTNAME}`}
                                          onChange={handleChange}
                                          value={item[fieldNames.LASTNAME]}
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
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.NATUREOFCONTROL}`}
                                          onChange={handleChange}
                                          value={
                                            item[fieldNames.NATUREOFCONTROL]
                                          }
                                          onBlur={() => {
                                            setReviewBusinessData(values);
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="form-group">
                                        <label>% of Total Share Count</label>
                                        <input
                                          type="text"
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.TOTALSHARECOUNT}`}
                                          onChange={handleChange}
                                          value={
                                            item[fieldNames.TOTALSHARECOUNT]
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
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.EMAILID}`}
                                          onChange={handleChange}
                                          value={item[fieldNames.EMAILID]}
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
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.PHONENUMBER}`}
                                          country={"gb"}
                                          value={item[fieldNames.PHONENUMBER]}
                                          inputStyle={
                                            touched[fieldNames.PHONENUMBER] &&
                                            errors[fieldNames.PHONENUMBER] && {
                                              borderColor: "red",
                                            }
                                          }
                                          onChange={(phone) => {
                                            setFieldValue(
                                              fieldNames.DIRECTORINFO[index][
                                                fieldNames.PHONENUMBER
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
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.DATEOFBIRTH}`}
                                          onChange={handleChange}
                                          value={item[fieldNames.DATEOFBIRTH]}
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
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.POSTCODE}`}
                                          onChange={handleChange}
                                          value={item[fieldNames.POSTCODE]}
                                          onBlur={() => {
                                            setReviewBusinessData(values);
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="form-group">
                                        <label>Choose Address</label>
                                        <input
                                          type="text"
                                          name="Choose Address"
                                          className="form-control"
                                          placeholder="Choose Address"
                                        />
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
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.HOUSENUMBER}`}
                                          onChange={handleChange}
                                          value={item[fieldNames.HOUSENUMBER]}
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
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.HOUSENAME}`}
                                          onChange={handleChange}
                                          value={item[fieldNames.HOUSENAME]}
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
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.STREET}`}
                                          onChange={handleChange}
                                          value={item[fieldNames.STREET]}
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
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.COUNTY}`}
                                          onChange={handleChange}
                                          value={item[fieldNames.COUNTY]}
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
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.TOWN}`}
                                          onChange={handleChange}
                                          value={item[fieldNames.TOWN]}
                                          onBlur={() => {
                                            setReviewBusinessData(values);
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="form-group">
                                        <label>Residential Status</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Residential Status"
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.RESIDENTIALSTATUS}`}
                                          onChange={handleChange}
                                          value={
                                            item[fieldNames.RESIDENTIALSTATUS]
                                          }
                                          onBlur={() => {
                                            setReviewBusinessData(values);
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="form-group">
                                        <label>Living Since</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Living Since"
                                          name={`${fieldNames.DIRECTORINFO}.${index}.${fieldNames.LIVINGSINCE}`}
                                          onChange={handleChange}
                                          value={item[fieldNames.LIVINGSINCE]}
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

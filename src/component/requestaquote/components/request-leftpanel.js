import React, { useEffect, useState } from "react";

export const getStepNo = () => {
  let step = JSON.parse(localStorage.getItem("stepNumber"));
  if (step == null) {
    localStorage.setItem("stepNumber", 1);
  }
  console.log(
    "🚀 ~ file: request-leftpanel.js ~ line 5 ~ getStepNo ~ step",
    step
  );
  return JSON.parse(localStorage.getItem("stepNumber"));
};

export const setStepNo = (no) => {
  localStorage.setItem("stepNumber", no);
};

export const setDirection = (direction) => {
  localStorage.setItem("direction", direction);
};

export const getDirection = () => {
  let direction = localStorage.getItem("direction");
  if (direction == null) {
    localStorage.setItem("direction", "forward");
  }
  return localStorage.getItem("direction");
};
export const stepsList = [
  {
    label: "Application Information",
    value: 1,
  },
  {
    label: "Business Information",
    value: 2,
  },
  {
    label: "Personal Details",
    value: 3,
  },
  {
    label: "Confirmation",
    value: 4,
  },
];
function RequestLeftPanel({ step, setStep }) {
  const direction = getDirection();

  const successCheck = () => {
    return (
      <img
        src={require("../../../images/success_check.png")}
        alt=""
        height={"20px"}
        style={{
          position: "absolute",
          top: "-6px",
          left: "-6px",
        }}
      />
    );
  };

  return (
    <div className="left-panel">
      <div className="logo-panel">
        <img src={require("../../../images/logo.png")} alt="" />
      </div>
      <h3>Request a Quote</h3>
      <h4>
        Step {step} of {stepsList.length}
      </h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <ul id="progressbar">
        {stepsList.map((item, i) => {
          return (
            <li
              className={direction === "forward" && step > i ? "active" : ""}
              // onClick={() => {
              //   setStepNo(item.value);
              //   setStep(item.value);
              // }}
              key={i}
            >
              <span>
                <i className="fa-solid fa-floppy-disk"></i>
                {direction === "forward" &&
                  step > i &&
                  step != i + 1 &&
                  successCheck()}
              </span>

              <strong className="tab-content">{item.label}</strong>
            </li>
          );
        })}
        {/* <li
          className={step === stepNo ? "active" : ""}
          onClick={() => {
            setStepNo(1);
            setStep(1);
          }}
        >
          <span>
            <i className="fa-solid fa-floppy-disk"></i>
          </span>
          <strong className="tab-content">Application Information</strong>
        </li>
        <li
          className={step == stepNo ? "active" : ""}
          onClick={() => {
            setStepNo(2);
            setStep(2);
          }}
        >
          <span>
            <i className="fa-solid fa-floppy-disk"></i>
          </span>
          <strong className="tab-content">Business Information</strong>
        </li>
        <li
          className={step == stepNo ? "active" : ""}
          onClick={() => {
            setStepNo(3);
            setStep(3);
          }}
        >
          <span>
            <i className="fa-solid fa-floppy-disk"></i>
          </span>
          <strong className="tab-content">Personal Details</strong>
        </li>
        <li
          className={step == stepNo ? "active" : ""}
          onClick={() => {
            setStepNo(4);
            setStep(4);
          }}
        >
          <span>
            <i className="fa-solid fa-floppy-disk"></i>
          </span>
          <strong className="tab-content">Confirmation</strong>
        </li> */}
      </ul>
      {/* <div className="email-id-col">
        <Link href="mailt0:info@decimalfactor.com"><i className="fa fa-envelope"></i> info@decimalfactor.com</Link>
      </div> */}
    </div>
  );
}

export default RequestLeftPanel;

import React, { useEffect, useState } from "react";
import RequestLeftPanel, {
  getStepNo,
  setStepNo,
  stepsList,
} from "./components/request-leftpanel";
import "../../styles/master.css";
import ApplicationInformation from "./components/application-information";
import BusinessInformation from "./components/business-information";
import PersonalDetails from "./components/personal-details";
import Confirmation from "./components/confirmation";
import ConfirmationModal from "./components/confirmation-modal";
import clsx from "clsx";

function RequestAQuote() {
  const stepNo = getStepNo();

  const [step, setStep] = useState(stepNo);

  useEffect(() => {
    if (stepNo == null) {
      setStepNo(1);
    }
  }, []);

  const showSelectedState = (step) => {
    let component;
    switch (step) {
      case 1:
        component = (
          <ApplicationInformation
            showSelectedState={showSelectedState}
            setStep={setStep}
          />
        );
        break;
      case 2:
        component = (
          <BusinessInformation
            showSelectedState={showSelectedState}
            setStep={setStep}
          />
        );
        break;
      case 3:
        component = (
          <PersonalDetails
            showSelectedState={showSelectedState}
            setStep={setStep}
          />
        );
        break;
      case 4:
        component = (
          <Confirmation
            showSelectedState={showSelectedState}
            setStep={setStep}
          />
        );
        break;
    }
    return component;
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row main-request">
          <div className="col-md-4 left-panel-box">
            <RequestLeftPanel setStep={setStep} step={step} />
          </div>
          <div className="col-md-8 request-right">
            {/* <ApplicationInformation /> */}

            {showSelectedState(getStepNo())}
            {/* <BusinessInformation /> */}
            {/* <PersonalDetails />
            <Confirmation />
            <ConfirmationModal /> */}
            <ul className="steps-right">
              {stepsList.map((item, i) => {
                return (
                  <li
                    key={i}
                    className={clsx({
                      active: stepNo == item.value,
                    })}
                  />
                );
              })}
            </ul>
            <div className="copyright">
              <p>© Copyright 2022 | decimalFactor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestAQuote;

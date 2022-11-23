import React from "react";
import "../../styles/master.css";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import Header from "../header/header";
import ReviewApplicationInformation from "./component/review-application-information";
import ReviewBusinessInformation from "./component/review-business-information";
import ReviewPersonalDetails from "./component/review-personal-details";
import LinkBankingAccounting from "./component/link-banking&accounting";
import ProvideConsent from "./component/provide-consent";
import VerifyAlert from "./component/verify-alert";
import { useEffect } from "react";
import { getDashboardData } from "../../request";
import { useState } from "react";
import { getUserDetails } from "../login/loginpage";
import { Stepper, Step } from "react-form-stepper";
import StepWizard from "react-step-wizard";
import { isAuthenticated } from "../authentication/authentication";
import { useNavigate } from "react-router-dom/dist";
import { useDispatch } from "react-redux/es";
import { TRIGGER_LEAD_DETAILS } from "../../redux/actions/actionTypes";
import { useAppSelector } from "../../redux/hooks/hooks";

function onFormSubmit() {}

export const setDashboardStepNo = (no) => {
  localStorage.setItem("dashboardStepNumber", no);
};

export const setReviewAppData = (data) => {
  localStorage.setItem("reviewAppInfo", JSON.stringify(data));
};

export const getReviewAppData = () => {
  return JSON.parse(localStorage.getItem("reviewAppInfo"));
};

export const getDashboardStepNo = () => {
  let stepNo = localStorage.getItem("dashboardStepNumber");
  if (!stepNo) {
    localStorage.setItem("dashboardStepNumber", 0);
  }
  return Number(localStorage.getItem("dashboardStepNumber"));
};

function Dashboard() {
  const [dasboardData, setDashboardData] = useState();

  const [isFormValid, setIsFormValid] = useState();
  const [stepNumber, setStepNumber] = useState();
  const [stepWizard, setStepWizard] = useState(null);
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const userDetails = getUserDetails();
  useEffect(() => {
    getData();

    if (userDetails["navigation_type"] == "left") {
      naviagte("/merchant-health");
    }

    return () => {};
  }, []);

  const getData = () => {
    if (userDetails && userDetails.lead_id) {
      getDashboardData(userDetails.lead_id).then((resp) => {
        setDashboardData(resp.records[0]);
        dispatch({
          type: TRIGGER_LEAD_DETAILS,
          leadDetails: resp.records[0],
        });
      });
    }
  };

  const steps = [
    {
      label: "Review Application information",
      name: "Review Application information",
      children1: <ReviewApplicationInformation data={dasboardData} />,
      current: 1,
    },
    {
      label: "Review Business Information",
      name: "Review Business Information",
      children1: <ReviewBusinessInformation data={dasboardData} />,
    },
    {
      label: "Review Personal Details",
      name: "Review Personal Details",
      children1: <ReviewPersonalDetails data={dasboardData} />,
    },
    {
      label: "Link Banking & Accounting",
      left: "0%",
      name: "Link Banking & Accounting",
      children1: <LinkBankingAccounting />,
    },
    {
      label: "Provide consent",
      width: "20%",
      name: "Provide consent",
      children1: <ProvideConsent />,
    },
  ];

  const stepNo = getDashboardStepNo();

  const [activeStep, setActiveStep] = useState(stepNo);

  const assignStepWizard = (instance) => {
    setStepWizard(instance);
  };

  const showComponents = (step) => {
    console.log(
      "🚀 ~ file: dashboard.js ~ line 104 ~ showComponents ~ step",
      step
    );
    let component;
    switch (step) {
      case 0:
        component = (
          <ReviewApplicationInformation
            data={dasboardData}
            setActiveStep={setActiveStep}
            activeStep={activeStep}
          />
        );
        break;
      case 1:
        component = (
          <ReviewBusinessInformation
            data={dasboardData}
            setActiveStep={setActiveStep}
            activeStep={activeStep}
          />
        );
        break;
      case 2:
        component = (
          <ReviewPersonalDetails
            data={dasboardData}
            setActiveStep={setActiveStep}
            activeStep={activeStep}
          />
        );
        break;
      case 3:
        component = (
          <LinkBankingAccounting
            data={dasboardData}
            setActiveStep={setActiveStep}
            activeStep={activeStep}
            request={getData}
          />
        );
        break;
      case 4:
        component = (
          <ProvideConsent
            setActiveStep={setActiveStep}
            activeStep={activeStep}
          />
        );
        break;
    }
    return component;
  };

  const handleStepChange = (e) => {
    setActiveStep(e.activeStep - 1);
  };
  return (
    <div className="App">
      <div className="dashboard-panel">
        <Header />
        <div className="dashboard-body">
          <div className="container">
            <div className="verify-panel dashboard-panel-div">
              {dasboardData && (
                <>
                  {activeStep == 0 && <VerifyAlert />}

                  <Stepper
                    activeStep={activeStep}
                    steps={steps}
                    stepClassName="stepper"
                  />

                  {showComponents(activeStep)}
                  <StepWizard
                    instance={assignStepWizard}
                    onStepChange={handleStepChange}
                  ></StepWizard>
                  {/* <StepProgressBar
                    startingStep={0}
                    onSubmit={onFormSubmit}
                    labelClass={"titlelabel"}
                    nextBtnName={"Next >"}
                    previousBtnName={"< Back"}
                    buttonWrapperClass={"buttonsdiv"}
                    wrapperClass={"stepswrapperClass"}
                    stepClass={"stepClassdiv"}
                    steps={[
                      {
                        label: "Review Application information",
                        name: "Review Application information",
                        content: (
                          <ReviewApplicationInformation
                            data={dasboardData}
                            setIsFormValid={step1Validator}
                          />
                        ),
                        validator: step1Validator,
                        current: 1,
                      },
                      {
                        label: "Review Business Information",
                        name: "Review Business Information",
                        content: (
                          <ReviewBusinessInformation data={dasboardData} />
                        ),
                      },
                      {
                        label: "Review Personal Details",
                        name: "Review Personal Details",
                        content: <ReviewPersonalDetails data={dasboardData} />,
                      },
                      {
                        label: "Link Banking & Accounting",
                        left: "0%",
                        name: "Link Banking & Accounting",
                        content: <LinkBankingAccounting />,
                      },
                      {
                        label: "Provide consent",
                        width: "20%",
                        name: "Provide consent",
                        content: <ProvideConsent />,
                      },
                    ]}
                  /> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

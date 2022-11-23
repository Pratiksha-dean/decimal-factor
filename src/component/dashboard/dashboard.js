import React from "react";
import "../../styles/master.css";
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
import { useNavigate } from "react-router-dom/dist";
import { useDispatch } from "react-redux/es";
import { TRIGGER_LEAD_DETAILS } from "../../redux/actions/actionTypes";

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
  const stepNo = getDashboardStepNo();
  const [activeStep, setActiveStep] = useState(stepNo);
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
    },
    {
      label: "Review Business Information",
      name: "Review Business Information",
    },
    {
      label: "Review Personal Details",
      name: "Review Personal Details",
    },
    {
      label: "Link Banking & Accounting",
      left: "0%",
      name: "Link Banking & Accounting",
    },
    {
      label: "Provide consent",
      width: "20%",
      name: "Provide consent",
    },
  ];

  const showComponents = (step) => {
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

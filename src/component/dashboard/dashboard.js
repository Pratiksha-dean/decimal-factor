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

function onFormSubmit() {
}

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
  return localStorage.getItem("dashboardStepNumber");
};

function Dashboard() {
  const [dasboardData, setDashboardData] = useState();
  const [isFormValid, setIsFormValid] = useState();
  const [stepNumber, setStepNumber] = useState();
  const userDetails = getUserDetails();
  useEffect(() => {
    getDashboardData(userDetails.lead_id).then((resp) => {
      setDashboardData(resp.records[0]);
    });

    return () => {};
  }, []);

  function step1Validator(value) {
    console.log(
      "🚀 ~ file: dashboard.js ~ line 51 ~ step1Validator ~ value",
      value
    );
    // let isSubmitting = false;
    // if (
    //   document.getElementById("submit-btn-verify-app-info") &&
    //   !isSubmitting
    // ) {
    //   document.getElementById("submit-btn-verify-app-info").click();
    //   isSubmitting = true;
    // }
    // return value;

    return true;
  }

  return (
    <div className="App">
      <div className="dashboard-panel">
        <Header />
        <div className="dashboard-body">
          <div className="container">
            <div className="verify-panel">
              {dasboardData && (
                <>
                  <VerifyAlert />
                  <StepProgressBar
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
                  />
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

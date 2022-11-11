import React from "react";
import "../../styles/master.css";
import "react-step-progress/dist/index.css";
import Header from "../header/header";
import InnerChangePassword from "./inner-change-password";

function ChangePasswordWrapper() {
  return (
    <div className="App">
      <div className="dashboard-panel">
        <Header />
        <div className="dashboard-body">
          <div className="">
            <div className="verify-panel" style={{ paddingTop: "60px" }}>
              <InnerChangePassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordWrapper;

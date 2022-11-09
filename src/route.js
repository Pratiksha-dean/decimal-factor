import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RequestAQuote from "./component/requestaquote/requestaquote";
import Login, { getToken } from "./component/login/loginpage";
import Authentication from "./component/authentication/authentication";
import ForgotPassword from "./component/forgot/forgot-password";
import MerchantDashboard from "./component/merchant-dashboard/merchant-dashboard";
import Dashboard from "./component/dashboard/dashboard";
import MerchantHealth from "./component/merchant-dashboard/merchant-health";
import ApplicationInformation from "./component/merchant-dashboard/application-information";
import BusinessInformation from "./component/merchant-dashboard/business-information";
import PersonalDetails from "./component/merchant-dashboard/personal-details";
import EmailVerification from "./component/email-verification/email-verification";
import ChangePassword from "./component/change-password/change-password";
import InnerChangePassword from "./component/change-password/inner-change-password";

const RoutePage = () => {
 

  return (
    <Routes>
   
          <Route path="/*" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
          <Route path="/merchant-health" element={<MerchantHealth />} />
          <Route
            path="/application-information"
            element={<ApplicationInformation />}
          />
          <Route
            path="/business-information"
            element={<BusinessInformation />}
          />
          <Route path="/personal-details" element={<PersonalDetails />} />
          <Route path="/change-password" element={<ChangePassword /> } />
          <Route path="/inner-change-password" element={<InnerChangePassword /> } />
          <Route path="/*" element={<RequestAQuote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify/:token" element={<EmailVerification />} />
        
     
    </Routes>
  );
};

export default RoutePage;

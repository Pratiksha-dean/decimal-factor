import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RequestAQuote from "./component/requestaquote/requestaquote";
import Login, { getToken } from "./component/login/loginpage";
import Authentication from "./component/authentication/authentication";
import ForgotPassword from "./component/forgot/forgot-password";
import Dashboard from "./component/dashboard/dashboard";
import MerchantDashboard from "./component/merchant-dashboard/merchant-dashboard";
import EmailVerification from "./component/email-verification/email-verification";

const RoutePage = () => {
  const token = getToken();
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

  return (
    <Routes>
      {isAuthenticated && token ? (
        <>
          <Route path="/*" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
        </>
      ) : (
        <>
          <Route path="/*" element={<RequestAQuote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify/:token" element={<EmailVerification />} />
        </>
      )}
    </Routes>
  );
};

export default RoutePage;

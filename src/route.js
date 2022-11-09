import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
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

const RoutePage = () => {
  const token = getToken();
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

  const PrivateRoute = ({ children }) => {
    let token = getToken();
    let isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
    if (
      (!token && !isAuthenticated) ||
      (token == null && isAuthenticated == null)
    ) {
      return <Navigate to="/login" />;
    } else if (token && isAuthenticated) {
      return (
        <>
          {/* <AppSidebar /> */} {/* your other components */}
          {children}
        </>
      );
    } else {
      return <Navigate to="/authentication" />;
    }
  };

  const ProtectedRoute = ({ children }) => {
    let token = getToken();
    let isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
    if (token && isAuthenticated) {
      return <Navigate to="/dashboard" />;
    } else if (token == null && isAuthenticated == null) {
      return <Navigate to="/login" />;
    } else {
      return (
        <>
          {/* <AppSidebar /> */} {/* your other components */}
          {children}
        </>
      );
    }
  };

  const PublicRoute = ({ children }) => {
    let token = localStorage.getItem("token");
    if (token !== "" && token !== null && isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }
    return <>{children}</>;
  };

  return (
    <Routes>
      {/* {isAuthenticated && token ? (
        <>
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
        </>
      ) : (
        <>
          <Route path="/*" element={<Navigate to="/login" />} />
          <Route path="/request-a-quote" element={<RequestAQuote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify/:token" element={<EmailVerification />} />
        </>
      )}
      <Route path="/authentication" element={<Authentication />} /> */}
      <Route
        path="/*"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/request-a-quote"
        element={
          <PublicRoute>
            <RequestAQuote />
          </PublicRoute>
        }
      />

      <Route
        path="/verify/:token"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/authentication"
        element={
          <ProtectedRoute>
            <Authentication />
          </ProtectedRoute>
        }
      />

      <Route
        path="/merchant-dashboard"
        element={
          <PrivateRoute>
            <MerchantDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/application-information"
        element={
          <PrivateRoute>
            <ApplicationInformation />
          </PrivateRoute>
        }
      />

      <Route
        path="/business-information"
        element={
          <PrivateRoute>
            <BusinessInformation />
          </PrivateRoute>
        }
      />

      <Route
        path="/personal-details"
        element={
          <PrivateRoute>
            <PersonalDetails />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default RoutePage;

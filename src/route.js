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
import ChangePassword from "./component/change-password/change-password";
import InnerChangePassword from "./component/change-password/inner-change-password";
import NoData from "./component/no-data";

const RoutePage = () => {
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
    let isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

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
          <Route path="/change-password" element={<ChangePassword /> } />
          <Route path="/inner-change-password" element={<InnerChangePassword /> } />
          <Route path="/no-data" element={<NoData />} />
          <Route path="/*" element={<RequestAQuote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify/:token" element={<EmailVerification />} />
        </>
      )}
      <Route path="/authentication" element={<Authentication />} /> */}
      <Route
        path="/*"
        exact
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/verify/:token"
        element={
          <PublicRoute>
            <EmailVerification />
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
        path="/reset/:token"
        element={
          <PublicRoute>
            <ChangePassword />
          </PublicRoute>
        }
        exact
      />

      <Route
        path="/change-password"
        element={
          <PrivateRoute>
            <InnerChangePassword />
          </PrivateRoute>
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
        path="/merchant-health"
        element={
          <PrivateRoute>
            <MerchantHealth />
          </PrivateRoute>
        }
      />

      <Route
        path="/application-information"
        exact
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

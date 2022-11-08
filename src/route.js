import React from 'react';
import { Routes, Route } from "react-router-dom"
import RequestAQuote from "./component/requestaquote/requestaquote"
import Login from './component/login/loginpage'
import Authentication from './component/authentication/authentication'
import ForgotPassword from './component/forgot/forgot-password';
import Dashboard from './component/dashboard/dashboard';
import MerchantHealth from './component/merchant-dashboard/merchant-health';
import ApplicationInformation from './component/merchant-dashboard/application-information'
import BusinessInformation from './component/merchant-dashboard/business-information'
import PersonalDetails from './component/merchant-dashboard/personal-details'

const RoutePage = () => {
  return (

<Routes>
<Route path="/" element={ <RequestAQuote /> } />
<Route path="/login" element={ <Login /> } />
<Route path="/authantication" element={ <Authentication/> } />
<Route path="/forgot-password" element={ <ForgotPassword/> } />
<Route path="/dashboard" element={ <Dashboard/> } />
<Route path="/merchant-health" element={ <MerchantHealth/> } />
<Route path="/application-information" element={ <ApplicationInformation/> } />
<Route path="/business-information" element={ <BusinessInformation/> } />
<Route path="/personal-details" element={ <PersonalDetails/> } />




</Routes>
      
  )
}

export default RoutePage
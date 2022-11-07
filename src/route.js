import React from 'react';
import { Routes, Route } from "react-router-dom"
import RequestAQuote from "./component/requestaquote/requestaquote"
import Login from './component/login/loginpage'
import Authentication from './component/authentication/authentication'
import ForgotPassword from './component/forgot/forgot-password';
import Dashboard from './component/dashboard/dashboard';
import MerchantDashboard from './component/merchant-dashboard/merchant-dashboard';

const RoutePage = () => {
  return (

<Routes>
<Route path="/" element={ <RequestAQuote /> } />
<Route path="/login" element={ <Login /> } />
<Route path="/authantication" element={ <Authentication/> } />
<Route path="/forgot-password" element={ <ForgotPassword/> } />
<Route path="/dashboard" element={ <Dashboard/> } />
<Route path="/merchant-dashboard" element={ <MerchantDashboard/> } />

</Routes>
      
  )
}

export default RoutePage
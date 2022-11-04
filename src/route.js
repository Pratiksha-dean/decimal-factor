import React from 'react';
import { Routes, Route } from "react-router-dom"
import RequestAQuote from "./component/requestaquote/requestaquote"
import Login from './component/login/loginpage'
import Authentication from './component/authentication/authentication'
import ForgotPassword from './component/forgot/forgot-password';

const RoutePage = () => {
  return (

<Routes>
<Route path="/" element={ <RequestAQuote /> } />
<Route path="/login" element={ <Login /> } />
<Route path="/authantication" element={ <Authentication/> } />
<Route path="/forgot-password" element={ <ForgotPassword/> } />


</Routes>

  )
}

export default RoutePage
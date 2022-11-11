import React from "react";
import RoutePage from "./route";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer />
      <RoutePage />
    </div>
  );
}

export default App;

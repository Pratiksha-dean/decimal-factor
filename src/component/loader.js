import React from "react";
import LoadingSpin from "react-loading-spin";

export default function Loaderspinner({ size = "60px" }) {
  return (
    //  <div className="loader">
    <div className="spinning-loader">
      <LoadingSpin
        duration="2s"
        width="5px"
        timingFunction="ease-in-out"
        direction="alternate"
        size={size}
        primaryColor="rgb(0, 96, 144) rgb(0, 126, 255)"
        secondaryColor=" red rgb(32 149 207)"
        numberOfRotationsInAnimation={2}
      />
    </div>
    //  </div>
  );
}

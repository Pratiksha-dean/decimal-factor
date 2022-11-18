import React from "react";
import LoadingOverlay from 'react-loading-overlay'
import Loaderspinnerinner from './loader-spinner-inner'
export default function Loaderspinner({ active=true, size="60px" }) {
    return (
      <LoadingOverlay
        active={active}
        styles={{}}
        // styles={{overlay: (base) => ({
        //   ...base,
        //   background: 'rgba(100, 100, 100, 100, 0.5)'
        // })}}
        spinner={<Loaderspinnerinner size={size} />}
        // spinner={true}
      >
        {/* {"test"} */}
      </LoadingOverlay>
    )
  }
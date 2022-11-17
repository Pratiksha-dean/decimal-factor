import React from 'react'
import LoadingSpin from "react-loading-spin";


export default function Loaderspinner() {
  return (
   
     <div className="no-data-panel">
       
     <div className="no-data"> 
        <LoadingSpin
            duration="2s"
            width="5px"
            timingFunction="ease-in-out"
            direction="alternate"
            size="30px"
            primaryColor="rgb(0, 96, 144) rgb(0, 126, 255)"
            secondaryColor=" red rgb(32 149 207)"
            numberOfRotationsInAnimation={2}
         />
     
     </div>
     </div>
  )
}

import React from 'react'


export default function NotFound() {
  return (
   
     <div className="no-data-panel">
       
     <div className="no-data">
      
     <img src={require("../images/no-found.png")}  alt=""  className="nofound-img"  />
       <h3>No results found</h3>
       <p>Please try again</p>
     </div>
     </div>
  )
}

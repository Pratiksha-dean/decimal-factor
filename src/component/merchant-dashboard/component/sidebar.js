import React from 'react';
import "../../../styles/master.css";
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';


 



function SiderBarMenu() {
  const { collapseSidebar } = useProSidebar();
  
  return (
  
    <div className="sidebar-panel">
      
      <Sidebar >
        <Menu>
          <MenuItem >  <NavLink to="/merchant-health" ><i className="fa fa-id-card" aria-hidden="true"></i> Merchant Health Insights </NavLink></MenuItem>
          <MenuItem>  <NavLink to="/application-information"><i className="fa fa-laptop" aria-hidden="true"></i> Application Information </NavLink></MenuItem>
          <MenuItem>  <NavLink to="/business-information"><i className="fas fa-user-tie" aria-hidden="true"></i>  Business Information </NavLink></MenuItem>
          <MenuItem>  <NavLink to="/personal-details"><i className="fa fa-user" aria-hidden="true"></i>  Personal Details </NavLink></MenuItem>
        </Menu>
        <p className="bottom-text">decimalFactor &copy; Copyright 2022</p>
      </Sidebar>
      <main>
        <button onClick={() => collapseSidebar()} className="siderbar-btn"><i className="fa fa-chevron-left"></i></button>
      </main>
     
    </div>
   
  );
}

export default SiderBarMenu;

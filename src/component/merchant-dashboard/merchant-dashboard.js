import React from 'react';
import "../../styles/master.css";
import Header from '../header/header';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

 



function MerchantDashboard() {
  const { collapseSidebar } = useProSidebar();
  
  return (
    <div className="App">
     <div className="dashboard-panel">
     <Header />
      <div className="dashboard-body">
      <div className="container-fluid">
      <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar>
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <button onClick={() => collapseSidebar()}>Collapse</button>
      </main>
    </div>
      </div>
      </div>
     </div>
    </div>
  );
}

export default MerchantDashboard;

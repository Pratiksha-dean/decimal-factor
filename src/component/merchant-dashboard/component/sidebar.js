import React, { useState } from "react";
import "../../../styles/master.css";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse } from "react-bootstrap";

function SiderBarMenu() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="sidebar-panel">
      <Sidebar>
        <Menu>
          <MenuItem>
            {" "}
            <NavLink to="/merchant-health">
              <i className="fa fa-id-card" aria-hidden="true"></i>
              {!collapsed && "Financial Health Insights"}
            </NavLink>
          </MenuItem>
          <MenuItem>
            {" "}
            <NavLink to="/application-information">
              <i className="fa fa-laptop" aria-hidden="true"></i>
              {!collapsed && "Application Information"}
            </NavLink>
          </MenuItem>
          <MenuItem>
            {" "}
            <NavLink to="/business-information">
              <i className="fas fa-user-tie" aria-hidden="true"></i>
              {!collapsed && "Business Information"}
            </NavLink>
          </MenuItem>

          <MenuItem>
            {" "}
            <NavLink to="/personal-details">
              <i className="fa fa-user" aria-hidden="true"></i>
              {!collapsed && "Personal Details"}
            </NavLink>
          </MenuItem>
          <SubMenu
            label="Files"
            icon={<i className="fa fa-file" aria-hidden="true" />}
            // open={
            //   (location.pathname == "/upload-files" && open) ||
            //   (location.pathname == "/view-files" && open)
            // }
            // onClick={() => {
            //   console.log(
            //     "🚀 ~ file: sidebar.js:62 ~ SiderBarMenu ~ open",
            //     open
            //   );
            //   setOpen(!open);
            // }}
          >
            <MenuItem
              className="submenu"
              active={location.pathname == "/upload-files"}
            >
              <NavLink
                to="/upload-files"
                onClick={() => {
                  setOpen(true);
                }}
              >
                {" "}
                <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                {!collapsed && "Upload Files"}
              </NavLink>{" "}
            </MenuItem>
            <MenuItem
              className="submenu"
              active={location.pathname == "/view-files"}
            >
              {" "}
              <NavLink to="/view-files">
                <i className="fa fa-eye" aria-hidden="true"></i>
                {!collapsed && "View Files"}
              </NavLink>
            </MenuItem>
          </SubMenu>
        </Menu>
        <p className="bottom-text">decimalFactor &copy; Copyright 2022</p>
      </Sidebar>
      <main>
        <button onClick={() => collapseSidebar()} className="siderbar-btn">
          <i className="fa fa-chevron-left"></i>
        </button>
      </main>
    </div>
  );
}

export default SiderBarMenu;

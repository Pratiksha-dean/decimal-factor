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

export const getSideNavState = () => {
  let state = localStorage.getItem("open");
  if (!state) {
    localStorage.setItem("open", JSON.stringify(false));
  }
};

export const setSideNavState = (state) => {
  localStorage.setItem("open", JSON.stringify(state));
};

function SiderBarMenu() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [open, setOpen] = useState(localStorage.getItem("open"));
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
          {!collapsed ? (
            <SubMenu
              label={collapsed ? "" : "Files"}
              className="submenu-item"
              open={open}
              onClick={() => {
                setOpen(!open);
                setSideNavState(!open);
              }}
              style={{
                backgroundColor:
                  location.pathname == "/upload-files" ||
                  location.pathname == "/view-files"
                    ? "#e2eff4"
                    : "",
                borderLeft:
                  location.pathname == "/upload-files" ||
                  location.pathname == "/view-files"
                    ? "3px solid #006090"
                    : "",
              }}
              icon={<i className="fa fa-file" aria-hidden="true" />}
            >
              <MenuItem
                className="submenu"
                onClick={() => {
                  setSideNavState(true);
                }}
              >
                <NavLink
                  className="sub-menu-item"
                  to="/upload-files"
                  onClick={() => {
                    setSideNavState(true);
                  }}
                >
                  {" "}
                  <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                  {!collapsed && "Upload Files"}
                </NavLink>{" "}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSideNavState(true);
                }}
                className="submenu"
                active={location.pathname == "/view-files"}
              >
                {" "}
                <NavLink
                  to="/view-files"
                  onClick={() => {
                    setSideNavState(true);
                  }}
                >
                  <i className="fa fa-eye" aria-hidden="true"></i>
                  {!collapsed && "View Files"}
                </NavLink>
              </MenuItem>
            </SubMenu>
          ) : (
            <>
              <MenuItem>
                {" "}
                <NavLink to="/upload-files">
                  <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                </NavLink>
              </MenuItem>
              <MenuItem>
                {" "}
                <NavLink to="/view-files">
                  <i className="fa fa-eye" aria-hidden="true"></i>
                </NavLink>
              </MenuItem>
            </>
          )}
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

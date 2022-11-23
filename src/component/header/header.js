import React, { useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch } from "react-redux/es";
import { useLocation, useNavigate } from "react-router-dom/dist";
import {
  TRIGGER_LEAD_DETAILS,
  TRIGGER_USER_DETAILS,
} from "../../redux/actions/actionTypes";
import { useAppSelector } from "../../redux/hooks/hooks";
import { API_URL, getDashboardData, logout } from "../../request";
import { getUserDetails } from "../login/loginpage";

function Header() {
  const navigate = useNavigate();
  // const userDetails = getUserDetails();
  const location = useLocation();
  const { userDetails } = useAppSelector((state) => state.userDetailsReducer);
  const { leadDetails } = useAppSelector((state) => state.leadDetailsReducer);
  const [dasboardData, setDashboardData] = useState();
  const dispatch = useDispatch();

  const logoutUser = () => {
    logout();
    dispatch({
      type: TRIGGER_LEAD_DETAILS,
      leadDetails: {},
    });

    dispatch({
      type: TRIGGER_USER_DETAILS,
      userDetails: {},
    });
    navigate("/login");
  };

  const getData = () => {
    if (userDetails && userDetails.lead_id) {
      getDashboardData(userDetails.lead_id)
        .then((resp) => {
          setDashboardData(resp.records[0]);
        })
        .catch((err) => {
          setDashboardData({});
        });
    }
  };

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  return (
    <header>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <a className="navbar-brand text-light">
            {" "}
            <span className="logo-icon">
              {" "}
              <img
                src={require("../../images/logo-icon.png")}
                alt=""
                className="logo-dashboard"
              />
            </span>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="button-tooltip-2">
                  {dasboardData && dasboardData["lf_business_name"]}
                </Tooltip>
              }
            >
              {({ ref, ...triggerHandler }) => (
                <div
                  className="cursor-pointer company-name"
                  onClick={() => {
                    if (location.pathname != "/dashboard") {
                      navigate("/merchant-health");
                    }
                  }}
                  ref={ref}
                  {...triggerHandler}
                >
                  {/* {dasboardData && dasboardData["lf_business_name"]} */}
                  {leadDetails && leadDetails["lf_business_name"]}
                </div>
              )}
            </OverlayTrigger>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav  navbar-nav-scroll">
              <li className="nav-item">
                <a className="nav-link border-divider"></a>
              </li>

              {location.pathname != "/dashboard" && (
                <li
                  className="nav-item business-btn cursor-pointer"
                  onClick={() => navigate("/merchant-health")}
                >
                  <a
                    className="nav-link cursor-pointer"
                    onClick={() => navigate("/merchant-health")}
                  >
                    My Business{" "}
                  </a>
                </li>
              )}

              <li className="nav-item dropdown float-right">
                <a
                  className="nav-link dropdown-toggle header-dropdown"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userDetails["profile_pic"] ? (
                    <img
                      src={`${API_URL}${userDetails["profile_pic"]}`}
                      alt=""
                      className="user-img"
                    />
                  ) : (
                    <div className="initial-avatar">
                      <div className="initial-avatar-text">
                        {userDetails &&
                          userDetails["first_name"][0].toUpperCase()}
                        {userDetails &&
                          userDetails["last_name"][0].toUpperCase()}
                      </div>
                    </div>
                  )}

                  {userDetails["first_name"]}
                </a>
                <ul className="dropdown-menu">
                  {location.pathname != "/dashboard" && (
                    <li>
                      <a
                        className="dropdown-item cursor-pointer"
                        // href="#"
                        onClick={() => {
                          navigate("/change-password");
                        }}
                      >
                        Change Password
                      </a>
                    </li>
                  )}

                  <li>
                    <a
                      className="dropdown-item"
                      // href="#"
                      onClick={() => logoutUser()}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;

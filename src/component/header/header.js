import React, { useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import {
  ButtonGroup,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
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
  // className="nav-link dropdown-toggle header-dropdown" role="button"
  //   data-toggle="dropdown" ref={ref}
  //   onClick=
  //   {(e) => {
  //     e.preventDefault();
  //     onClick(e);
  //   }}
  //   >

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      className="nav-link dropdown-toggle header-dropdown"
      role="button"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );
  return (
    <header>
      <Navbar expand="sm" bg="dark" variant="dark" className="py-0">
        <div class="container-fluid">
          <Navbar.Brand className="d-flex align-items-center py-0 mr-0">
            {" "}
            <span className="logo-icon">
              {" "}
              <img
                src={require("../../images/logo-icon.png")}
                alt="logo"
                className="logo-dashboard center"
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
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <a className="nav-link border-divider"></a>
              </Nav.Link>
              <Nav.Link>
                {" "}
                <div
                  className="nav-item business-btn cursor-pointer"
                  onClick={() => navigate("/merchant-health")}
                >
                  <a
                    className="nav-link cursor-pointer"
                    onClick={() => navigate("/merchant-health")}
                  >
                    My Business{" "}
                  </a>
                </div>
              </Nav.Link>
              {/* <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav className="dropdown-nav">
              {/* <Nav.Link> */}{" "}
              <Dropdown>
                <Dropdown.Toggle
                  align="end"
                  as={CustomToggle}
                  className="nav-link dropdown-toggle header-dropdown cursor-pointer"
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
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                  <Dropdown.Item eventKey="1">
                    {" "}
                    {location.pathname != "/dashboard" && (
                      <a
                        className="dropdown-item cursor-pointer"
                        // href="#"
                        onClick={() => {
                          navigate("/change-password");
                        }}
                      >
                        Change Password
                      </a>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2">
                    {" "}
                    <a
                      className="dropdown-item"
                      // href="#"
                      onClick={() => logoutUser()}
                    >
                      Logout
                    </a>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
    // <header>
    //   <div className="container-fluid">
    //     <nav className="navbar navbar-expand-lg navbar-dark">
    //       <a className="navbar-brand text-light d-flex">
    //         {" "}
    //         <div className="logo-icon">
    //           {" "}
    //           <img
    //             src={require("../../images/logo-icon.png")}
    //             alt=""
    //             className="logo-dashboard"
    //           />
    //         </div>
    //         <button
    //           className="navbar-toggler"
    //           type="button"
    //           data-toggle="collapse"
    //           data-target="#navbarScroll"
    //           aria-controls="navbarScroll"
    //           aria-expanded="false"
    //           aria-label="Toggle navigation"
    //         >
    //           <span className="navbar-toggler-icon"></span>
    //         </button>
    //         <OverlayTrigger
    //           placement="bottom"
    //           overlay={
    //             <Tooltip id="button-tooltip-2">
    //               {dasboardData && dasboardData["lf_business_name"]}
    //             </Tooltip>
    //           }
    //         >
    //           {({ ref, ...triggerHandler }) => (
    //             <div
    //               className="cursor-pointer company-name"
    //               onClick={() => {
    //                 if (location.pathname != "/dashboard") {
    //                   navigate("/merchant-health");
    //                 }
    //               }}
    //               ref={ref}
    //               {...triggerHandler}
    //             >
    //               {/* {dasboardData && dasboardData["lf_business_name"]} */}
    //               {leadDetails && leadDetails["lf_business_name"]}
    //             </div>
    //           )}
    //         </OverlayTrigger>
    //       </a>
    //       <div className="collapse navbar-collapse" id="navbarScroll">
    //         <ul className="navbar-nav  navbar-nav-scroll">
    //           <li className="nav-item">
    //             <a className="nav-link border-divider"></a>
    //           </li>

    //           {location.pathname != "/dashboard" && (
    //             <li
    //               className="nav-item business-btn cursor-pointer"
    //               onClick={() => navigate("/merchant-health")}
    //             >
    //               <a
    //                 className="nav-link cursor-pointer"
    //                 onClick={() => navigate("/merchant-health")}
    //               >
    //                 My Business{" "}
    //               </a>
    //             </li>
    //           )}
    //           {/*
    //           <li className="nav-item dropdown float-right">
    //             <a
    //               className="nav-link dropdown-toggle header-dropdown"
    //               href="#"
    //               role="button"
    //               data-toggle="dropdown"
    //               aria-expanded="false"
    //             >
    //               {userDetails["profile_pic"] ? (
    //                 <img
    //                   src={`${API_URL}${userDetails["profile_pic"]}`}
    //                   alt=""
    //                   className="user-img"
    //                 />
    //               ) : (
    //                 <div className="initial-avatar">
    //                   <div className="initial-avatar-text">
    //                     {userDetails &&
    //                       userDetails["first_name"][0].toUpperCase()}
    //                     {userDetails &&
    //                       userDetails["last_name"][0].toUpperCase()}
    //                   </div>
    //                 </div>
    //               )}

    //               {userDetails["first_name"]}
    //             </a>
    //             <ul className="dropdown-menu">
    //               {location.pathname != "/dashboard" && (
    //                 <li>
    //                   <a
    //                     className="dropdown-item cursor-pointer"
    //                     // href="#"
    //                     onClick={() => {
    //                       navigate("/change-password");
    //                     }}
    //                   >
    //                     Change Password
    //                   </a>
    //                 </li>
    //               )}

    //               <li>
    //                 <a
    //                   className="dropdown-item"
    //                   // href="#"
    //                   onClick={() => logoutUser()}
    //                 >
    //                   Logout
    //                 </a>
    //               </li>
    //             </ul>
    //           </li> */}
    //         </ul>
    //       </div>

    // <Dropdown>
    //   <Dropdown.Toggle
    //     as={CustomToggle}
    //     className="nav-link dropdown-toggle header-dropdown"
    //   >
    //     {userDetails["profile_pic"] ? (
    //       <img
    //         src={`${API_URL}${userDetails["profile_pic"]}`}
    //         alt=""
    //         className="user-img"
    //       />
    //     ) : (
    //       <div className="initial-avatar">
    //         <div className="initial-avatar-text">
    //           {userDetails && userDetails["first_name"][0].toUpperCase()}
    //           {userDetails && userDetails["last_name"][0].toUpperCase()}
    //         </div>
    //       </div>
    //     )}

    //     {userDetails["first_name"]}
    //   </Dropdown.Toggle>

    //   <Dropdown.Menu as={CustomMenu}>
    //     <Dropdown.Item eventKey="1">
    //       {" "}
    //       {location.pathname != "/dashboard" && (
    //         <a
    //           className="dropdown-item cursor-pointer"
    //           // href="#"
    //           onClick={() => {
    //             navigate("/change-password");
    //           }}
    //         >
    //           Change Password
    //         </a>
    //       )}
    //     </Dropdown.Item>
    //     <Dropdown.Item eventKey="2">
    //       {" "}
    //       <a
    //         className="dropdown-item"
    //         // href="#"
    //         onClick={() => logoutUser()}
    //       >
    //         Logout
    //       </a>
    //     </Dropdown.Item>
    //   </Dropdown.Menu>
    // </Dropdown>
    //     </nav>
    //   </div>
    // </header>
  );
}

export default Header;

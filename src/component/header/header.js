import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import { logout } from "../../request";
import { getUserDetails } from "../login/loginpage";

function Header() {
  const navigate = useNavigate();
  const userDetails = getUserDetails();
  console.log(
    "🚀 ~ file: header.js ~ line 9 ~ Header ~ userDetails",
    userDetails
  );

  const logoutUser = () => {
    console.log("🚀 ~ file: header.js ~ line 11 ~ logoutUser ~ logoutUser");
    logout();
    navigate("/login");
  };

  useEffect(() => {
    window.addEventListener("storage", (e) => {
      // this.setState({ auth: true });
      console.log(
        "🚀 ~ file: header.js ~ line 22 ~ window.addEventListener ~ e",
        e
      );
    });
  }, [userDetails]);
  return (
    <header>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <a className="navbar-brand" href="#">
            {" "}
            <span className="logo-icon">
              {" "}
              <img
                src={require("../../images/logo-icon.png")}
                alt=""
                className="logo-dashboard"
              />
            </span>
            <strong>Business Name</strong>{" "}
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

              <li className="nav-item dropdown float-right">
                <a
                  className="nav-link dropdown-toggle header-dropdown"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* <img
                    src={require("../../images/user.png")}
                    alt=""
                    className="user-img"
                  /> */}
                  <div className="initial-avatar">
                    <div className="initial-avatar-text">
                      {userDetails &&
                        userDetails["first_name"][0].toUpperCase()}
                      {userDetails && userDetails["last_name"][0].toUpperCase()}
                    </div>
                  </div>

                  {userDetails["first_name"]}
                </a>
                <ul className="dropdown-menu">
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

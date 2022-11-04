import React from 'react';



function Header() {
  
  
  return (
    <header>
    <div className="container-fluid">
  <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="#"> <span className="logo-icon">  <img src={require('../../images/logo-icon.png')} alt="" className="logo-dashboard" /></span>
        <strong>Business Name</strong> </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav  navbar-nav-scroll" >
          <li className="nav-item">
          <a className="nav-link border-divider" href="#" ></a>
            </li>
            <li className="nav-item business-btn">
              <a className="nav-link " href="#" >My Business </a>
            </li>
           
            <li className="nav-item dropdown float-right">
             
              <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
              <img src={require('../../images/user.png')} alt="" className="user-img" />
                Kunal
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
               
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

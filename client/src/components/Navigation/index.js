import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import "./Navigation.css";

const Navigation = props => (
  <div className="nav-area">
    {props.authUser ? (
      <div>
        {props.admin ? (
          <NavigationAuthAdmin signOut={props.signOut} />
        ) : (
          <NavigationAuth signOut={props.signOut} />
        )}
      </div>
    ) : (
      <NavigationNonAuth />
    )}
  </div>
);

const NavigationAuth = props => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
    <div className="container-fluid">
      {/* <a className="navbar-brand" href="#"> */}
      <Link className="navbar-brand home-lnk" to={ROUTES.HOME}>
        Photo-Share
      </Link>
      {/* </a> */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to={ROUTES.PICTURES}>Pictures</Link>
          </li>
          <li className="nav-item">
            <Link to={ROUTES.ACCOUNT}>My Profile</Link>
          </li>

          <li className="nav-item">
            <span className="nav-signout" onClick={props.signOut}>
              Sign-Out
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

const NavigationAuthAdmin = props => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark  sticky-top">
    <div className="container-fluid">
      {/* <a className="navbar-brand" href="#"> */}
      <Link className="navbar-brand home-lnk" to={ROUTES.HOME}>
        Photo-Share
      </Link>
      {/* </a> */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to={ROUTES.PICTURES}>Pictures</Link>
          </li>
          <li className="nav-item">
            <Link to={ROUTES.ACCOUNT}>My Profile</Link>
          </li>
          <li className="nav-item">
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>

          <li className="nav-item">
            <span className="nav-signout" onClick={props.signOut}>
              Sign-Out
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

const NavigationNonAuth = () => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
    <div className="container-fluid">
      {/* <a className="navbar-brand" href="#"> */}
      <Link className="navbar-brand home-lnk" to={ROUTES.LANDING}>
        Photo-Share
      </Link>
      {/* </a> */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
      >
        <span className="navbar-toggler-icon button-col" />
      </button>

      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to={ROUTES.SIGNIN}>Sign In</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navigation;

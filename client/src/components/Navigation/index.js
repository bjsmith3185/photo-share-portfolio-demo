import React from 'react';
import { Link } from 'react-router-dom';


import * as ROUTES from '../../constants/routes';

import "./Navigation.css";

const Navigation = (props) => (

  <div>

    {props.authUser ? (

      <div>  {props.admin ? (
        <NavigationAuthAdmin signOut={props.signOut} />
      ) : (
          <NavigationAuth signOut={props.signOut} />

        )}
      </div>)

      : <NavigationNonAuth />
    }

  </div>

);

const NavigationAuth = (props) => (
  <div className="nav-area">
    <span className="nav-link"><Link to={ROUTES.HOME}>Home</Link></span>
    <span className="nav-link"><Link to={ROUTES.PICTURES}>Pictures</Link></span>
    <span className="nav-link"><Link to={ROUTES.ACCOUNT}>My Profile</Link></span>
    <span className="nav-signout" onClick={props.signOut}>Sign-Out</span>
  </div>

);

const NavigationAuthAdmin = (props) => (
  <div className="nav-area">
    <span className="nav-link"><Link to={ROUTES.HOME}>Home</Link></span>
    <span className="nav-link"><Link to={ROUTES.PICTURES}>Pictures</Link></span>
    <span className="nav-link"><Link to={ROUTES.ACCOUNT}>My Profile</Link></span>
    <span className="nav-link"><Link to={ROUTES.ADMIN}>Admin</Link></span>
    <span className="nav-signout" onClick={props.signOut}>Sign-Out</span>
  </div>

);

const NavigationNonAuth = () => (
  <div className="nav-area">
    <span className="nav-link"><Link to={ROUTES.LANDING}>Welcome</Link></span>
    <span className="nav-link"><Link to={ROUTES.SIGNIN}>Sign In</Link></span>
  </div>

);

export default Navigation;
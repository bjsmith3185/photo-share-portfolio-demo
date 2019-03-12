import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Navigation from "../../components/Navigation";
import "./Landing.css";
import kitty from "./images/kitty.jpg";
import family from "./images/danielfamily.png";
import damiela from "./images/danielalana.png";

class LandingPage extends Component {

  

  render = () => {
    return (
      <div className="container-fluid text-center">
        <Navigation />
        <div className="landing-title text-center">Welcome to Photo Share</div>

        <p className="landing-text text-center">
          The fun way share photos with family and friends.
        </p>

     
        {/* Carousel */}

        <div id="slides" className="carousel slide" data-ride="carousel">
          <ul className="carousel-indicators">
            <li data-target="#slides" data-slide-to="0" className="active" />
            <li data-target="#slides" data-slide-to="1" />
            <li data-target="#slides" data-slide-to="2" />
          </ul>

          <div className="carousel-inner text-center">
            <div className="carousel-item active">
              <img src={kitty} alt="kitty" />
              <div className="carousel-caption">
                
              </div>
            </div>

            <div className="carousel-item">
              <img src={damiela} alt="dan" />
            </div>

            <div className="carousel-item">
              <img src={family} alt="family" />
            </div>
          </div>
        </div>

        <button type="button" className="btn btn-outline-light btn-lg landing-sign-in">
                  <Link to={ROUTES.SIGNIN}>Sign In</Link>
                </button>

      </div>
    );
  };
}

export default LandingPage;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Navigation from '../../components/Navigation'
import "./Landing.css";


class LandingPage extends Component {

  render = () => {
    return (

      <div>
        <Navigation />
        <div className="landing-title text-center">Welcome to Photo Share</div>

      
          <div className="landing-text text-center">
            <p>The fun and easy way to view and share photos with family and friends.</p>
           
          </div>
          <div className="landing-signin text-center"><Link to={ROUTES.SIGNIN}>Sign In to get started!</Link></div>
          


      </div>

    );
  };
};






// const condition = authUser => !!authUser;

// export default withAuthorization(condition)(HomePage);
export default LandingPage;
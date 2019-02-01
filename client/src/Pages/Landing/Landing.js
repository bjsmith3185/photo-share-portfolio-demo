import React, { Component } from 'react';
import Navigation from '../../components/Navigation'
import "./Landing.css";


class LandingPage extends Component {

  // state = {
  //   name: "",
  //   email: "",

  //   users: [],



  // };

  // componentDidMount() {

  // }





  render = () => {
    return (

      <div>
        <Navigation />
        <h1>Welcome to Photo Share</h1>

        <div className="row">
          <div className="col-lg-6 text-center">
            <p>Here you can view and share photos with family and friends.</p>
            <p>Sign In to get started!</p>
          </div>

        </div>


      </div>

    );
  };
};






// const condition = authUser => !!authUser;

// export default withAuthorization(condition)(HomePage);
export default LandingPage;
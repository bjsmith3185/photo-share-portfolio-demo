import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import * as ROUTES from '../../constants/routes';
import "./Home.css";
import Navigation from '../../components/Navigation';
import UserIdBar from '../../components/UserIdBar';

// import { identity } from 'rxjs';
// import PictureList from '../../components/PictureList';
// import PictureNavbar from '../../components/PictureNavbar';


class HomePage extends Component {

  state = {
    name: "",
    email: "",
    _id: "",

    loggedIn: false,
    authUser: false,
    admin: false,


  };

  componentDidMount() {
    this.checkIfUserExists();
  }

  componentWillUnmount() {

  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  signOut = () => {
    // console.log("signing out")
    let _id = sessionStorage.getItem("_id");

    API.signOutUser(_id)
      .then(res => {
        console.log("signed out")
      })
      .catch(error => {
        console.log(error)
      });
    sessionStorage.clear();
    this.props.history.push(ROUTES.LANDING);
  };


  checkIfUserExists = () => {
    let _id = sessionStorage.getItem("_id");

    API.getUser(_id)
      .then(res => {
        // console.log("users info")
        // console.log(res.data)

        if (res.data === null) {
          this.setState({
            loggedIn: false,
            authUser: false,
          })
        } else {
          sessionStorage.setItem("name", res.data.name);
          sessionStorage.setItem("email", res.data.email);
          this.setState({
            loggedIn: res.data.loggedIn,
            name: res.data.name,
            email: res.data.email,
            _id: res.data._id,
            authUser: true,
            admin: res.data.admin,
          })
        }
      })
      .catch(error => {
        console.log(error)
      });

  };





  render = () => {

    return (

      <div>
        <Navigation
          authUser={this.state.authUser}
          admin={this.state.admin}
          signOut={this.signOut}
        />
        <UserIdBar name={this.state.name} />
        <h1 className="home-title text-center">Welcome to the Picture-Share App!</h1>

        {this.state.loggedIn ? (
          <div>
            <div className="home-title-name text-center">
              Good to see you {this.state.name}.
            </div>
          </div>
        ) : (

            <div className="home-signin-link">
              <div> <Link to={ROUTES.SIGNIN}>Sign In</Link> </div>
            </div>

          )}




      </div>

    );
  };
};








// export default withAuthorization(condition)(HomePage);
export default HomePage;
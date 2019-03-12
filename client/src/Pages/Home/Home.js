import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import * as ROUTES from "../../constants/routes";
import "./Home.css";
import Navigation from "../../components/Navigation";
import UserIdBar from "../../components/UserIdBar";


class HomePage extends Component {
  state = {
    name: "",
    email: "",
    _id: "",

    loggedIn: false,
    authUser: false,
    admin: false
  };

  componentDidMount() {
    this.checkIfUserExists();
  }

  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  signOut = () => {
    let _id = sessionStorage.getItem("_id");

    API.signOutUser(_id)
      .then(res => {
        console.log("signed out");
      })
      .catch(error => {
        console.log(error);
      });
    sessionStorage.clear();
    this.props.history.push(ROUTES.LANDING);
  };

  checkIfUserExists = () => {
    let _id = sessionStorage.getItem("_id");

    API.getUser(_id)
      .then(res => {

        if (res.data === null) {
          this.setState({
            loggedIn: false,
            authUser: false
          });
        } else {
          sessionStorage.setItem("name", res.data.name);
          sessionStorage.setItem("email", res.data.email);
          this.setState({
            loggedIn: res.data.loggedIn,
            name: res.data.name,
            email: res.data.email,
            _id: res.data._id,
            authUser: true,
            admin: res.data.admin
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render = () => {
    return (
      <div className="text-center">
        <Navigation
          authUser={this.state.authUser}
          admin={this.state.admin}
          signOut={this.signOut}
        />
        <UserIdBar name={this.state.name} />

        <div className="home-title text-center">Photo-Share</div>

        {this.state.loggedIn ? (
          <div className="container-fluid text-center">
            <div className="home-title-name text-center">
              Hello {this.state.name}.
            </div>

            <div className="home-body">
              <Link className="home-pic-link" to={ROUTES.PICTURES}>
                View Pictures
              </Link>
              <p className="home-body-p">
                Select other options from the menu at the top
              </p>
            </div>
          </div>
        ) : (
          <div className="home-signin-link">
            <div>
              {" "}
              <Link to={ROUTES.SIGNIN}>Sign In</Link>{" "}
            </div>
          </div>
        )}
      </div>
    );
  };
}

// export default withAuthorization(condition)(HomePage);
export default HomePage;

import React, { Component } from 'react';

import API from '../../utils/API';
import "./SignIn.css";
import * as ROUTES from '../../constants/routes';
import Navigation from '../../components/Navigation'
// import AllUsers from "../../components/AllUsers";


class SignIn extends Component {


  state = {
    adminTrue: false,
    name: "",
    email: "",
    password: "",
    unscessful: false,
   
  };

  componentDidMount() {
    sessionStorage.clear();
  }

  demo = () => {
    this.setState({
      email: "",
      password: "",
      name: ""

    })
    this.setState({
      email: "brian@mail.com",
      password: "123456"
    })
  }

  login = (event) => {
    console.log("logging in to app")
    sessionStorage.clear();
    event.preventDefault();

    let data = {
      password: this.state.password
    }

    API.login(this.state.email, data)
      .then(res => {

        this.setState({
          email: "",
          password: "",
        })

        if (res.data === null) {
          this.setState({
            unscessful: true
          })
        } else {
          // console.log(res.data._id)
          sessionStorage.setItem("_id", res.data._id);
          this.setState({
            unscessful: false
          })
          this.pageRedirect();
        }
      })
      .catch(err => console.log(err));
  };

  pageRedirect = () => {
    this.props.history.push(ROUTES.HOME);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render = () => {

    return (

      <div>
        <Navigation />

        <div className="signin-title-area text-center">
        <span className="signin-title text-center">Sign In</span> <span className="signin-help-btn" onClick={this.demo}>Demo Login</span></div>

        {this.state.unscessful ? (
          <div className="login-incorrect text-center">Incorrect Login Attempt, Try Again</div>
        ) : (

            <div className="login-text text-center">Enter you information Below</div>
          )}


        <form className="login-form text-center">
          <input className="login-form-input"
            value={this.state.email}
            name="email"
            onChange={this.onChange}
            type="text"
            placeholder="email"
          />
          <br />
          <input className="login-form-input2"
            value={this.state.password}
            name="password"
            onChange={this.onChange}
            type="password"
            placeholder="password"
          />
          <br />
          <button className="form-btn btn btn-info" onClick={this.login}>LogIn</button>

        </form>

      
      </div>

    )
  };
};









export default SignIn;
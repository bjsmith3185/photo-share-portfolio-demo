import React, { Component } from 'react';

import API from '../../utils/API';
import "./SignIn.css";
import * as ROUTES from '../../constants/routes';
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

  // componentWillUnmount() {

  // }

  login = (event) => {
    console.log("logging in to app")
    sessionStorage.clear();
    event.preventDefault();

    let data = {
      password: this.state.password
    }

    API.login(this.state.email, data)
      .then(res => {
        // console.log("return from logins")
        // console.log(res.data)


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

        <h1>Sign In</h1>

        {this.state.unscessful ? (
          <div>Incorrect Login Attempt, Try Again</div>
        ) : (

            <div>Enter you information Below</div>
          )}
          <br/>
          <div>To test this app use:</div>
          <div>email: brian@mail.com</div>
          <div>password: 123456</div>
        <form>
          <input className="form-input"
            value={this.state.email}
            name="email"
            onChange={this.onChange}
            type="text"
            placeholder="email"
          />
          <br />
          <input className="form-input"
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
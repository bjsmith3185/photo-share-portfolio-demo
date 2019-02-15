import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import "./Account.css";
import Navigation from '../../components/Navigation';
import UserIdBar from '../../components/UserIdBar';
import UserInfo from '../../components/UserInfo';
import * as ROUTES from '../../constants/routes';


class Account extends Component {


  state = {
    loggedIn: false,
    authUser: false,
    admin: false,

    name: "",
    email: "",
    password: "",
    _id: "",
    createdDate: "",


    newPassword: "",
    confirmPassword: "",

    newEmail: "",

    newName: "",

    showUserInfoArea: false,
    showUpdateName: false,
    showUpdateEmail: false,
    showUpdatePassword: false,

  };

  componentDidMount() {
    this.checkIfUserExists();

  }

  // componentWillUnmount() {

  // }

  signOut = () => {
    console.log("signing out")
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
          sessionStorage.setItem("_id", res.data._id);
          this.setState({
            loggedIn: res.data.loggedIn,
            name: res.data.name,
            email: res.data.email,
            password: res.data.password,
            _id: res.data._id,
            authUser: true,
            admin: res.data.admin,
            createdDate: res.data.createdDate,
          })
        }
      })
      .catch(error => {
        console.log(error)
      });
  };



  viewUpdateName = () => {
    // console.log("clicked name")
    if (this.state.showUpdateName === false) {
      this.setState({
        showUpdateName: true,
      })
    } else {
      this.setState({
        showUpdateName: false,
      })
    }
  };

  updateName = () => {
    // console.log("updating name")
    let data = {
      name: this.state.newName,
    }

    API.updateUserById(this.state._id, data)
      .then(res => {
        this.checkIfUserExists();
      })
      .catch(error => {
        console.log(error)
      });

    this.setState({
      showUpdateName: false,
    })

  };

  viewUpdateEmail = () => {
    if (this.state.showUpdateEmail === false) {
      this.setState({
        showUpdateEmail: true,
      })
    } else {
      this.setState({
        showUpdateEmail: false,
      })
    }
  }

  updateEmail = () => {
    // console.log("clicked password")
    let data = {
      email: this.state.newEmail,
    }

    API.updateUserById(this.state._id, data)
      .then(res => {
        this.checkIfUserExists();
      })
      .catch(error => {
        console.log(error)
      });

    this.setState({
      showUpdateEmail: false,
    })


  };

  viewUpdatePassword = () => {
    if (this.state.showUpdatePassword === false) {
      this.setState({
        showUpdatePassword: true,
      })
    } else {
      this.setState({
        showUpdatePassword: false,
      })
    }
  }

  updatePassword = () => {
    // console.log("clicked password")
    let data = {
      password: this.state.newPassword,
    }

    API.updateUserById(this.state._id, data)
      .then(res => {
        this.checkIfUserExists();
      })
      .catch(error => {
        console.log(error)
      });

    this.setState({
      showUpdatePassword: false,
    })




  };


  viewUserInfo = () => {
    if (this.state.showUserInfoArea === false) {
      this.setState({
        showUserInfoArea: true,
      })
    } else {
      this.setState({
        showUserInfoArea: false,
      })
    }
  }




  // pageRedirect = () => {
  //   this.props.history.push(ROUTES.HOME);
  // };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render = () => {

    return (

      <div>

        {this.state.authUser && this.state.loggedIn ? (

          <div>
            <Navigation
              authUser={this.state.authUser}
              admin={this.state.admin}
              signOut={this.signOut}
            />
            <UserIdBar name={this.state.name} />
            <div className="account-title text-center">User Account Page</div>

            <div className="account-text text-center">
              Click to view your account information.
                <button className="account-info-btn" onClick={this.viewUserInfo}>User Info.</button>
            </div>

            {this.state.showUserInfoArea ? (

              <UserInfo
                name={this.state.name}
                viewUpdateName={this.viewUpdateName}
                email={this.state.email}
                viewUpdateEmail={this.viewUpdateEmail}
                password={this.state.password}
                viewUpdatePassword={this.viewUpdatePassword}
                created={this.state.createdDate}

                onChange={this.onChange}
                showUpdateName={this.state.showUpdateName}
                newName={this.state.newName}
                updateName={this.updateName}

                showUpdateEmail={this.state.showUpdateEmail}
                newEmail={this.state.newEmail}
                updateEmail={this.updateEmail}

                showUpdatePassword={this.state.showUpdatePassword}
                newPassword={this.state.newPassword}
                updatePassword={this.updatePassword}

              />

            ) : (
                <div></div>
              )}

          </div>

        ) : (

            <div className="account-logged-out-area text-center">
              <div className="account-logged-out text-center">
                You have been logged out, click the link below to sign in.</div>
              <Link to={ROUTES.SIGNIN}>Sign In</Link>
            </div>

          )}

      </div>

    )
  };
};









export default Account;
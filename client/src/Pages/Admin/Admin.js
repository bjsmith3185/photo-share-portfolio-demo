import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import "./Admin.css";
import AddNewUser from '../../components/AddNewUser';
import Navigation from '../../components/Navigation';
import UserIdBar from '../../components/UserIdBar';
import AdminNavbar from "../../components/AdminNavbar";
import AllUsers from "../../components/AllUsers";
import RemovePicture from '../../components/RemovePicture';
import * as ROUTES from '../../constants/routes';
// import PictureNavbar from '../../components/PictureNavbar';





class Admin extends Component {

  state = {
    username: "",
    useremail: "",
    passwordOne: "",
    passwordTwo: "",
    error: "",
    userAdmin: "",
    resetPassword: false,


    loggedIn: false,
    authUser: false,
    admin: false,

    name: "",
    email: "",
    _id: "",

    showAddNewUser: false,
    showAllUsers: false,
    showRemovePicture: false,

    usersView: false,
    allUsers: [],

    viewUpdateUser: false,
    oldUsername: "",
    oldUseremail: "",
    oldAdmin: "",
    idToUpdate: "",




  };


  componentDidMount() {
    this.checkIfUserExists();
  }

  // componentWillUnmount() {

  // }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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


  addUser = (event) => {
    event.preventDefault();

    let newUser = {
      name: this.state.username,
      email: this.state.useremail,
      // password: this.state.passwordOne,
    }

    API.addUser(newUser)
      .then((res) => {
        // console.log("added new user to database")
        // console.log(res.data)
        this.getAllUsers();
      })
      .catch(error => {
        console.log(error)
      });
  };



  getAllUsers = () => {
    API.getAllUsers()
      .then(res => {
        // console.log("all users info")
        // console.log(res.data)

        if (res.data === null) {
          console.log("no users")
        } else {
          this.setState({
            usersView: true,
            allUsers: res.data
          })
        }

      })
      .catch(error => {
        console.log(error)
      });
  };

  updateUser = (id) => {
    // console.log("update")
    // console.log(id)
    API.getUser(id)
      .then((res) => {
        // console.log("user info")
        // console.log(res.data)
        this.setState({
          oldUsername: res.data.name,
          oldUseremail: res.data.email,
          oldAdmin: res.data.admin.toString(),
          username: res.data.name,
          useremail: res.data.email,
          idToUpdate: res.data._id,
          userAdmin: res.data.admin,
          viewUpdateUser: true,

        })
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  submitUpdatedUser = (event) => {
    event.preventDefault();
    // console.log(id)
    // console.log(this.state.idToUpdate);
    let data = {};
    if (this.state.resetPassword) {
      data = {
        name: this.state.username,
        email: this.state.useremail,
        admin: this.state.userAdmin,
        password: "123456",
      }

    } else {
      data = {
        name: this.state.username,
        email: this.state.useremail,
        admin: this.state.userAdmin,
      }
    }

    // console.log(data)

    API.updateUser(this.state.oldUsername, data)
      .then((res) => {
        // console.log("updated user info")
        // console.log(res.data)
        this.setState({
          viewUpdateUser: false,
          username: "",
          useremail: "",
          userPassword: false,

        })
        this.getAllUsers();

      })
      .catch(error => {
        this.setState({ error });
      });


  };

  deleteUser = (id) => {
    // console.log("delete")
    // console.log(id)

    API.deleteUser(id)
      .then((res) => {
        // console.log("deleted user")
        // console.log(res.data)
        this.getAllUsers();
      })
      .catch(error => {
        this.setState({ error });
      });
  };




  removeAllPictures = () => {

    API.removeAllPictures()
      .then((res) => {
        // console.log("removed all pictures")
        // console.log(res.data)
        this.viewAllUsers();
      })
      .catch(error => {
        this.setState({ error });
      });

  };


  viewAddNewUser = () => {
    this.setState({
      showAddNewUser: true,
      showAllUsers: false,
      showRemovePicture: false,
      username: "",
      useremail: "",
    })
  };

  viewAllUsers = () => {
    this.setState({
      showAddNewUser: false,
      showAllUsers: true,
      showRemovePicture: false,
      username: "",
      useremail: "",
    })

    this.getAllUsers()
  };

  viewRemovePicture = () => {
    this.setState({
      showAddNewUser: false,
      showAllUsers: false,
      showRemovePicture: true,
    })
  };





  render = () => {

    // const {
    //   username,
    //   email,
    //   passwordOne,
    //   passwordTwo,
    //   error,
    // } = this.state;

    // const isInvalid =
    //   passwordOne !== passwordTwo ||
    //   passwordOne === '' ||
    //   email === '' ||
    //   username === '';



    return (

      <div>
        <Navigation
          authUser={this.state.authUser}
          admin={this.state.admin}
          signOut={this.signOut}
        />
        <UserIdBar name={this.state.name} />


        {this.state.admin && this.state.loggedIn ? (
          <div>
            <h1>This is the admin page</h1>
            <AdminNavbar
              viewAddNewUser={this.viewAddNewUser}
              viewAllUsers={this.viewAllUsers}
              viewRemovePicture={this.viewRemovePicture}
            />


            {this.state.showAddNewUser ? (
              <AddNewUser
                addUser={this.addUser}
                onChange={this.onChange}
                username={this.state.username}
                useremail={this.state.useremail}
                passwordOne={this.state.passwordOne}
                passwordTwo={this.state.passwordTwo}
                error={this.state.error}

              />
            ) : (
                <div></div>
              )}

            {this.state.showAllUsers ? (
              <AllUsers
                // getAllUsers={this.getAllUsers}
                usersView={this.state.usersView}
                allUsers={this.state.allUsers}
                updateUser={this.updateUser}
                deleteUser={this.deleteUser}

                viewUpdateUser={this.state.viewUpdateUser}
                oldUsername={this.state.oldUsername}
                username={this.state.username}
                onChange={this.onChange}
                oldUseremail={this.state.oldUseremail}
                useremail={this.state.useremail}
                userPassword={this.state.userPassword}
                oldAdmin={this.state.oldAdmin}
                userAdmin={this.state.userAdmin}
                submitUpdatedUser={this.submitUpdatedUser}

              />
            ) : (
                <div></div>
              )}

            {this.state.showRemovePicture ? (
              <RemovePicture
                removeAllPictures={this.removeAllPictures}
              />
            ) : (
                <div></div>
              )}


          </div>
        ) : (
            <div>You have been logged out, click the link below to sign in.
              <Link to={ROUTES.SIGNIN}>Sign In</Link> </div>
          )}

      </div>

    );
  };
};



export default Admin;
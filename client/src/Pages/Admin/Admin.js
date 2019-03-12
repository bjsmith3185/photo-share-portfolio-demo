import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import "./Admin.css";
import AddNewUser from '../../components/AddNewUser';
import Navigation from '../../components/Navigation';
import UserIdBar from '../../components/UserIdBar';
import AdminNavbar from "../../components/AdminNavbar";
import UpdateUser from "../../components/UpdateUser";
import OnlineUsers from "../../components/OnlineUsers";
import RemovePicture from '../../components/RemovePicture';
import * as ROUTES from '../../constants/routes';


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

    // Current user's info
    name: "",
    email: "",
    _id: "",

    // Create New User data
    newUserName: "",
    newUserEmail: "",

    showAddNewUser: false,
    showAllUsers: false,
    showRemovePicture: false,
    // showOnlineUsers: false,
    showModifyUsers: false,
    showDeleteUser: false,


    usersView: false,
    allUsers: [],
    allNames: [],


    showUpdatingUser: false,
    // viewUpdateUser: false,
    oldUsername: "",
    oldUseremail: "",
    oldAdmin: "",
    idToUpdate: "",

    value: "",
    confirmDelete: false,
    removeName: "",

    // state for delete pictures 
    removeMenu: true,
    removeAllPic: false,
    removeSelectedPic: false,
    confirmSelected: false,
    pictureToDelete: "",
    awsKeyToDelete: "",
    tempImageUrl: "",
  

    allPictures: [],

    onlineUsers: [],

  };


  componentDidMount() {
    this.checkIfUserExists();
  }


  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  signOut = () => {
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

    // lowercase
    let newUser = {
      name: this.state.username,
      email: this.state.useremail.toLowerCase(),

    }

    API.addUser(newUser)
      .then((res) => {
        console.log("added new user to database")

        this.setState({
          username: "",
          useremail: "",
        })
        this.viewAllUsers();
      })
      .catch(error => {
        console.log(error)
      });
  };

  
  findAllUsers = () => {

    API.getAllUsers()
      .then(res => {

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


  preDeleteSelectedPic = (id, awsKey, imageUrl) => {

    this.setState({
      confirmSelected: true,
      pictureToDelete: id,
      awsKeyToDelete: awsKey,
      tempImageUrl: imageUrl,
    })
  };


  selectPicDelete = () => {
    let data = {
      awsKey: this.state.awsKeyToDelete,
      user_id: this.state._id,
    }

    API.removeOnePicture(this.state.pictureToDelete, data)
      .then((res) => {
   
        this.setState({
          confirmSelected: false,
          value: "",

        })
        this.viewRemovePicture();
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  // is called when the remove pictures tab is clicked
  getAllPicturesToRemove = () => {
    API.getAllPictures()
      .then(res => {
        this.setState({
          getAllPicturesToRemove: res.data
        })
      })
      .catch(err => console.log(err));
  };
  

  // this give the user the opportunity to confirm delete all
  menuDeleteAll = () => {
    this.setState({
      removeAllPic: true,
      removeSelectedPic: false,
      removeMenu: false,
    })
  };

  cancelDeletePic = () => {
    this.setState({
      removeAllPic: false,
      removeSelectedPic: false,
      removeMenu: true,
      confirmSelected: false,
    })

  };

  // function to remove all pictures
  removeAllPictures = () => {
    API.removeAllPictures(this.state._id)
      .then((res) => {

        this.viewAllUsers();
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  // let the user choose to remove one or all pictures
  menuRemoveSelectedPic = () => {
    this.setState({
      removeAllPic: false,
      removeSelectedPic: true,
      removeMenu: false,
    })
  };



  viewAddNewUser = () => {
    this.setState({
      showAddNewUser: true,
      showAllUsers: false,
      showRemovePicture: false,
      showDeleteUser: false,
      showModifyUsers: false,
      username: "",
      useremail: "",
    })

  };

  viewAllUsers = () => {
    this.setState({
      showAddNewUser: false,
      showAllUsers: true,
      showRemovePicture: false,
      showDeleteUser: false,
      showModifyUsers: false,
      confirmDelete: false,
    })
    this.findAllUsers();
  };


  viewRemovePicture = () => {
    this.setState({
      showAddNewUser: false,
      showAllUsers: false,
      showRemovePicture: true,
      showDeleteUser: false,
      showModifyUsers: false,
      confirmDelete: false,
      removeMenu: true,
      removeAllPic: false,
      removeSelectedPic: false,
    })
    this.getAllPicturesToRemove();
  };

  viewModifyUser = () => {
    this.setState({
      showAddNewUser: false,
      showAllUsers: false,
      showRemovePicture: false,
      showDeleteUser: false,
      showModifyUsers: true,
      showUpdatingUser: false,
      confirmDelete: false,
    })
    this.getAllUserNames();
  };

  viewDeleteUser = () => {
    this.setState({
      showAddNewUser: false,
      showAllUsers: false,
      showRemovePicture: false,
      showOnlineUsers: false,
      showDeleteUser: true,
      showModifyUsers: false,
      confirmDelete: false,
    })
    this.getAllUserNames();
  };

  getAllUserNames = () => {
    this.setState({
      value: '',
      allNames: [],
    })
    API.getAllUsers()
      .then(res => {
        let defaultId = res.data[0]._id;

        this.setState({
          allNames: res.data,
          value: defaultId,
        })
      })
      .catch(error => {
        console.log(error)
      });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };



  selectUser = (event) => {
    event.preventDefault();
    this.setState({
      showUpdatingUser: true,
    })
    this.updateUser(this.state.value)
  };

  updateUser = (id) => {
    API.getUser(id)
      .then((res) => {
        this.setState({
          oldUsername: res.data.name,
          oldUseremail: res.data.email,
          oldAdmin: res.data.admin.toString(),
          username: res.data.name,
          useremail: res.data.email,
          idToUpdate: res.data._id,
          userAdmin: res.data.admin,
        })
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  submitUpdatedUser = (event) => {
    event.preventDefault();

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

    API.updateUser(this.state.oldUsername, data)
      .then((res) => {
        this.setState({
          viewUpdateUser: false,
          username: "",
          useremail: "",
          userPassword: false,
          showAllUsers: true,
          showUpdatingUser: false,
          showModifyUsers: false,

        })
        this.findAllUsers();

      })
      .catch(error => {
        this.setState({ error });
      });


  };

  removeUser = (event) => {
    event.preventDefault();

    for (var i = 0; i < this.state.allNames.length; i++) {
      if (this.state.value === this.state.allNames[i]._id) {
        this.setState({
          removeName: this.state.allNames[i].name,
          confirmDelete: true,
        })
      }
    }
  };

  cancelRemove = () => {
    this.setState({
      confirmDelete: false
    })
  };

  confirmRemoveUser = () => {
    this.setState({
      confirmDelete: false,
    })
    this.deleteUser()

  }

  deleteUser = () => {

    API.deleteUser(this.state.value)
      .then((res) => {
        this.viewAllUsers();
      })
      .catch(error => {
        this.setState({ error });
      });
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
            <h1 className="adminpage-header text-center">Administration Page</h1>
            <AdminNavbar
              viewAddNewUser={this.viewAddNewUser}
              viewAllUsers={this.viewAllUsers}
              viewRemovePicture={this.viewRemovePicture}
              viewDeleteUser={this.viewDeleteUser}
              viewModifyUser={this.viewModifyUser}
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

              <OnlineUsers
                allUsers={this.state.allUsers}
              />

            ) : (
                <div></div>
              )}

            {this.state.showModifyUsers ? (

              <div>
                {this.state.showUpdatingUser ? (
                  // Form to update selected user 
                  <div>
    
                    <UpdateUser
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
                  </div>
                ) : (
                    // Dropdown to select user to modify 
                    <div className="modifyuser-area text-center">
                      <div className="modifyuser-title text-center">Modify User</div>
                      <form className="modifyuser-form text-center">
                        <label className="modifyuser-label">
                          Pick User to modify:
                          <select className="modifyuser-select" value={this.state.value} onChange={this.handleChange}>

                            {this.state.allNames.map((name, i) => (
                              <option key={name._id} value={name._id}>{name.name}</option>
                            )
                            )}
                          </select>
                        </label>
                        
                      </form>

                      <button className="modifyuser-btn" onClick={this.selectUser}>Continue</button>

                      
                    </div>
                  )}
              </div>
            ) : (
                <div></div>
              )}




            {this.state.showDeleteUser ? (
              // Dropdown to select user to delete 
              <div className="deleteuser-area text center">
                <div className="deleteuser-title text-center">Delete User from App.</div>
                <form className="deleteuser-form text-center">
                  <label className="deleteuser-label-title">
                    Pick User to remove from Photo Share.
                  <select 
                    className="deleteuser-select"
                    value={this.state.value} 
                    onChange={this.handleChange}
                    >

                      {this.state.allNames.map((name, i) => (
                        <option key={name._id} value={name._id}>{name.name}</option>
                      )
                      )}
                    </select>
                  </label>
                </form>

                <div className="deleteuser-buttons text-center">
                {this.state.confirmDelete ? (
                  <div>
                  <div>Confirm you would like to remove 
                    <span className="deleteuser-confirm-name">{this.state.removeName}</span> 
                    from this application permantly. <button className="deleteuser-confirm-btn" onClick={this.confirmRemoveUser}>Delete User</button>
                  </div>
                  <button className="deleteuser-cancel-btn" onClick={this.cancelRemove}>Cancel</button>
                    </div>
                ) : (

                    <div>To remove user click Continue.
                    <button className="deleteuser-continue-btn" onClick={this.removeUser}>Continue</button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
                <div></div>
              )}



            {this.state.showRemovePicture ? (
              <RemovePicture
                removeAllPictures={this.removeAllPictures}
                removeMenu={this.state.removeMenu}
                menuDeleteAll={this.menuDeleteAll}
                menuRemoveSelectedPic={this.menuRemoveSelectedPic}
                removeAllPic={this.state.removeAllPic}
                cancelDeletePic={this.cancelDeletePic}
                removeSelectedPic={this.state.removeSelectedPic}


                pictures={this.state.getAllPicturesToRemove}
                confirmSelected={this.state.confirmSelected}
                selectPicDelete={this.selectPicDelete}
                preDeleteSelectedPic={this.preDeleteSelectedPic}
                tempImageUrl={this.state.tempImageUrl}

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
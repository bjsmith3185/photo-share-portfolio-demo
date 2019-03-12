import React, { Component } from "react";
import API from '../../utils/API';
import * as ROUTES from '../../constants/routes';

class Populate extends Component {
  

  populateUser = () => {
    API.populateUser()
      .then(res => {
        console.log("Removed all users, Created 1 Admin user")
        console.log(res.data)
      })
      .catch(err => console.log(err));
  };

  removePictures = () => {
    API.deleteAllPictures()
    .then(res => {
      console.log("removed all saved pictures")
      console.log(res.data)
    })
    .catch(err => console.log(err));
  }

  removeComment = () => {
    API.deleteAllComments()
    .then(res => {
      console.log("removed all comments")
      console.log(res.data)
    })
    .catch(err => console.log(err));
  }

  
  redirectStartPage = () => {
    this.props.history.push(ROUTES.LANDING);
  };


  render() {
    return (

      <div >
        <br />
        <br />
        <br />
        <br />
        <br />
        <button onClick={this.populateUser}>Reset Users</button>
        <br />
        <br />
        <br />
        <button onClick={this.removePictures}>Reset Pictures</button>
        <br />
        <br />
        <br />
        <button onClick={this.removeComment}>Reset Comments</button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <button onClick={this.redirectStartPage}>Back to app</button>
      </div>

    )
  }
}

 export default Populate;
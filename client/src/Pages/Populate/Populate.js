import React from 'react';
import API from '../../utils/API';

import * as ROUTES from '../../constants/routes';

export default class PopulateUsersPage extends React.Component {
  

  populateUsers = () => {
    API.populateUsers()
      .then(res => {
        console.log("populate users")
        console.log(res.data)
      })
      .catch(err => console.log(err));
  };

  removePictures = () => {
    API.removePicures()
    .then(res => {
      console.log("removed all saved pictures")
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
        <button onClick={this.populateUsers}>Populate Admin</button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <button onClick={this.removePictures}>Clear pictures</button>
        <br />
        <br />
        <br />
        <br />
        <button onClick={this.redirectStartPage}>Back to app</button>
      </div>

    )
  }
}

//  export default Populate;
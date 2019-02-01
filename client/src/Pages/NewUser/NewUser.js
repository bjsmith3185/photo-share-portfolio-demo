import React, { Component } from 'react';

import { withAuthorization } from '../../components/Session';
import API from '../../utils/API';
import "./NewUser.css";
import Form from "../../components/Form";
import PictureList from '../../components/PictureList';
import PictureNavbar from '../../components/PictureNavbar';


class NewUser extends Component {

  state = {
    
  };

  componentDidMount() {
   
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getUserInfo = () => {

    let email = sessionStorage.getItem("email")
    let name = sessionStorage.getItem("name");
    console.log("from session storage")
    console.log(email);
    console.log(name);
    this.setState({
      name: name,
      email: email,
    })

  };

 
  
 
  render = () => {
    return (

      <div>
        <h1>Please enter your user information to continue.</h1>
       

      </div>

    );
  };
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(NewUser);
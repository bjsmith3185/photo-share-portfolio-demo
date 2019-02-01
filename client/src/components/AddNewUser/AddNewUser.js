import React from "react";
import "./AddNewUser.css";


const AddNewUser = (props) => (

  

  <div className="addnewuser-area">
   <div>Add New User Form</div>

   <form>
        <input
          name="username"
          value={props.username}
          onChange={props.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="useremail"
          value={props.useremail}
          onChange={props.onChange}
          type="text"
          placeholder="Email Address"
        />
        {/* <input
          name="passwordOne"
          value={props.passwordOne}
          onChange={props.onChange}
          type="text"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={props.passwordTwo}
          onChange={props.onChange}
          type="text"
          placeholder="Confirm Password"
        /> */}
        <button onClick={props.addUser}>
          Sign Up
        </button>

      
      </form>
  </div>
);

export default AddNewUser;


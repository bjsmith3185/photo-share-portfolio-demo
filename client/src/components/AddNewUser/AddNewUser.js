import React from "react";
import "./AddNewUser.css";


const AddNewUser = (props) => (

  <div className="addnewuser-area">
    <div className="addnewuser-title text-center">Add New User Form</div>

    <form className="addnewuser-form text-center">
      <input
        className="addnewuser-input"
        name="username"
        value={props.username}
        onChange={props.onChange}
        type="text"
        placeholder="Full Name"
      />

      <input
        className="addnewuser-input"
        name="useremail"
        value={props.useremail}
        onChange={props.onChange}
        type="text"
        placeholder="Email Address"
      />

      <button className="addnewuser-submit text-center" onClick={props.addUser} disabled={!props.username && !props.useremail} >
        Sign Up
        </button>

    </form>

    <div className="addnewuser-notes-area">
      <p className="addnewuser-notes">To add a new user you will need</p>

      <div className="addnewuser-notes-indent">- full name</div>
      <div className="addnewuser-notes-indent">- valid email address</div>
    <br/>
      <p className="addnewuser-notes">The app will email the new user their username and password.</p>
      <p className="addnewuser-notes"> To give a user 'admin' rights, follow these steps:</p>
      <div className="addnewuser-notes-indent">- Sign up a new user from the Add New User Form</div>
      <div className="addnewuser-notes-indent">- Click on the Modify User tab</div>
      <div className="addnewuser-notes-indent">- Locate the user in the dropdown menu and click Continue</div>
      <div className="addnewuser-notes-indent">- Set the admin status to true, Click Update.</div>
      <br/>
      <p className="addnewuser-notes">For information on updating/modifying a user click the Modify User tab.</p>

    </div>






  </div>
);

export default AddNewUser;


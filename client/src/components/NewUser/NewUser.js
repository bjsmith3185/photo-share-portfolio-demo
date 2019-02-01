import React from "react";
import "./NewUser.css";

const NewUser = (props) => (

  <div className="newuser-area">
   <div>New user form</div>
   <form>
        <input
          name="username"
          value={props.username}
          onChange={props.onChange}
          type="text"
          placeholder="Full Name"
        />
       
        <button disabled={props.isInvalid} onClick={props.addToDatabase} >
          Register
        </button>

      
      </form>
  </div>
);

export default NewUser;


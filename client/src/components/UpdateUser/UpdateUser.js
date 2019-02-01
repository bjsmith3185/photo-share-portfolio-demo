import React from "react";
import "./UpdateUser.css";


const UpdateUser = (props) => (

  <div className="updateuser-area">
    <div>Update User Info Below.</div>

    <form>
      <div>
        <label >Previous: {props.oldUsername}</label>
        <input
          id="username"
          name="username"
          value={props.username}
          onChange={props.onChange}
          type="text"
        />

      </div>
      <div>
        <label >Previous: {props.oldUseremail}</label>
        <input
          id="useremail"
          name="useremail"
          value={props.useremail}
          onChange={props.onChange}
          type="text"
        />

      </div>
      <br />


      <span className="updateuser-password">Reset Password: </span><input type="checkbox" name="resetPassword" value={true} onClick={props.onChange} />
        <br />

      
        <br />


        <div>
          <label >Admin Status: {props.oldAdmin}</label>
          <br />
          <select
            id="useradmin"
            value={props.userAdmin}
            name="userAdmin"
            onChange={props.onChange}
          >
             <option value={false}>False</option>
            <option value={true}>True</option>
          </select>

        </div>

    
        <br />
        <br />
        <br />
        <br />

        <button onClick={props.submitUpdatedUser}>
          Update
        </button>


    </form>
  </div>
    );
    
    export default UpdateUser;
    

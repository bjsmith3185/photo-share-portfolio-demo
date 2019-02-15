import React from "react";
import "./UpdateUser.css";


const UpdateUser = (props) => (

  <div className="updateuser-area text-center">
    <div className="updateuser-title text-center">Update User Info Below.</div>

    <form>
      <div className="updateuser-input-area text-center">
        <span className="updateuser-previous-text">Current Name:<span className="updateuser-previous-text-inner">{props.oldUsername}</span>.</span>

        <label className="updateuser-label">Updated Name:</label>
        <input
          className="updateuser-input"
          id="username"
          name="username"
          value={props.username}
          onChange={props.onChange}
          type="text"
        />

      </div>
      <div>
        <span className="updateuser-previous-text">Current Email:<span className="updateuser-previous-text-inner">{props.oldUseremail}</span>.</span>

        <label className="updateuser-label" >Updated Email:</label>
        <input
          className="updateuser-input"
          id="useremail"
          name="useremail"
          value={props.useremail}
          onChange={props.onChange}
          type="text"
        />

      </div>

      <span className="updateuser-password">Reset Password: </span><input className="updateuser-box" type="checkbox" name="resetPassword" value={true} onClick={props.onChange} />

      <div className="updateuser-admin-area">
        <span className="updateuser-admin-text" >Admin Status: <span className="updateuser-admin-inner">{props.oldAdmin}</span>.</span>

        <label className="updateuser-admin-label">
          Update Status:
          <select
            className="updateuser-dropdown"
            id="useradmin"
            value={props.userAdmin}
            name="userAdmin"
            onChange={props.onChange}
          >
            <option value={false}>False</option>
            <option value={true}>True</option>
          </select>
        </label>
      </div>

      <button className="updateuser-submit-btn" onClick={props.submitUpdatedUser}>
        Update
        </button>

    </form>
  </div>
);

export default UpdateUser;


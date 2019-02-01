import React from "react";
import "./UserInfo.css";


const UserInfo = (props) => (



  <div className="userinfo-area">
    <div>Your Account Information.</div>

    <form>


      <div className="userinfo-line" >Name: {props.name}.

      {props.showUpdateName ? (
          <div>
            <input
              name="newName"
              value={props.newName}
              onChange={props.onChange}
              type="text"
              placeholder="new name.."
            />
            <span className="userinfo-update-btn" onClick={props.updateName}>Update</span>
            <span className="userinfo-back" onClick={props.viewUpdateName}>X</span>

          </div>
        ) : (

            <span className="update-button text-center" onClick={props.viewUpdateName}>Update</span>
          )}



      </div>

      <div className="userinfo-line" >Email: {props.email}.

        {props.showUpdateEmail ? (
          <div>
            <input
              name="newEmail"
              value={props.newEmail}
              onChange={props.onChange}
              type="text"
              placeholder="new email.."
            />
            <span className="userinfo-update-btn" onClick={props.updateEmail}>Update</span>
            <span className="userinfo-back" onClick={props.viewUpdateEmail}>X</span>

          </div>
        ) : (

            <span className="update-button text-center" onClick={props.viewUpdateEmail}>Update</span>
          )}

      </div>

      <div className="userinfo-line" >Password: {props.password}.

        {props.showUpdatePassword ? (
          <div>
            <input
              name="newPassword"
              value={props.newPassword}
              onChange={props.onChange}
              type="text"
              placeholder="new password.."
            />
            <span className="userinfo-update-btn" onClick={props.updatePassword}>Update</span>
            <span className="userinfo-back" onClick={props.viewUpdatePassword}>X</span>

          </div>
        ) : (

            <span className="update-button text-center" onClick={props.viewUpdatePassword}>Update</span>
          )}

      </div>















{/* 
      <div className="userinfo-line">Email: {props.email}.<span className="update-button text-center" onClick={props.updateEmail}>Update</span></div>

      <div className="userinfo-line">Password: {props.password}.<span className="update-button text-center" onClick={props.updatePassword}>Update</span></div> */}

      <div className="userinfo-line">Account create at: {props.created}</div>


      {/* 
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

      <div>
        <label >Previous: {props.oldAdmin}</label>
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

      

      <button onClick={props.submitUpdatedUser}>
        Update
        </button> */}


    </form>
  </div>
);

export default UserInfo;


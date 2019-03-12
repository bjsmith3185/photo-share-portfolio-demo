import React from "react";
import "./UserInfo.css";

const UserInfo = props => (
 
    <form className="userinfo-form">
      <div className="userinfo-line">
        Name: {props.name}.
        {props.showUpdateName ? (
          <div>
            <input
              name="newName"
              value={props.newName}
              onChange={props.onChange}
              type="text"
              placeholder="new name.."
            />
            <span className="userinfo-update-btn" onClick={props.updateName}>
              Update
            </span>
            <span className="userinfo-back" onClick={props.viewUpdateName}>
              X
            </span>
          </div>
        ) : (
          <span
            className="update-button text-center"
            onClick={props.viewUpdateName}
          >
            Update
          </span>
        )}
      </div>

      <div className="userinfo-line">
        Email: {props.email}.
        {props.showUpdateEmail ? (
          <div>
            <input
              name="newEmail"
              value={props.newEmail}
              onChange={props.onChange}
              type="text"
              placeholder="new email.."
            />
            <span className="userinfo-update-btn" onClick={props.updateEmail}>
              Update
            </span>
            <span className="userinfo-back" onClick={props.viewUpdateEmail}>
              X
            </span>
          </div>
        ) : (
          <span
            className="update-button text-center"
            onClick={props.viewUpdateEmail}
          >
            Update
          </span>
        )}
      </div>

      <div className="userinfo-line">
        Password: {props.password}.
        {props.showUpdatePassword ? (
          <div>
            <input
              name="newPassword"
              value={props.newPassword}
              onChange={props.onChange}
              type="text"
              placeholder="new password.."
            />
            <span
              className="userinfo-update-btn"
              onClick={props.updatePassword}
            >
              Update
            </span>
            <span className="userinfo-back" onClick={props.viewUpdatePassword}>
              X
            </span>
          </div>
        ) : (
          <span
            className="update-button text-center"
            onClick={props.viewUpdatePassword}
          >
            Update
          </span>
        )}
      </div>
    
    </form>

);

export default UserInfo;

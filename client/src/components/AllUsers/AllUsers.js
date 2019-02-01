import React from "react";
import "./AllUsers.css";
import UpdateUser from "../UpdateUser";

const AllUsers = (props) => (

  <div className="newuser-area">
    <div>All Users</div>
    <br />
    {/* <div className="allusers-search" onClick={props.getAllUsers}>Show All Users</div> */}

    {props.viewUpdateUser ? (
      <UpdateUser
      oldUsername={props.oldUsername}
      username={props.username}
      onChange={props.onChange}
      oldUseremail={props.oldUseremail}
      useremail={props.useremail}
      oldAdmin={props.oldAdmin}
      userAdmin={props.userAdmin}
      submitUpdatedUser={props.submitUpdatedUser}

      />
    ) : (
        <ol>
          {props.allUsers.map(user => (
            <li key={user._id}>
              <span className="allusers-elements">
                <strong>Name:</strong> {user.name}
              </span>
              <span className="allusers-elements">
                <strong>E-Mail:</strong> {user.email}
              </span>
              <span className="allusers-elements">
                <strong>Administrator:</strong> {user.admin ? (<span>True</span>) : (<span>False</span>)}
              </span>
              <span className="allusers-elements">
                <strong>Date Created:</strong> {user.createdDate}
              </span>
              <div>
                <span className="allusers-elements allusers-update" onClick={() => props.updateUser(user._id)}>Update User</span>
                <span className="allusers-elements allusers-delete" onClick={() => props.deleteUser(user._id)}>Delete User</span>
              </div>
            </li>
          ))}
        </ol>
      )}




  </div>
);

export default AllUsers;


import React from "react";
import "./OnlineUsers.css";


const OnlineUsers = (props) => (

  <div className="onlineuser-area text-center">
    <div className="onlineuser-title text-center">All Users</div>

    <div className="onlineuser-subtitle">Status: Online
      <span className="onlineuser-active"></span>
      ,  Offline
      <span className="onlineuser-inactive"></span>
    </div>

    <div className="onlineuser-count text-center">
      Total system users: {props.allUsers.length}.
    </div>

    <ul className="onlineuser-list-area">
      {props.allUsers.map(user => (
        <li key={user._id}>
          <span className="onlineuser-elements">
            {user.name}
            {user.loggedIn ? (
              <span className="onlineuser-status-true"></span>
            ) : (
                <span className="onlineuser-status-false"></span>
              )}

          </span>
        </li>
      ))}
    </ul>


  </div>
);

export default OnlineUsers;



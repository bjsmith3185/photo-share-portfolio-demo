import React from "react";
import "./OnlineUsers.css";


const OnlineUsers = (props) => (

  <div className="onlineuser-area">
    <div>Users currently online.</div>
    <br />

 
        <ol>
          {props.allUsers.map(user => (
            <li key={user._id}>
              <span className="onlineuser-elements">
                <strong>Name:</strong> {user.name}
                {user.loggedIn ? (
                  <span className="onlineuser-status-true"></span>
                ) : (
                  <span className="onlineuser-status-false"></span>
                )}

              </span>
            </li>
          ))}
        </ol>
     

  </div>
);

export default OnlineUsers;



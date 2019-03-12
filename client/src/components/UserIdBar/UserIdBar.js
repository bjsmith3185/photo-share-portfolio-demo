import React from "react";
import "./UserIdBar.css";

const UserIdBar = props => (
  <div className="useridbar-name">
    Signed In As:
    <span className="useridbar-id">{props.name}.</span>
  </div>
);

export default UserIdBar;

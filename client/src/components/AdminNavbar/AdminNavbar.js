import React from "react";
import "./AdminNavbar.css";

const AdminNavbar = (props) => (

  <div>
<div className="adminnavbar-container text-center">
  <span className="adminnavbar" onClick={props.viewAddNewUser}>Add New User</span>
  <span className="adminnavbar" onClick={props.viewAllUsers}>View All Users</span>

  <span className="adminnavbar" onClick={props.viewModifyUser}>Modify User</span>
  <span className="adminnavbar" onClick={props.viewDeleteUser}>Delete User</span>

  {/* <span className="adminnavbar" onClick={props.viewOnlineUsers}>View Online Users</span> */}
  <span className="adminnavbar" onClick={props.viewRemovePicture}>Remove Picture</span>
</div>


  </div>
  
);

export default AdminNavbar;


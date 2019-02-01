import React from "react";
import "./Form.css";

const Form = (props) => (

  <div className="background-area">
    <div className="row">
      <div className="col-2"></div>
      <div className="col-6">
        <div className="form-title">Add a user.</div>

          <input className="form-input"
            value={props.newUser}
            name="newUser"
            onChange={props.handleInputChange}
            type="text"
            placeholder="User Name"
          />
          <br/>
          <button className="form-btn btn btn-info" onClick={props.addUser}>Submit</button>

      </div>
    </div>

  </div>
);

export default Form;


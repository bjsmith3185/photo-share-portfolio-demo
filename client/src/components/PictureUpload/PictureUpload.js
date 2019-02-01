import React from "react";
import "./PictureUpload.css";

const PictureUpload = (props) => (

  <div className="background-area">
    <div className="row">
      <div className="col-2"></div>
      <div className="col-6">
        <div className="form-title">Upload Picture</div>
        <form>

          <input name="image" type="file" accept="image/*" onChange={props.onSelect} />
          
          <br/>
          <button onClick={props.uploadFiles}>Upload</button>
        </form>




      </div>
    </div>

  </div>
);

export default PictureUpload;


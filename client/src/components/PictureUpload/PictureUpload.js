import React from "react";
import "./PictureUpload.css";

const PictureUpload = (props) => (

  <div className="pictureupload-area">
    <div className="pictureupload-title text-center">Upload Picture</div>

    <form className="pictureupload-form text-center">
      <div className="pictureupload-form-text text-center">
        Use the button below to select a picture from your computer to upload to the app.
      </div>

      <input className="pictureupload-input text-center" name="image" type="file" accept="image/*" onChange={props.onSelect} />

      <br />

      {props.showUploadAlert ? (
        <div className="pictureupload-alert-area text-center">
          <div className="pictureupload-upload-alert    center">Click Upload to Continue
            <button className="pictureupload-upload-btn text-center" onClick={props.uploadFiles} disabled={!props.files}>Upload</button>
          </div>
        </div>

      ) : (
          <div></div>
        )}
    </form>

  </div>
);

export default PictureUpload;


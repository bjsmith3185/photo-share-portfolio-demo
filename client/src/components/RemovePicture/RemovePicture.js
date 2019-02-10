import React from "react";
import "./RemovePicture.css";
// import ExifOrientationImg from 'react-exif-orientation-img'
// import NoteInput from '../NoteInput';
// import ShowNotes from '../ShowNotes';
// import ViewSlideshowNav from '../ViewSlideshowNav';

const RemovePicture = (props) => (

  <div className="removepicture-area">

    <div className="removepicture-button" onClick={props.removeAllPictures}>Remove All Pictures</div>

  </div>

);

export default RemovePicture;


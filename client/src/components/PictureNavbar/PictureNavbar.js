import React from "react";
import "./PictureNavbar.css";

const PictureNavbar = (props) => (

    <div className="picturenavbar-container text-center">
      <span className="picturenavbar-link" onClick={props.allPictures}>All Pictures</span>
      <span className="picturenavbar-link" onClick={props.myFavorites}>My Favorites</span>
      <span className="picturenavbar-link" onClick={props.viewUpload}>Upload Picture</span>
    </div>

);

export default PictureNavbar;


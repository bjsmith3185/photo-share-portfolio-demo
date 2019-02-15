import React from "react";
import "./ViewSlideshowNav.css";

const ViewSlideshowNav = (props) => (

    <div className="viewslideshownav-area">
      <span className="viewslideshownav-btn" onClick={props.viewSlideshow}>View as SlideShow</span>
    </div>

);

export default ViewSlideshowNav;


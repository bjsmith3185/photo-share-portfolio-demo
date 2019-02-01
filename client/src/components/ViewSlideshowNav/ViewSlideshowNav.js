import React from "react";
import "./ViewSlideshowNav.css";

const ViewSlideshowNav = (props) => (

  <div>
<div className="pictureviewnav-container">
 
  <span className="pictureviewnav" onClick={props.viewSlideshow}>View as SlideShow</span>
  
</div>


  </div>
  
);

export default ViewSlideshowNav;


import React from "react";
import "./PictureLightbox.css";


const PictureLightbox = (props) => (
  <div>
   
      <div className="lightbox-container text-center" key={props._id}>
        <div className="lightbox-image-area text-center">
          <img className="lightbox-image" alt={props.name} src={props.image} />

          <div className="left-arrow" onClick={props.back}>
            <div className="arrow text-center">Back</div>
          </div>

          <div className="close-area" onClick={props.viewSlideshow}>Close</div>

          <div className="right-arrow" onClick={props.next}>
            <div className="arrow text-center">Next</div>
          </div>

        </div>
        

        <div className="lightbox-title text-center">
          {props.name}
        </div>

      </div>

  </div>

);

export default PictureLightbox;



import React from "react";
import "./RemovePicture.css";
import DeletePictureList from "../DeletePictureList";


const RemovePicture = (props) => (

  <div>
    <div className="removepicture-title text-center">Remove Pictures</div>

    {props.removeMenu ? (

      <div className="removepicture-menu-area text-center">
        <div className="removepicture-menu-btn" onClick={props.menuDeleteAll}>Remove All Pictures</div>
        <div className="removepicture-menu-btn" onClick={props.menuRemoveSelectedPic}>Remove Selected Picture</div>
      </div>

    ) : (
        <div></div>
      )}

    {props.removeAllPic ? (
      <div className="removepicture-area text-center">
        <div className="removepicture-confirm">Click to confirm you want to remove all pictures from this app.
        <button className="removepicture-btn-deleteAll" onClick={props.removeAllPictures}>Delete All Pictures</button>
        </div>

        <button className="removepicture-btn-cancel" onClick={props.cancelDeletePic}>Cancel</button>
        

      </div>
    ) : (
        <div></div>
      )}

    {props.removeSelectedPic ? (
      <div className="removepicture-area text-center">
    
        <DeletePictureList
          pictures={props.pictures}
          confirmSelected={props.confirmSelected}
          selectPicDelete={props.selectPicDelete}
          // confirmSelectedPicDelete={props.confirmSelectedPicDelete}
          cancelDeletePic={props.cancelDeletePic}
          preDeleteSelectedPic={props.preDeleteSelectedPic}
          tempImageUrl={props.tempImageUrl}

        />

      </div>
    ) : (
        <div></div>
      )}


  </div>
);

export default RemovePicture;


import React from "react";
import "./DeletePictureList.css";

const DeletePictureList = (props) => (

  <div>
    <div className="removepicture-top-area text-center">
      <div className="removepicture-title-top">Select a picture below to remove it from this app.</div>

      {props.confirmSelected ? (
        <div className="removepicture-subtitle">Removing a picture is permanent
        <button className="removepicture-btn-cancel-top" onClick={props.cancelDeletePic}>Cancel</button>
          <br />
          <div className="removepic-temp-image-area">
            <img alt={props._id} className="removepic-temp-img text-center" style={{ transform: `rotate(${props.rotation}deg)` }} src={props.tempImageUrl} width="100" height="100" />
            <button className="deletepic-btn" onClick={props.selectPicDelete}>Delete</button>
          </div>
        </div>
      ) : (
          <div>

            <div className="removepicture-image-area">
              {props.pictures.map(image => (
                <div className="list-li-del" key={image._id}>

                  <img alt={image._id} className="picurelist-img text-center" style={{ transform: `rotate(${props.rotation}deg)` }} src={image.imageUrl} width="100" height="100" />

                  <div className="picturelist-toolbar">
                    <div className="deletepic-name">{image.name}</div>

                    <div className="deletepic-btn" onClick={() => props.preDeleteSelectedPic(image._id, image.awsKey, image.imageUrl)}>X</div>

                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

    </div>

  </div>

);

export default DeletePictureList;


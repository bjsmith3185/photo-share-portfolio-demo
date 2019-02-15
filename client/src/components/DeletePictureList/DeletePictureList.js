import React from "react";
import "./DeletePictureList.css";
import MyModal from '../MyModal';

const DeletePictureList = (props) => (

  <div>
    <div className="removepicture-top-area text-center">
      <div className="removepicture-title-top">Select a picture below to remove it from this app.</div>
      <div className="removepicture-subtitle">Removing a picture is permanent
        <button className="removepicture-btn-cancel-top" onClick={props.cancelDeletePic}>Cancel</button>
      </div>
    </div>




    <div className="removepicture-image-area">
      {props.pictures.map(image => (
        <div className="list-li-del" key={image._id}>

          <img alt={image._id} className="picurelist-img text-center" style={{ transform: `rotate(${props.rotation}deg)` }} src={image.image} width="100" height="100" />

          <div className="picturelist-toolbar">
            <div className="deletepic-name">{image.name}</div>

            {/* <div className="deletepic-btn" onClick={props.confirmSelectedPicDelete}>X</div> */}

            <MyModal
              _id={image._id}
              selectPicDelete={props.selectPicDelete}

            />

            {/* {props.confirmSelected ? (
              <div className="deletepic-btn" onClick={() => props.selectPicDelete(image._id)}>Delete</div>
            ) : (
                <div className="deletepic-btn" onClick={props.confirmSelectedPicDelete}>X</div>
              )} */}

          </div>

        </div>
      ))}
    </div>
  </div>

);

export default DeletePictureList;


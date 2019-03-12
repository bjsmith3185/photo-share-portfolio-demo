import React from "react";
import "./PictureList.css";
// import ExifOrientationImg from 'react-exif-orientation-img'
import NoteInput from '../NoteInput';
import ShowNotes from '../ShowNotes';
// import ViewSlideshowNav from '../ViewSlideshowNav';

const PictureList = (props) => (


  <div>

    {/* <ViewSlideshowNav
      viewSlideshow={this.viewSlideshow}
    /> */}

    {props.pictures.map(image => (
      <div className="list-li" key={image._id}>
     
        <img alt={image._id} className="picurelist-img text-center" style={{ transform: `rotate(${props.rotation}deg)` }} src={image.picture.imageUrl} width="200" height="200" />

        <div className="picturelist-toolbar">
          <div className="picturelist-rotate text-center" onClick={() => props.rotate(image.picture._id)}>&#8631;</div>

          <div className="picturelist-fav text-center" onClick={() => props.addToFavorites(image.picture._id)}>

            {image.showRed ? (
              <div className="heart"></div>
            ) : (
                <div className="plus">&#9825;</div>
              )}

          </div>
        </div>

        <div className="picturelist-info text-center">{image.picture.name}

        </div>

        <ShowNotes
          notes={image.picture.notes}
        />


        {/* This is the new open textbox code  */}

        <div className="picturelist-note">
          {image.openTextBox ? (

            <NoteInput
              note={props.note}
              onChange={props.onChange}
              addNote={props.addNote}
              picture_id={image.picture._id}
              seeNoteInput={props.seeNoteInput}
              _id={image._id}
              openTextBox={image.openTextBox}

            />
          ) : (
              <div className="picturelist-noteinput-button text-center" onClick={() => props.seeNoteInput(image._id, image.openTextBox)}>Add Note</div>

            )}
        </div></div>
    ))}
  </div>

);

export default PictureList;


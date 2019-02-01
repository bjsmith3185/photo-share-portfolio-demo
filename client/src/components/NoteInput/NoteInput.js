import React from "react";
import "./NoteInput.css";


const NoteInput = (props) => (

  <div className="noteinput-area ">
    <input
      className="noteinput-box"
      name="note"
      value={props.note}
      onChange={props.onChange}
      type="text"
      placeholder="Add Note..."
    />
    <br />

    <div className="noteinput-buttonbar">
      <div className="noteinput-button text-center" type="submit" onClick={() => props.addNote(props.picture_id, props._id)}>
        Add Note
        </div>

      <span className="noteinput-close" onClick={() => props.seeNoteInput(props._id, props.openTextBox)}>X</span>

    </div>



  </div>

);

export default NoteInput;



import React from "react";
import "./ShowNotes.css";


const ShowNotes = (props) => (

  <div className="shownote-area">
    {props.notes.map(note => (

      <div key={note._id} className="shownote-textbox">
        
        <div className="shownote-entry">{note.text}</div>

        <div className="shownote-author">{note.author.name}</div>
        
      </div>
    ))}
  </div>

);

export default ShowNotes;



import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext); // context intiialized
  const { deleteNote } = context; // deleteNote function used from NoteState
  const { note, updateNote } = props; // props destructuring

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            {/* Note title and description is shown along with update note and delete note icon */}
            <i
              className="far fa-edit mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
            <i
              className="far fa-trash-alt mx-1"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;

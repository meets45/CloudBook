import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3001";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    let url = `${host}/api/notes/fetchnotes`;
    const response = await fetch(url, {
      // fetches notes according to url and headers passed
      method: "GET",
      headers: {
        // auth-token is taken from localStorage
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // notes are set according to response
    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    let url = `${host}/api/notes/addnotes`;
    const response = await fetch(url, {
      // response is posted and note is added to specfic user's account according to headers passed
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // auth-token is taken from localStorage
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
    // according to response note is added to existing notes
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      // note is edited according to id given
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // auth-token is taken from localStorage
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ id, title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    // new note is edited if id is matched to that of existing note
    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    // new note is set here
    setNotes(newNotes);
  };

  //Delete a note
  const deleteNote = async (id) => {
    let url = `${host}/api/notes/deletenotes/${id}`;
    // note is deleted according to id given here
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // auth-token is taken from localStorage
        "auth-token": localStorage.getItem("token"),
      },
    });

    const newNotes = notes.filter((note) => {
      // all notes except that with same id as id passed is returned
      return note._id !== id;
    });

    const json = await response.json();
    console.log(json);
    // new notes is set here
    setNotes(newNotes);
  };

  const [user, setUser] = useState({ name: "", email: "", date: "" });

  const getUser = async () => {
    const response = await fetch("http://localhost:3001/api/auth/getuser", {
      // all details of user except password is displayed here
      method: "POST",
      headers: {
        // auth-token is taken from localStorage
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    // user is set according to response
    setUser({ name: json.name, email: json.email, date: json.date });
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNotes, getUser, user }}
    >
      {/* noteContext is exported from here with name of function and state as value */}
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;

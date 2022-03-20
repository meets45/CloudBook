import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3001"
const notesInitial = [];
const [notes, setNotes] = useState(notesInitial);

const getNotes = async() =>{
  let url = `${host}/api/notes/fetchnotes` 
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyOGI0YTMyZWE4OWQyOWI5YmQ4Nzc0In0sImlhdCI6MTY0NzM2ODUzN30.5YQE3UJOa2RDMqNLy4BU_yqhwpn-YcmtppxqS0kGsMk'
      },
    });
 const json = await response.json();
setNotes(json);
}
  //Add a note
  const addNote = async (title, description, tag) => {
    let url = `${host}/api/notes/addnotes` 
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyOGI0YTMyZWE4OWQyOWI5YmQ4Nzc0In0sImlhdCI6MTY0NzM2ODUzN30.5YQE3UJOa2RDMqNLy4BU_yqhwpn-YcmtppxqS0kGsMk'
      },
      body: JSON.stringify({title, description, tag})
    });
    
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  //Edit a note
  const editNote = async (id, title, description, tag) => { 
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyOGI0YTMyZWE4OWQyOWI5YmQ4Nzc0In0sImlhdCI6MTY0NzM2ODUzN30.5YQE3UJOa2RDMqNLy4BU_yqhwpn-YcmtppxqS0kGsMk'
      },
      body: JSON.stringify({id, title, description, tag})
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  //Delete a note
  const deleteNote = async (id) => {
    let url = `${host}/api/notes/deletenotes/${id}` 
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyOGI0YTMyZWE4OWQyOWI5YmQ4Nzc0In0sImlhdCI6MTY0NzM2ODUzN30.5YQE3UJOa2RDMqNLy4BU_yqhwpn-YcmtppxqS0kGsMk'
      }
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    const json = await response.json();
    console.log(json);
    setNotes(newNotes);
  };
  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;

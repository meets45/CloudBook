import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
            {
              "_id": "6232456931790bceecc17b34",
              "user": "6228b4a32ea89d29b9bd8774",
              "title": "My First Note",
              "description": "This is my first note at 01:42 AM",
              "tag": "Personal",
              "date": "2022-03-16T20:15:37.791Z",
              "__v": 0
            }
          ]
    const [notes, setnotes] = useState(notesInitial)
return(
    <noteContext.Provider value={{notes, setnotes}}>
    {props.children}
    </noteContext.Provider>
)
}

export default NoteState;
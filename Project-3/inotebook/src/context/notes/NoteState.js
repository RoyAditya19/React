import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host = "http://localhost:4000"
    // const notesInitial = [
    //     // {
    //     //     "_id":"658fb3ccf63df4537ec24871",
    //     //     "user": "658a9f872366b7b6056614d9",
    //     //     "title": "my title again3",
    //     //     "description": "please wake up at 6am again3",
    //     //     "tag": "personal",
    //     //     "date":  "2023-12-30T06:08:12.064Z",
    //     //     "__v": 0
    //     //   },
    //     // {
    //     //     "_id":"658fb3cc63df45g37e5c24871",
    //     //     "user": "658a9f872366b7b6056614d9",
    //     //     "title": "my title again3",
    //     //     "description": "please wake up at 6am again3",
    //     //     "tag": "personal",
    //     //     "date":  "2023-12-30T06:08:12.064Z",
    //     //     "__v": 0
    //     //   },
    //     // {
    //     //     "_id":"658fb3cc6ydf4537e5c24871",
    //     //     "user": "658a9f872366b7b6056614d9",
    //     //     "title": "my title again3",
    //     //     "description": "please wake up at 6am again3",
    //     //     "tag": "personal",
    //     //     "date":  "2023-12-30T06:08:12.064Z",
    //     //     "__v": 0
    //     //   },
    //     // {
    //     //     "_id":"658fb3cc63df4537r5c24871",
    //     //     "user": "658a9f872366b7b6056614d9",
    //     //     "title": "my title again3",
    //     //     "description": "please wake up at 6am again3",
    //     //     "tag": "personal",
    //     //     "date":  "2023-12-30T06:08:12.064Z",
    //     //     "__v": 0
    //     //   },
    //     // {
    //     //     "_id":"658fb3cc63dfe537e5c24871",
    //     //     "user": "658a9f872366b7b6056614d9",
    //     //     "title": "my title again3",
    //     //     "description": "please wake up at 6am again3",
    //     //     "tag": "personal",
    //     //     "date":  "2023-12-30T06:08:12.064Z",
    //     //     "__v": 0
    //     //   }
    // ]
    const [notes, setNotes] = useState([])
    // const s1 = {
    //     "name": "Harry",
    //     "class": "5b"
    // }
    // const [state, setState] = useState(s1);
    // const update = ()=>{
    //     setTimeout(() => {
    //         setState({
    //             "name": "Hauaua",
    //             "class": "10b"
    //         })
    //     }, 1000);
    // }



    //Get all note

    const getNotes = async()=>    //all the functions here like getnotes, addnote, deletenote will be now exported by mentioning them in the value of NoteContext.Provider
                                  //now as this function was exported it was imported by Notes.js using the useContext. after importing using useEffect it was used to extract all the notes and display to the user based on the user
    {
                //API CALL
                 const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                     method: 'GET',
                     headers: {
                         'Content-Type': 'application/json',
                         "auth-token" :localStorage.getItem('token')
                     },
                 });
         const json = await response.json();
        // console.log(json)
         setNotes(json)
    }


    //Add note
    const addNote = async(title, description, tag)=>
    {
                //API CALL
                 const response = await fetch(`${host}/api/notes/addnote`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                       "auth-token" :localStorage.getItem('token')
                    },
                    body: JSON.stringify({title,description,tag})           //here all the three things have been passed bcoz while making an api call we were/have (to) passing/pass title description tag so that the notes can be added successfully. same goes with edit note.
                });
        const note = await response.json();
        setNotes(notes.concat(note))
    }


    //Delete a note
    const deleteNote = async (id)=>
    {
                   //API CALL
                   const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token" :localStorage.getItem('token')
                    },
                });
        const json =  response.json();
        console.log(json)


       const newNotes = notes.filter((note)=>{return note._id!==id})
       setNotes(newNotes)
    }



    //Edit Note
    const editNote = async(id,title,description,tag)=>
    {
        // //API CALL
         const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
             method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token" :localStorage.getItem('token')
            },
           body: JSON.stringify({title,description,tag})
         });
         // eslint-disable-next-line
        const json = response.json();
        console.log(json)

        let newNotes= JSON.parse(JSON.stringify(notes))         //this makes the deep copies of the data and now this newNotes now reflect the changes(changing the old notes to new notes) in backend as well as front-end
        //Logic for editing in client
    for(let index=0; index<newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;

            }
        }
        setNotes(newNotes);
    }
    return (
        // <NoteContext.Provider value={{state, update}}>
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
import React,{useContext, useState} from 'react';
import NoteContext from "../context/notes/NoteContext";


export default function AddNote(props) {
    const context = useContext(NoteContext);
    const { addNote } = context;              //addnote function imported from notestate

    const [note, setNote] = useState({title: "",description: "",tag: ""})
    const handleClick = (e)=>
    {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);    //when this was called, note was updated using setnote(written below in the onchange function)
        setNote({title: "",description: "",tag: ""})        //this was used so that when the notes has been added then the input section should become empty. and along with this line i also added (value={note.title}..etc) in the input sections.
        props.showAlert("Added Successfully", "success")
    }
    const onChange = (e)=>
    {
        setNote({...note, [e.target.name]: e.target.value})   //this was used to update the input section(from blank to typed)
    }
  return (
    <>
     <div className="container my-3">
      <h2>Add Your Notes</h2>
      <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={5} required/>
  </div>
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div> 
    </>
  )
}

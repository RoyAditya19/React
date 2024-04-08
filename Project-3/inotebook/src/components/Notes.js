import React, { useContext,useEffect,useRef,useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";       //instead of useHistory, useNavigate was used

const Notes = (props) => {
  const context = useContext(NoteContext);      
  const { notes, getNotes,editNote } = context; //we have taken all the states/functions(defined in the notestate.js file) in the context using usecontext function
  let navigate = useNavigate();
  useEffect(() => {       //it basically allows you to perform side effects in the components, like here it is fetching the data. 
    if(localStorage.getItem('token'))       //if there is a token present then only the the getnotes will called(notes will be fetched), else the user will be directed to login page
    {
      getNotes()
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)      //this hook actually opens a modal when clicked on edit button present in the noteitem. the modal should have been opened by clicking on any other button(present on the modal section) but on that button ref={ref} is used(see below) and when the edit button is clicked, it shoots the updatenote function which consist of a command(ref.current.click) that opens the modal without clicking on that button which should actually open the model.
  const refClose = useRef(null) //this hook closes the modal when clicked on save changes button present in the modal. here also same strategy is used as above to close the modal. when clicked on savechanges button present in the modal it actually also performs the functionality provided by close button(present in modal) without clicking on it.
  const [note, setNote] = useState({id:"",etitle: "",edescription: "",etag: ""})    //this  "note" thing is used only for the modal thing and for noteitem "notes"(imported from notestate) has been used.

//how the above usestate and the modal(to change the existing notes)works: at first the note is empty(as shown above), now as soon as the edit button in the noteitem get's clicked updatenote(function) is called with the argument (notes), now this notes which is passed as an argument it comes here and is used as "currentnote".
//now the etitle,edescription gets the value of currentnote.title,description(from the existing notes(displayed in the front end)). and now we are able to edit/add notes with the help of onchange function(at this point the setnote was called and note(used in the usestate method) was updated with the modified values). now when the savechanges button of modal get's clicked(at this point the values stored in note(of usestate)is the updated value) the handleclick function gets into picture which passes the notes as an argument to editnote function(by extracting the values from note(displayed in usestate)) in notestate.
  const updateNote=(currentNote)=>{
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})    //this sets the tags(title,description etc) in the modal(which opens on clicking edit) to the value which is stored in the notes and that notes is referred as currentnote here 
  }

  //when the savechanges button is clicked the modal gets closed as the refclose.current.click function is already used, also the notes gets edited as the editnote function from notestate is extracted here using context.
  const handleClick = (e)=> 
    {
      refClose.current.click();
      editNote(note.id, note.etitle, note.edescription, note.etag);
      props.showAlert("Updated Successfully", "success");
    }

    //while writing the values in the modal what it does is it keeps the previous values and then after that it adds the new value added to it. "...note" represents that keep the previous note as it is.
    const onChange = (e)=>
    {
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <>
    <AddNote showAlert={props.showAlert}/>
<button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">Launch demo modal</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>   {/* the value=note.title below stores the value same as the value in notes which is displayed in the frontend*/}
    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
      <h2>Review Your Notes</h2>
      <div className="container">
        {notes.length === 0 && 'No notes to display'}
      </div>
      {notes.map((notes) => {
        return <Noteitem notes={notes} key={notes._id} updateNote={updateNote} showAlert={props.showAlert}/>;
      })}
    </div>
    </>
  );
};

export default Notes;

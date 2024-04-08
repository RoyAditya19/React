import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";


const Noteitem = (props) => {
    const context = useContext(NoteContext)
    const {deleteNote} = context;           //for deleting the notes this function was imported from notestate
  const { notes,updateNote } = props;       //for updating/editing the existing notes updatenote function was taken from parent to child component as props
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{notes.title}</h5>  {/*for displaying the title of the notes it was extracted from the notes passed as props */}
          <p className="card-text">{notes.description} </p>
          <i className="fa fa-edit mx-2" onClick={()=>{updateNote(notes)}} ></i>      {/* when this function was hit the model was launched and also the default(existing) value of the notes was stored */}
          <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(notes._id);
            props.showAlert("Deleted Successfully", "success")
          }}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;

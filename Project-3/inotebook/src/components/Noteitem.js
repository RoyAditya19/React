import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";


const Noteitem = (props) => {
    const context = useContext(NoteContext)
    const {deleteNote} = context;
  const { notes,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{notes.title}</h5>
          <p className="card-text">{notes.description} ispernatur necessitatibus accusantium totam nobis placeat laudantium cupiditate voluptates delectus modi omnis nesciunt quaerat cumque soluta inventore autem quibusdam quam! Minus, laudantium.</p>
          <i className="fa fa-edit mx-2" onClick={()=>{updateNote(notes)}} ></i>
          <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(notes._id);
            props.showAlert("Deleted Successfully", "success")
          }}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;

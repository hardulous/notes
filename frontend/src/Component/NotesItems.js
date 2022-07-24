
import React, { useContext } from "react";
import NoteContext from "../Context/NoteContext";

const NotesItems = (props) => {
  const { note , updateNote } = props;

  const context = useContext(NoteContext);
  const {deleteNote} = context;

  return (

    <div className="col-md-4">

      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title"> {note.title}</h5>
          <p className="card-text">
           {note.description} , Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto quos distinctio est accusantium veniam hic, vel debitis, recusandae possimus iure aperiam sit. Eos eligendi recusandae soluta, dicta impedit maxime? Quisquam eum ipsum reprehenderit minus.   
          </p>
           {/* using font awesome icon to make delete and edit note */}
          <div className="d-flex justify-content-between">

            {/* here when we click on this delete icon will call context deleteNote() of context and also call Alert */}

            <i className="far fa-trash-alt mx-2" 

               onClick={()=>

                 {deleteNote(note._id);
                 props.ShowAlert("success","Note is Deleted");

              }}></i>

            <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>

        </div>
      </div>

    </div>
  );
};

export default NotesItems;

import React from "react";
import NoteContext from "../Context/NoteContext";
import { useContext, useEffect } from "react";
import NotesItems from "./NotesItems";
import { AddNote } from "./AddNote";
// using useRef hook
import { useRef , useState} from "react";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
   
  console.log("Notes Component")
  
  // using context api
  const context = useContext(NoteContext);
  const { notes, getNotes , editNote} = context;

  let navigate = useNavigate()

  const refObj1 = useRef(null); // for opening modal
  const refObj2 = useRef(null); // for closing modal
  const [note, setnote] = useState({_id:"",etitle:"",edescription:"",etag:""});

  useEffect(() => {
    
    // fetch data only if user is logged in as then only token is present
    if(localStorage.getItem('token')){
       
        getNotes();
        setTimeout(() => {
      
          props.ShowAlert("success","Notes are Fetched");

       }, 2000);

    }
    else{
      
      // if not login then re-direct user to login 
      navigate("/login");

    }
    

  }, []);

  // for update note
  const updateNote = (currentNote) => {
    refObj1.current.click(); // to access referring node do .current
    setnote({_id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  };
  
  // method to edit a note
  const handleClick =(e)=>{
    
    refObj2.current.click(); // to close the modal 
    e.preventDefault(); // now page will not reload 
    editNote(note._id,note.etitle,note.edescription,note.etag);
    props.ShowAlert("success","Note is Updated");

  } 

  const onChange= (e)=>{
     
    // USING SPREAD OPERATOR 
    setnote({...note,[e.target.name]: e.target.value});
  }

  return (
    <div className="row my-3">
      <AddNote ShowAlert={props.ShowAlert}/>

      {/* modal for update notes */}

      <button
        type="button"
        className="btn btn-primary d-none" // now this button is hidden
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={refObj1} // useRef hook  and now my refObj is reffering to this whole button node of DOM
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* edit note form */}
            <div className="modal-body">
              <form className="my-4">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                    minLength={5}
                    required={true}
                  />
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refObj2}
              >
                Close
              </button>

                {/* not allow to add if length of title and des is < 5 */}
              <button type="button" disabled={note.etitle.length<5 || note.edescription.length <5 ? true:false} className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1>Your Notes</h1>

      {/* if no notes is present */}
      {notes.length===0 && <h2>!No Notes to Display</h2>}

      {/* fetching and showing notes in these div */}

      {notes.map((element) => {
        return (
          <NotesItems
            note={element}
            key={element._id}
            updateNote={updateNote}
            ShowAlert={props.ShowAlert}
          />
        );
      })}
    </div>
  );
};

export default Notes;

// ###### useRef() HOOK:::

// useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.

// Essentially, useRef is like a “box” that can hold a mutable value in its .current property.
// You might be familiar with refs primarily as a way to access the DOM. If you pass a ref object to React with <div ref={myRef} />, React will set its .current property to the corresponding DOM node whenever that node changes.

// The only difference between useRef() and creating a {current: ...} object yourself is that useRef will give you the same ref object on every render.

// Keep in mind that useRef doesn’t notify you when its content changes. Mutating the .current property doesn’t cause a re-render.

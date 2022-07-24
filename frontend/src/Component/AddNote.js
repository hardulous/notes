
import React from "react";
import { useContext } from "react";
import NoteContext from "../Context/NoteContext";
import { useState } from "react";
import Notes from "./Notes";

const AddNote= (props) => {

  const context = useContext(NoteContext);
  const {addNotes} = context;

  // this component state variable for adding a note
  const [note, setnote] = useState({title:"",description:"",tag:""});

  // method to add a note
  const handleClick =(e)=>{
    
    e.preventDefault(); // now page will not reload 
    addNotes(note.title,note.description,note.tag);
    // after one note added empty the whole 
    setnote({title:"",description:"",tag:""});
    props.ShowAlert("success","Note is Added");

  } 

  // here what happend by using spread operator whatever value present in note remain but if onChange executed then new value of either title and description  can be added and override the value of title and description present in note state
  const onChange= (e)=>{
    
    // here .target.name is equal to name field of input 
    setnote({...note,[e.target.name]: e.target.value});

  }

  return (

    <div>

      <div className="container my-3">
        <h1>Add a Note</h1>

        <form className="my-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required={true}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required={true}
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              minLength={5}
              required={true}
              value={note.tag}
            />
          </div>

          {/* not allow to add if length of title and des is < 5 */}
          <button type="submit" disabled={note.title.length<5 || note.description.length <5 ? true:false} className="btn btn-primary"onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>

    </div>

  );

};

export {AddNote};

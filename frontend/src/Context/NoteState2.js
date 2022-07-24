// state variables for Note


import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState2 = (props)=>{
    
    console.log("Note Context Component")

     // my url and server for backend 
     const host = "http://localhost:5000"

    // assume this data is coming from our API , but now this notesInitial will come from Fetch API 
     const notesInitial = []
      
        // state variable which contain all notes as default value and setnotes to update the notes  
        const [notes, setnotes] = useState(notesInitial);
     
    
    // 1. method to fetch all notes of a user by API CALL 
    const getNotes = async ()=>{
         
      const url = `${host}/api/notes/fetchAllNotes`;
      const response = await fetch(url, {

        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')

        }, 
        });
      
      const json = await response.json(); 
      console.log(json);
      setnotes(json);
    }

     
    // 2. method to add a note by API CALL
      const addNotes = async (title,description,tag)=>{
         
        const url = `${host}/api/notes/addnotes`;
        const response = await fetch(url, {

          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')

          },

          body: JSON.stringify({title,description,tag}) 
          });
        
      
        const json = await response.json();
        
        setnotes(notes.concat(json));  // here concat update immutabully because note.concat return a new array wherease .push update an array that is mutabally and in state variable put new thing always not by updating previous directly  

      }

    // 3. method to delete a note by API CALL
       const deleteNote = async (id)=>{

        const url = `${host}/api/notes/DeleteNote/${id}`;
        const response = await fetch(url, {

          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')

          },

          });
        
        // here this filter will return all object of array note with _id!=id
        const newNote = notes.filter((notes)=>{ return notes._id!==id});
        console.log(newNote);
        setnotes(newNote); // contain updated notes and deleted a note

       }

    // 4. method to edit a note by API CALL 
       const editNote = async (id,title,description,tag)=>{
            
           const url = `${host}/api/notes/updateNote/${id}`;
           const response = await fetch(url, {

             method: 'PUT', 
             headers: {
               'Content-Type': 'application/json',
               'auth-token': localStorage.getItem('token')
  
             },

             body: JSON.stringify({title,description,tag}) 
             });
          
          let newNotes = JSON.parse(JSON.stringify(notes)); // return new copy of notes , have to create new because we can not edit state variable directly
        
          for (let i = 0; i < newNotes.length; i++) {

              if(newNotes[i]._id==id){
                newNotes[i].title=title;
                newNotes[i].description=description;
                newNotes[i].tag=tag;

                break;
              }
            
          }
          setnotes(newNotes);  

        }

    return (
        
        // here making this context available to all component who is child of this NoteState component and inside it   

        <NoteContext.Provider value={{notes , setnotes ,addNotes,deleteNote,editNote,getNotes}}>
         
         {props.children} 

        </NoteContext.Provider>

    )

}

export default NoteState2;

// now while making api call like addNote call it show some CORS POLICY ERROR so fixed it by downloading package npm install cors in backend folder and in index.js of your backend folder paste this::
 
// var cors = require('cors')
// var app = express()
// app.use(cors())
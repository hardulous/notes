
import React from "react";
import { useContext } from "react";
import NoteContext from "../Context/NoteContext";
import Notes from "./Notes";

export const Home = (props) => {
  
  console.log("Home Component")

  return (
     
    <div>

       {/* fetch and show all notes of user */}
       <Notes ShowAlert={props.ShowAlert}/>


    </div>
  );
};

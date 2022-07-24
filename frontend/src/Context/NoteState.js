// state variables for Note


import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
    
    // this state variable is value as new value of NoteContext when used in other component  
    const s1 ={
        
        name:"aman",
        class:"10a"
    }

    // method to update this state of context
     const [state, setState] = useState(s1);
     const update = ()=>{

        setTimeout(() => {
            
            setState({
                
              name:"ACEY",
              class:"9a"
                
            })

        }, 4000);
     }



    return (
        
        // now this NoteContext obj is passed to other component with value state obj and have method update 
        <NoteContext.Provider value={{state , update}}>
         
         {/* here whatever this props.children either variable,function and other component can now have access to this NoteContext  */}
         {props.children} 

        </NoteContext.Provider>

    )

}

export default NoteState;

import React from 'react'
// imorting useContext() hook
import { useContext , useEffect} from 'react'
import NoteContext from '../Context/NoteContext'

export const About = () => {

    const a = useContext(NoteContext);

    useEffect(() => {

       a.update();

    },[]);
   
    return (

        <div>

            <h1>{a.state.name} is a student of class {a.state.class}</h1>

        </div>

    )
    
}

// using Context-API

import { createContext } from "react";

const NoteContext = createContext(); // creating a context with default value is empty that will hold all states variables then can be used in any level component without passing props 

export default NoteContext;
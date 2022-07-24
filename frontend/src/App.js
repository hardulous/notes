import "./App.css";
import React , {useState} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./Component/Navbar";
import { Home } from "./Component/Home"; // arrow function based component is imported as hook 
import { About2 } from "./Component/About2";
import NoteState2 from "./Context/NoteState2";
import Alert from "./Component/Alert";
import Login from "./Component/Login";
import Signup from "./Component/Signup";

function App() {
  
  console.log("App Component");
  
  // state variable for Alert component
  const [alert, setalert] = useState(null);
  
  const ShowAlert =(type,messasge)=>{

    setalert({

      type:type,
      msg:messasge
    })
    // and after 3 sec alert will be removed
    setTimeout(() => {
      
      setalert(null);

    }, 3000);

  }
   

  return (

    <> 

        <NoteState2>
           
           {/* here all Router and component is inside NoteState2 component so now my context api is available to all component  */}
          
          {/* HERE IF ANY OF ROUTE GET CHANGED THEN COMPONENT INSIDE ROUTER COMPONENT WILL RE-RENDER AND TO USE useLocation and useNavigate and other component of react-router the component must be inside Router Component */}
          <Router>
        
               <Navbar />
               <Alert Alert={alert}/>
          
            <div className="container">

               <Routes>
                 
                 <Route path="/" element={<h1 style={{textAlign:"center"}}>WELCOME TO iNoteBook</h1>}></Route>
                 <Route  exact path="/home" element={<Home ShowAlert={ShowAlert}/>}></Route> 
                 <Route  exact path="/about" element={<About2/>}></Route>
                 <Route  exact path="/login" element={<Login ShowAlert={ShowAlert}/>}></Route>
                 <Route  exact path="/signup" element={<Signup ShowAlert={ShowAlert}/>}></Route>

               </Routes>

            </div>

          </Router>    

        </NoteState2>

    </>

  );

}

export default App;

// here to run both server that is react server and backend serve download package npm i concurrently , i have made a command both which can be done by go in packag.json of react file and in script section write command of your choose here it is both and mention command run by this command 

// ###### CONTEXT-API::

// Context provides a way to pass data through the component tree or nested component without having to pass props down manually at every level.

// let say i have app.js component which contain state variable and inside it there are many component and inside this component more component are present now i have to pass some data to most deep down component so i have to sent by passing props manually which take time so to solve this context api is used and by this a context is create by .createContext and if any component want to used it and used it with different value can use it by calling useContext(value) hook and now component is props independent . and we can create more than one context.

// disadvantage = Context is primarily used when some data needs to be accessible by many components at different nesting levels. Apply it sparingly because it makes component reuse more difficult.




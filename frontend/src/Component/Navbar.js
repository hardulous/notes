
import React , {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

import { useLocation} from "react-router-dom";


const Navbar = () => {

  console.log("Navbar Component");
  const location = useLocation(); 
  const navigate = useNavigate();
  
     useEffect(() => {
     
       console.log(location , location.pathname);

      },[location]); // here execute if value of location changes 
    
    // to log out
    const handleLogOut =()=>{

      localStorage.clear(); // remove auth token from storage 
      navigate("/login");
 
    }

  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                
                {/* now active if we are currently at home page and same if at about page */}
                <Link className={`nav-link ${location.pathname==="/home"?"active":""}`} aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`}to="/about">
                  About
                </Link>
              </li>
            </ul>
            
            {/* now if user has logged in then show loout button otherwise show login button*/}

            { !localStorage.getItem('token') ? <form className="d-flex">

                 <Link className="btn btn-primary mx-2" to="/login" role="button">Log-In</Link>
                 <Link className="btn btn-primary" to="/signup" role="button">Sign-Up</Link>

             </form>
             : <button className="btn btn-primary" to="/signup" role="button" onClick={handleLogOut}>Log-Out</button>
            }  

          </div>
        </div>
      </nav>
    </div>

  );
  
};

export default Navbar;

// #### useLocation()

// This hook returns the location object used by the react-router. This object represents the current URL and is immutable. Whenever the URL changes, the useLocation() hook returns a newly updated location object. to learn more go to website https://www.geeksforgeeks.org/react-router-hooks/
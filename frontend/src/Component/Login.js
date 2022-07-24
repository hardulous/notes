
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
    
    console.log("Login Component")

    const [credential, setcredential] = useState({email:"",password:""})
    
    let navigate = useNavigate()
    
    const onChange= (e)=>{
       
        setcredential({...credential,[e.target.name]: e.target.value});
        ;
    }

    const handleSubmit = async (e)=>{
       
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {

            method: 'POST',

            headers: {

              'Content-Type': 'application/json'

            },
  
            body: JSON.stringify({email:credential.email,password:credential.password}) 
            });

        const json = await response.json();  // this will send auth token for user which is JWT
        console.log(json);  
         
        if(json.success){
           
            // save the auth token and redirect to User Notes Page
            localStorage.setItem("token",json.authToken);
            props.ShowAlert("success","Successfully Logged In");
            navigate("/home");
        }
        else{

          props.ShowAlert("danger","Invalid Credential");

        }

    }

  return (

    <div>

      {/* by onSubmit and e.preventDefault form will not submit */}
      <form onSubmit={handleSubmit}> 

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credential.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credential.password}
            onChange={onChange}
          />
        </div>
       
        <button type="submit" className="btn btn-primary">
          Submit
        </button>

      </form>
      
    </div>
  );
};

export default Login;

// NOW here we cannot use useHistory() hook because 6

// This has changed in v6, useHistory is now useNavigate and we can use it as follows:

// instead of:

// const history = useHistory()
// history.push('/')
// we now use:

// const navigate = useNavigate()
// navigate('/')

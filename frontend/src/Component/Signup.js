
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    
    console.log("Sign-Up Component")

    const [credential, setcredential] = useState({name:"", email:"",password:"",cpassword:""})
    
    let navigate = useNavigate()

    const onChange= (e)=>{
     
        setcredential({...credential,[e.target.name]: e.target.value});
      
    }
    
    const {name,email,password} = credential;
    
    const handleSubmit = async (e)=>{
       
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {

            method: 'POST',

            headers: {

              'Content-Type': 'application/json'

            },
  
            body: JSON.stringify({name, email, password}) 

            });

        const json = await response.json();  // this will send auth token for user which is JWT
        if(json.success){
           
            // save the auth token and redirect to User Notes Page
            localStorage.setItem("token",json.authToken);
            props.ShowAlert("success","Successfully Signed Up");
            navigate("/home");
        }
        else{
             props.ShowAlert("danger","Invalid Details or user Already Exist");
         

        }

    }

  return (

    <div>
      
      <form onSubmit={handleSubmit}>
        
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            value={credential.name}
          />
        </div>

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
            onChange={onChange}
            value={credential.email}
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
            onChange={onChange}
            value={credential.password}
            minLength={5}
            required={true}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm-Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            value={credential.cpassword}
            minLength={5}
            required={true}
          />
        </div>
        
        {/* now both password and confirm password must be same */}
        <button type="submit" disabled={credential.password!=credential.cpassword?true:false} className="btn btn-primary">
          Submit
        </button>

      </form>

    </div>

  );

};

export default Signup;

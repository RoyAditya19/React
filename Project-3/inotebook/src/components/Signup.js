import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

//the logic behind this signup is similar as that of login. refer to login.js for better understanding
const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword:"" });
  const navigate = useNavigate();
// Handles input changes for the form fields.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`http://localhost:4000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name,email,password, })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate('/');
      props.showAlert("Account Created Successfully", "success")

    } else {
      props.showAlert("Invalid Credentials", "danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
           <label htmlFor="name" className="form-label">Full Name </label>
           <input type="text" className="form-control" id="name"  name="name"  aria-describedby="emailHelp" onChange={onChange}/>
         </div>
        <div className="mb-3">
           <label htmlFor="email" className="form-label">Email Id </label>
           <input type="email" className="form-control" id="email"  name="email"  aria-describedby="emailHelp" onChange={onChange}/>
         </div>
        <div className="mb-3">
           <label htmlFor="password" className="form-label">Password </label>
           <input type="password" className="form-control" id="password"  name="password"  aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
         </div>
        <div className="mb-3">
           <label htmlFor="cpassword" className="form-label">Confirm Password </label>
           <input type="password" className="form-control" id="cpassword"  name="cpassword"  aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
         </div>
         <button type="submit" className="btn btn-primary"> Signup </button>

        </form>
      </div>
    </>
  )
}

export default Signup

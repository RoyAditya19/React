 import React, { useState } from "react";
 import { useNavigate } from "react-router-dom";

 const Login = (props) => {
   const [credentials, setCredentials] = useState({ email: "", password: "" });
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
     e.preventDefault();
     const response = await fetch(`http://localhost:4000/api/auth/login`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         email: credentials.email,
         password: credentials.password,
       }),
     });
     const json = await response.json();
     console.log(json);
     if (json.success) {
       // Save the auth token and redirect
       localStorage.setItem("token", json.authtoken);
       props.showAlert("Logged In Successfully", "success")
       navigate('/');

     } else {
      props.showAlert("Invalid Details", "danger")
     }
   };

   const onChange = (e) => {
     setCredentials({ ...credentials, [e.target.name]: e.target.value });
   };

   return (
     <>
       <form className="my-3" onSubmit={handleSubmit}>
         <div className="mb-3">
           <label htmlFor="email" className="form-label">Email </label>
           <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={onChange} aria-describedby="emailHelp"/>
         </div>
         <div className="mb-3">
           <label htmlFor="password" className="form-label">
             {" "}
             Password{" "}
           </label>
           <input type="password" className="form-control" id="password" value={credentials.password} name="password" onChange={onChange} />
         </div>
         <button type="submit" className="btn btn-primary"> Login </button>
       </form>
     </>
   );
 };

 export default Login;

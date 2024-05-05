 import React, { useState } from "react";
 import { useNavigate } from "react-router-dom";

 //at the initial stage email and password are empty(as displayed in the credentials(of usestate). now when the user is typing something then with the help of onchange function the credentials are getting updated(using setcredentials method))
 //and then these values were simpy taken from the updated credentials(of usestate below)
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





//at first this login section appears. now when the user enters the details in the form, the data(as a part of the body of the link) goes through an api call using fetch api.
//now the control goes to the auth.js file of the backend, which first takes out the email and password from the request using javascript destructuring method 
//and then checks that whether this mail(which have been received through request) is present in the database or not using mongodb command and also at the same time it fetches the details 
//of the user(if it exist) and stores in the "user" variable. if it's(mail) present it moves forward and checks whether the password given is correct or not. 
//for password checking it uses the bcrypt method. bcrypt method takes two argument: 1st- the password received through the request, 2nd- the password fetched using the user variable in which the data was stored
//now when the email and password are verified it fetches the id of the user from the "user" variable and sends it as a data to "jwt.sign" method to generate an auth-token.
//once the auth-token is generated it is sent as a response back.
//now this response is converted to a json structure and if json is a success(it means that everything has been cross-verified and the details(like auth-token) are present in the response which was sent back from the backend side),
//then the auth-token is saved to the local-storage and the user is directed to the home page and then this auth-token would be used for many purposes further 
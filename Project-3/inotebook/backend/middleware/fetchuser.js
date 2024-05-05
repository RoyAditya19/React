const jwt = require("jsonwebtoken");
const JWT_SECRET = "adiiisgoodboy";


const fetchuser = (req,res,next)=>
{
    //get the user from the jwt token and add id to req object
    const token = req.header('auth-token');         //the token contains data as user id and a secret code
    if(!token)
    {
        res.status(401).send({error: "please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);                                 //whenever a request is sent through thunderclient,the auth-token generated is also sent and here the token is getting verified
        req.user = data.user;                                                           //now we have the data of the user 
    next();                                                                         
    } catch (error) {
        res.status(401).send({error: "please authenticate using a valid token"})
        
    }
}

module.exports = fetchuser;



//let's understand how the fetchuser is functioning.
//this was basically used only for those cases which required user login. and before ensuring any facility to the user we should check that user is the right user or not.
//after login we would like to present the notes of that particular user. so the getnotes function was called once the authtoken was saved in the local storage
//now lets say getnotes function call a route named fetchallnotes which basically fetches the notes from the backend(database).
//now this fetchallnotes route contained the authtoken in the header. so the authoken was taken out by the fetchuser from the header and all the deatils of user was stored in a variable and next function was executed
//now to fetch the notes of that respective user the id of the user was used.
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
        const data = jwt.verify(token, JWT_SECRET);                                 //whenever a request is sent through thunderclient the auth-token generated is also sent and here the token is getting verified
        req.user = data.user;                                                           //now we have the data of the user 
    next();                                                                         
    } catch (error) {
        res.status(401).send({error: "please authenticate using a valid token"})
        
    }
}

module.exports = fetchuser;

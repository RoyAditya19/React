const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();

const app = express()
const port = 4000

app.use(express.json())
app.use(cors())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


// app.get('/', (req, res)=>
// {
//     res.send("hello")
// })

app.listen(port, ()=>
{
    console.log(`Your port is running at: http://localhost:${port}`)
})

//Password Hashing
//password hashing is basically conversion of your password into a set of keywords(hashed password). for example "aditya" is a password then using..
//..hashing function the hashed keyword can be "sdushy637db". hashing function is a one way function means that password can be converted into..
//.. a set of keywords using the same keywords u can not get the same password. if you give the hashed keyword to the function then it will create..
//. another hashed keyword. in this way when you store the password using hashing function your password remains secure(bcoz the plain text doesn't get copied the hashed keyword gets stored instead)
//..but people(hackers) may have table of password and hashed keywords generated for that passwords. so to prevent that what we do is, we take the..
//.. use of salt(it's a method).
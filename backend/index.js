const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const router = require('./routes')
const connectToMongo = require("./config/db")
require('dotenv').config()

const app = express()
// following was included inside the cors and then the cookie were seen in the information tab after inspecting
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}
))
app.use(express.json())
app.use("/api", router)
app.use(cookieParser())

connectToMongo()

const PORT = 8080 || process.env.PORT


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        date:{
            type:Date,
            default: Date.now
        }
    }
)
const User = mongoose.model("user", UserSchema);
//User.createIndexes();                               //using this we can make the system to throw an error when someone tries to send the duplicate value
module.exports = User
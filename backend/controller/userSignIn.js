const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')


const userSignInController = async(req,res)=>
    {

        try {
            const { email, password} = req.body;
            if(!email) {throw new Error("Please provide email")}
            if(!password) {throw new Error("Please provide password")}

            const user = await userModel.findOne({email})

            if(!user)
                {
                    throw new Error("Invalid details")
                }

            const checkpassword = await bcrypt.compare(password, user.password)

            if(checkpassword)
            {
                const tokenData = {
                        _id: user._id,
                        email: user.email
                    }
                const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: 60 * 60 * 10});

                const tokenOption={
                    httpOnly: true,
                    secure: true
                }
                res.cookie("token", token,tokenOption).json({
                    message: "Login success",
                    data: token,
                    success: true,
                    error: false
                })
            }
            else
            {
                throw new Error("Invalid Credentials")
            }
            
        } catch (error) {
            res.json({
                message: error.message || error,
                error:true,
                success:false,
            })
        }
    }



    module.exports = userSignInController
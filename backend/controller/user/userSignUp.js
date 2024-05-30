const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");



const userSignUpController = async(req,res)=>
    {
        try {
            const { name, email, password} = req.body;

            const user = await userModel.findOne({email})

            if(user)
                {
                    throw new Error("User exists already.")
                }

            if(!email) {throw new Error("Please provide email")}
            if(!password) {throw new Error("Please provide password")}
            if(!name) {throw new Error("Please provide name")}
            

            const salt = await bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hashSync(password, salt)

            if(!hashPassword)
                {
                    throw new Error("Something is wrong")
                }
            
            const payload = 
            {
                ...req.body,
                role: "GENERAL",
                password: hashPassword
            }

            const userData = new userModel(payload)
            const saveUser = await userData.save()

            res.status(201).json({
                data: saveUser,
                success:true,
                error:false,
                message: "user created successfully"
            })
            
        } catch (error) {
            res.json({
                message: error.message || error,
                error:true,
                success:false,
            })
        }
    }


module.exports = userSignUpController
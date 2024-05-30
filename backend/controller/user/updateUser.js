const userModel = require("../../models/userModel");

const updateUser = async(req,res) => {

        try {

            const sessionUser = req.userId
            const {userId, email, name, role} = req.body 

            const payload = {
                ...(email && {email: email}),
                ...(name && {name: name}),
                ...(role && {role: role})
            }

            const user = await userModel.findById(sessionUser);


            const updateUser = await userModel.findByIdAndUpdate(userId,payload)

            res.json({
                data:updateUser,
                message: "User Updated Successfully",
                success: true,
                error: false
            })
            
        } catch (error) {
            res.status(400).json({
                message: error.message || error,
                error: true,
                success: false
            })
        }
  
}

module.exports = updateUser

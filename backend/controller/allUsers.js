const allUsers = async(req,res)=>
    {
        try {
            console.log("userid", req.userId);
            res.json({
                message:"all user"
            })
        } catch (error) {
            res.status(400).json({
                message: error.message || error,
                error: true,
                success: false
            })
        }
    }

    module.exports = allUsers
const jwt = require("jsonwebtoken")

const authToken = async(req,res,next)=>
{
    try {
        const token = req.cookies?.token || req.header;

        if(!token)
            {
                res.status(200).json({
                    message: "user invalid",
                    success: false,
                    error: true
                })
            }
        
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded){
            console.log(err)
            console.log("decoded",decoded)

            if(err)
                {
                    console.log("error auth", err)
                }

            req.userId = decoded?._id

            next()
        });
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error:true,
            success:false})
        
    }
}


module.exports = authToken
const addToCartModel = require("../../models/cartProduct")

const countAddToCartProduct = async(req,res)=>{
    try {
        const userId = req.userId

        const count = await addToCartModel.countDocuments({
            userId : userId
        })

        return res.json({
            data: {
                count : count
            },
            message: "Ok",
            success: true,
            error: false
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = countAddToCartProduct
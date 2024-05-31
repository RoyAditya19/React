const productModel = require("../../models/productModel")

const getCategoryWiseProduct = async(req,res)=>
    {
        try {
            const {category} = req.body
            const product = await productModel.find({category})

            res.json({
                data:product,
                message: "produt fetched",
                success: true,
                error: false
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
                error: true,
                success: false
            })
        }
    }


module.exports = getCategoryWiseProduct
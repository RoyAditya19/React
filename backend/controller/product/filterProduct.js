const productModel = require("../../models/productModel")
const filterProductController = async(req,res)=>
    {
        try {
            const categoryList = req?.body?.category || []

            const product = await productModel.find({
                category : {
                    "$in": categoryList
                }
            })

            res.json({
                data: product,
                message: "Category List",
                error: false,
                success: true
            })
        } catch (error) {
            res.status(400).json({
                message: error.message || error,
                error: true,
                success: false
            }) 
        }
    }

module.exports = filterProductController
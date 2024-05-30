const productModel = require("../../models/productModel")

const getProductController = async(req,res)=>
    {
        try {

            const allproduct = await productModel.find().sort({createdAt: -1})

            res.status(200).json({
                data: allproduct,
                success: true,
                error: false,
                message: "Product details"
            })
            
        } catch (error) {
            res.status(400).json({
                message: error.message || error,
                error: true,
                success: false
            })
        }
    }


    module.exports = getProductController;
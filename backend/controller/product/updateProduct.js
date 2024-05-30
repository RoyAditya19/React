const uploadProductPermission = require("../../helper/permission")
const productModel = require("../../models/productModel")

const updateProductController = async(req,res)=>
    {
        try {
            if(!uploadProductPermission(req.userId))
                {
                    throw new Error("Permission Denied")
                }

            const{_id, ...resBody} = req.body


            const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)

            res.json({
                message: "Product Updated Succesfully",
                success:true,
                error:false,
                data:updateProduct
            })
        } catch (error) {
            res.status(400).json({
                message: error.message || error,
                error: true,
                success: false
            })
        }
    }


    module.exports = updateProductController
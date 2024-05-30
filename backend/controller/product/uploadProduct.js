const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/productModel");

const UploadProductController = async(req,res)=>
    {
        try {

            const sessionUserId = req.userId

            if(!uploadProductPermission(sessionUserId))
                {
                    throw new Error("Permission Denied")
                }
            const uploadProduct = new productModel(req.body)
            const saveProduct = await uploadProduct.save()

            res.status(200).json({
                data: saveProduct,
                success: true,
                error: false,
                message: "product details saved successfully"
            })
        } catch (error) {
            res.status(400).json({
                message: error.message || error,
                error: true,
                success: false
            })
        }
    }


    module.exports = UploadProductController
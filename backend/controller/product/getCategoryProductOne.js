const productModel = require("../../models/productModel")

const getCategoryProduct = async(req,res)=>
    {
        try {
            const productCategory = await productModel.distinct("category") //will fetch you all the unique categories from the backend

            //array to store one product from each category
            const productByCategory = []

            //iterates through all the category present in the backend and then pushing it here one by one
            for(const category of productCategory)
                {
                    const product = await productModel.findOne({category})

                    if(product)
                        {
                            productByCategory.push(product)
                        }
                }

            res.json({
                message: "category product",
                success:true,
                error: false,
                data: productByCategory
            })

        } catch (error) {
            res.status(400).json({
                message: error.message || error,
                error: true,
                success: false
            }) 
        }
    }

    module.exports =  getCategoryProduct;
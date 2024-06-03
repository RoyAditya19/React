const express = require("express")


const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require("../controller/user/userSignIn")
const userDetailsController = require("../controller/user/userDetails")
const userLogout = require("../controller/user/userLogout")
const authToken = require("../middleware/authToken")
const allUsers = require("../controller/user/allUsers")
const updateUser = require("../controller/user/updateUser")
const UploadProductController = require("../controller/product/uploadProduct")
const getProductController = require("../controller/product/getProduct")
const updateProductController = require("../controller/product/updateProduct")
const getCategoryProduct = require("../controller/product/getCategoryProductOne")
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct")
const getProductDetails = require("../controller/product/getProductDetails")
const addToCartController = require("../controller/user/addToCartController")
const countAddToCartProduct = require("../controller/user/countAddToCartProduct")
const  addToCartViewProduct = require("../controller/user/addToCartViewProduct")
const  updateAddToCartProduct  = require("../controller/user/updateAddToCartProduct")
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct")
const searchProduct = require("../controller/product/searchProduct")

router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details",authToken, userDetailsController)
router.get("/user-logout", userLogout)

//admin panel
router.get("/all-user",authToken, allUsers);
router.post("/update-user",authToken,updateUser);

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken, countAddToCartProduct)
router.get("/viewcartproduct",authToken,addToCartViewProduct)

router.post("/updatecartproduct",authToken,updateAddToCartProduct)
router.post("/deletecartproduct",authToken,deleteAddToCartProduct)

router.get("/search", searchProduct)

module.exports = router
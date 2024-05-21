const express = require("express")


const router = express.Router()

const userSignUpController = require("../controller/userSignUp")
const userSignInController = require("../controller/userSignIn")
const userDetailsController = require("../controller/userDetails")
const userLogout = require("../controller/userLogout")
const authToken = require("../middleware/authToken")
const allUsers = require("../controller/allUsers")

router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details",authToken, userDetailsController)
router.get("/user-logout", userLogout)

//admin panel
router.get("/all-user",authToken, allUsers);

module.exports = router
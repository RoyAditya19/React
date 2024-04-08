const express = require("express");
const User = require("../models/User");
var fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//secure authentication(between server and client) is possible because of JWT Tokens
const JWT_SECRET = "adiiisgoodboy";

//ROUTE1 - Create a user using: POST "/api/auth/createuser". no login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }), //here if ".islength" is discluded then it will not throw any kind of error. express validator has been installed and imported for handling errors
    body("email", "enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) =>
    //if there are error return bad request
    {
      let success = false;
      const errors = validationResult(req);   //this error gets a value whenever the user has entered the wrong data, here for example writing a name of length less than 5
      if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
      }
      try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        //   console.log(user);
        if (user) {
          return res.status(400).json({ error: "Invalid Email ID" });           //means that the email entered already exists
        }

        // else{
        const salt = await bcrypt.genSalt(10);
        const secpassword = await bcrypt.hash(req.body.password, salt);
        //
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secpassword,
        });
        // }

        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        //return token to the user
        success=true;
        res.json({success, authtoken }); //using this we are sending token and a success message to the user whenever a new user gets registered

        // //  res.json({ message: "data saved" });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
    }
);

//ROUTE2 - authenticating a user
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "cannot be empty").exists({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
       success = false
        return res.status(400).json({ error: "login credentials invalid" });
      }

      const paswrdcompare = await bcrypt.compare(password, user.password);
      if (!paswrdcompare) {
        success = false
        return res.status(400).json({ error: "Login Credentials Invalid" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE3 - Get loggedin user detail using: POST "/api/auth/getuser". Login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;


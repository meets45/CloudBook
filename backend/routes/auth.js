const express = require("express"); //imported express
const User = require("../models/User");
const router = express.Router(); //Initialized Router
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

// const secret = process.env.REACT_APP_SECRET_KEY;
const secret = "KMCRHSM?";

//Route1: Create a user using POST /api/auth/createuser. No login required
router.post(
  "/createuser",
  [
    //Validates a user using express validator
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body(
      "password",
      "Length of password must be greater than 8 characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req); //IF user does not input proper details then it dispays error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      //finds if email is already stored in database or not
      if (user) {
        //if it is stored in database then it will display error
        return res
          .status(400)
          .json({ error: "Sorry a user with same email already exists!" });
      }

      const salt = await bcrypt.genSalt(10); //Salting the password
      const securePassword = await bcrypt.hash(req.body.password, salt); //adding password & salt to make it secure
      //Thus, hashed password is stored in database
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });
      const data = {
        //sends users id
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secret); //generates authtoken from the id and secret key
      res.send({ authToken }); //sends the authtoken to user
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

//Route2: Login a user using POST /api/auth/login. Login required
router.post(
  "/login",
  [
    //Validates a user using express validator
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req); //IF user does not input proper details then it dispays error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email }); //checks if user entered email is present in database
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials!" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      //checks if user entered password matches hash value stored in database
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials!" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      //sends authtoken if details are verified
      const authToken = jwt.sign(data, secret);
      res.send({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server error occurred");
    }
  }
);

//Route3: Get logged in user details using POST /api/auth/getuser. Login Required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    //fetches all details of user other than password using fetchuser middleware
    let userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error occurred");
  }
});

module.exports = router; //exported router

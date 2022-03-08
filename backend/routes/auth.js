const express = require('express'); //imported express
const User = require('../models/User');
const router = express.Router(); //Initialized Router
const {body, validationResult} = require('express-validator');

// Create a user using POST /api/auth. 
//Listens and responds to specific path

router.post('/', [
    body('name', "Enter a valid name").isLength({min: 3}),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Length of password must be greater than 8 characters").isLength({min: 8})
],(req, res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
}
User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
}).then(user => res.json(user))
.catch(err => {console.log(err)
res.json({'error':'Please enter a unique email'})})
})

module.exports = router //exported router
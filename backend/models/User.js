const mongoose = require('mongoose'); //imported mongoose
const { Schema } = mongoose;

//Initialized userSchema
const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

//exported notes schema which takes name of model and schema as input
module.exports = mongoose.model('user', userSchema);
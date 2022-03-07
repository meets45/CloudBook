const mongoose = require('mongoose'); //imported mongoose

//Initialized notesSchema
const notesSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        required: Date.now
    }
});

 //exported notes schema which takes name of model and schema as input
module.exports = mongoose.model('notes', notesSchema);
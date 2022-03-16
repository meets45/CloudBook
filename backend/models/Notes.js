const mongoose = require("mongoose"); //imported mongoose
const { Schema } = mongoose;

//Initialized notesSchema
const notesSchema = new Schema({
  user: {
    //to store notes of specific users in his account
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//exported notes schema which takes name of model and schema as input
module.exports = mongoose.model("notes", notesSchema);

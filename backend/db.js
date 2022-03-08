const mongoose = require('mongoose'); //imported mongoose

//connection string for MongoDB
const mongoURI = "mongodb://localhost:27017/mynotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

//function for connecting to MongoDB
const connectToMongo = () =>{
    //mongoose.connect function is used which takes connection string and callback function as input
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectToMongo; //exported function to use in other parts of app
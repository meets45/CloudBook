const connectToMongo = require("./db"); //imported db.js
const express = require("express"); //imported express
var cors = require("cors");

connectToMongo(); //called connectToMongo which makes connection to Database
const app = express();
const port = 3001; //initialized express server on port:3001

app.use(cors());
app.use(express.json());

//Available Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

//Instructs app to listen to specific port
//Index.js is started using nodemon .\index.js

app.listen(port, () => {
  console.log(`CloudBook backend listening on port ${port}`);
});

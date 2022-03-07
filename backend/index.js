const connectToMongo = require('./db') //imported db.js
const express = require('express') //imported express

connectToMongo(); //called connectToMongo which makes connection to Database
const app = express() 
const port = 3001 //initialized express server on port:3001

//Available Routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

//Instructs app to listen to specific port
//Index.js is started using nodemon .\index.js

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
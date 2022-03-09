const express = require('express') //imported express
const router = express.Router(); //Initialized Router

//Listens and responds to specific path
router.post('/', (req, res)=>{
    res.json([]);
})

module.exports = router //exported router
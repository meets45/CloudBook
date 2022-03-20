var jwt = require("jsonwebtoken");
const secret = "KMCRHSM?"; //secret key for generating token

const fetchuser = (req, res, next) => {
  //Get the user from JWT token and id to req object
  const token = req.header("auth-token"); //auth-token passed through header
  if (!token) {
    //if token is not avaialble it will send error
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, secret);
    //it will verify the token send by user and token generated from secret key
    req.user = data.user;
    next();
  } catch (error) {
    //if exception occurs catch block will handle it
    res.status(401).send({ error: "Some error occurred in verifying" });
  }
};

module.exports = fetchuser;

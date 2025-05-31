const jwt = require("jsonwebtoken");
const dotenv=require('dotenv')

dotenv.config()
const secret_key =process.env.secret_key;



function setUser(user) {
  if (!user || !user._id || !user.email) {
    throw  new Error("Invalid user ");
  }
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret_key,
    { expiresIn: "48h" }
  );
}

function getUser(token) {
  if(!token){
    return null
  }
  try{
    return jwt.verify(token, secret_key);
  }
  catch(err){
    console.error("Invalid token:", err);
    return null;
  }
}
module.exports = {
  setUser,
  getUser,
};

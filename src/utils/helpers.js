const jwt = require("jsonwebtoken")
const config = require('./config')
const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(authHeader) {
    const token = authHeader.split(' ')[1];
    const d =  await jwt.verify(token, config.SECRET, (err, user) => {
      if(err){
        return res.status(403).send('Unauthorized')
      }
      req.user = user.sub
      next();
    })
    
  }
  else {
    res.status(401).send('Unauthorized')
  }
};

module.exports = {
  authenticateJWT
}
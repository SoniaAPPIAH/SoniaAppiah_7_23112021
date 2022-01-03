const jwt = require('jsonwebtoken');
//const db = require('../config/db')
require('dotenv').config();

module.exports = (req, res, next) => {
  if (req.cookies.jwt) {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_TOKEN);
    if (!decodedToken) {
        return res.status(403).json("unauthorized request")
    }else{
        next();
    }
} else {
    res.status(401).json({error:'Invalid request!'});
}
}
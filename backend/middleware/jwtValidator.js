const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.body.token;
  if(!token) res.status(401).send('Access Denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userid = decoded;
    next();
  }
  catch(err) {
    res.status(400).send('Invalid Token');
  }
}
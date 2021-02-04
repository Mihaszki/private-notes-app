const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const header = req.header('Authorization');
  if(!header) res.status(401).send('Access Denied');

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userid = decoded;
    next();
  }
  catch(err) {
    res.status(400).send('Invalid Token');
  }
}
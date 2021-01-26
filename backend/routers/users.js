const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/user.model');

router.get('/', (req, res) => {
  res.send('Hello!');
});

module.exports = router;
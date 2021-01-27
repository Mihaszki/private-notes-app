const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/', async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({ users });
  }
  catch (err) {
    res.json({ message: err });
  }
});

router.post('/register', async (req, res) => {
  const user = new userModel({
    username: req.body.username,
    password: req.body.password
  });

  try {
    const savedUser = await user.save();

    const jwtBearerToken = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      username: req.body.username,
      idToken: jwtBearerToken,
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  }
  catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
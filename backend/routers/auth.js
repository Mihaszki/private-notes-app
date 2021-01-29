const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/register', async (req, res) => {
  const user = new userModel({
    username: req.body.username,
    password: req.body.password
  });

  try {
    // Check if user exists
    const userExists = await userModel.exists({ username: req.body.username });
    if(userExists) return res.status(400).json({ message: 'User already exists!' });

    // Save user to DB
    const savedUser = await user.save();

    res.status(200).json({
      username: req.body.username
    });
  }
  catch (err) {
    res.status(400).json({ err });
  }
});

router.post('/login', async (req, res) => {
  try {
    // Check if user exists
    const user = await userModel.findOne({ username: req.body.username }).exec();
    if(user === null) return res.status(400).json({ message: 'Bad username or password!' });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.status(400).json({ message: 'Bad username or password!' });

      // Generate jwt bearer token 
      const jwtBearerToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.status(200).json({
        username: req.body.username,
        token: jwtBearerToken
      });
    });
  }
  catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
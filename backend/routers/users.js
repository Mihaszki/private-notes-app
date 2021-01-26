const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/user.model');

router.get('/', async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({ users });
  }
  catch (err) {
    res.json({ message: err });
  }
});

router.post('/', async (req, res) => {
  const user = new userModel({
    username: req.body.username,
    password: req.body.password
  });

  try {
    const savedUser = await user.save();
    res.json({ savedUser });
  }
  catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
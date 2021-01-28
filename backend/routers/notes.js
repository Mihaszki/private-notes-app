const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', async (req, res) => {
  try {
    // Add note to notes array
    const note = await userModel.findOneAndUpdate({ _id: req.body.id }, { $push: { notes: {
      body: req.body.body,
      title: req.body.title
    } } }, {
      new: true
    });

    res.status(200).json({
      body: req.body.body,
      title: req.body.title,
      date: note.date
    });
  }
  catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
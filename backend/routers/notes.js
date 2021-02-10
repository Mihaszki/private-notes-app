const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const jwtValidator = require('../middleware/jwtValidator');
const textParser = require('../middleware/textParser');
require('dotenv').config();

// Get user by ID from token
router.get('/', jwtValidator, async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.userid._id }).select('-password -_id').exec();
    res.status(200).json({ user });
  }
  catch (err) {
    res.status(400).json({ err });
  }
});

// Delete user's note
router.delete('/:noteid', jwtValidator, async (req, res) => {
  try {
    const note = await userModel.findOneAndUpdate({ _id: req.userid._id },
    {
        $pull: {
          notes: {
            _id: req.params.noteid
          }
        }
    });
    res.status(200).json({ _id: note._id });
  }
  catch (err) {
    res.status(400).json({ err });
  }
});

// Update user's note
router.put('/:noteid', jwtValidator, textParser, async (req, res) => {
  try {
    const note = await userModel.findOneAndUpdate({ _id: req.userid._id, 'notes._id': req.params.noteid },
    {
      $set: {
        'notes.$.title': req.body.title,
        'notes.$.body': req.body.body,
        'notes.$.preview': req.preview,
        'notes.$.editedDate': Date.now()
      }
    }, {
      new: true
    }).select('-password -_id');
    res.status(200).json(note);
  }
  catch (err) {
    res.status(400).json({ err });
  }
});

// Add note to notes array
router.post('/', jwtValidator, textParser, async (req, res) => {
  try {
    const note = await userModel.findOneAndUpdate({ _id: req.userid._id },
    {
      $push: {
        notes: {
          body: req.body.body,
          title: req.body.title,
          preview: req.preview
        } 
      }
    }, {
      new: true
    }).select('-password -_id');

    res.status(200).json(note);
  }
  catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minLength: 1, maxLength: 20 },
  password: { type: String, required: true, minLength: 1, maxLength: 20 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
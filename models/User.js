const mongoose = require('mongoose');

// Define the schema for users
const UserSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create and export the model
module.exports = mongoose.model('User', UserSchema);
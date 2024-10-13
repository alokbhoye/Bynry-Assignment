const mongoose = require('mongoose');

// Define the schema for profiles
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  photo: { type: String }, // Optional field for profile photo URL
});

// Create the Profile model
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;

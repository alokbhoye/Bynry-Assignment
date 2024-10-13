const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the Express app
const app = express();
app.use(express.json()); // For parsing JSON data
app.use(cors()); // Enable CORS for frontend requests

// Connect to MongoDB (local MongoDB with profileDB)
mongoose.connect('mongodb://localhost:27017/profileDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define Mongoose schema and model for profiles
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  photo: { type: String }, // Optional URL for profile photo
});

const Profile = mongoose.model('Profile', profileSchema, 'profile-data'); // 'profile-data' is the collection name

// Define API routes

// 1. Get all profiles
app.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find(); // Fetch all profiles from MongoDB
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Get a single profile by ID
// Get a single profile by ID
app.get('/profiles/:id', async (req, res) => {
    console.log(`Fetching profile with ID: ${req.params.id}`);  // Log the ID being fetched
    try {
      const profile = await Profile.findById(req.params.id); // Find profile by ID
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  

// 3. Create a new profile
app.post('/profiles', async (req, res) => {
  const { name, description, address, photo } = req.body;

  // Validate required fields
  if (!name || !description || !address) {
    return res.status(400).json({ message: 'Name, description, and address are required' });
  }

  const newProfile = new Profile({ name, description, address, photo });

  try {
    const savedProfile = await newProfile.save(); // Save the new profile to MongoDB
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. Delete a profile by ID
app.delete('/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id); // Find profile by ID and delete it
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json({ message: 'Profile deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server on port 5001
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

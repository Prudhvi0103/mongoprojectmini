
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./Models/UserSchema');
const Car = require('./Models/carsSchema');
require('dotenv').config();



const app = express();
app.use(cors({ origin: "*" })); // Or specify your frontend URL for security
app.use(express.json());

const port = 4500;
const URI = process.env.MONGO_URI;

mongoose.connect(URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Get all users
app.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    console.log("User saved:", savedUser);
    res.json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Create a new car
app.post("/cars", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    console.log("Car saved:", savedCar);
    res.json(savedCar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating car' });
  }
});

// Update a user
app.put('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndRemove(id);
    res.send('User deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



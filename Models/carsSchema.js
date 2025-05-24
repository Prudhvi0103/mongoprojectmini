const mongoose = require('mongoose')
const carsSchema = new mongoose.Schema({
  username: String,
  password: String
})
module.exports = mongoose.model('cars', carsSchema)
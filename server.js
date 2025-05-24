const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const User = require('./Models/UserSchema');
const cars = require('./Models/carsSchema');

const app = express();
app.use(express.json())
const port = 4500;
const URI = "mongodb+srv://prudhvi:p1234@cars.bfd64if.mongodb.net/?retryWrites=true&w=majority&appName=Cars"

mongoose.connect(URI).then(()=> console.log('MongoDB connected successfully'))
.catch((err)=> console.error('MongoDB connection error:', err))

app.get("/users", async(req, res) => {
    const data = await User.find()
    res.json(data)
})
app.post("/users", async(req, res) => {
    const newUser = new User(req.body);
    const savedUser = await newUser.save()
    console.log("22",savedUser)
    res.json(savedUser)
})
app.post("/cars", async(req, res) => {
    const newUser = new cars(req.body);
    const savedUser = await newUser.save()
    console.log("22",savedUser)
    res.json(savedUser)
})

app.put('/users/:id',(req,res)=>{
    ;
    
    res.json(newUser)
})
app.delete("/users:id",(req,res)=>{
    const Id = req.params.id;
    res.send('deleted')
})
app.listen(4500, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

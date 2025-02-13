require('dotenv').config(); //retrieve the value of the environment variable
const UserModel = require('./models/user'); //import the user model
const mongoose = require('mongoose'); //import mongoose
const express = require('express'); //import express

const app = express(); //create an express app
app.use(express.json()); 
//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. 
// This method is called as a middleware to the app.

//connect to db
mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error('Could not connect to MongoDB', err));


 //read
 app.get('/users', async (req, res) => {
    const users = await UserModel.find();
    res.send(users); 
 })

//create
 app.post('/users', async (req, res) => {
    const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    })

    await newUser.save()
    .then(() => res.send(newUser))
    .catch(err => res.status(400).send(err.message));
 });

 //update
 app.put('/users/:id', async (req, res) => {
    const updateUser = await UserModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }, {new: true});

    res.send(updateUser);
 });

//delete
 app.delete('/users/:id', async (req, res) => {
    await UserModel.findByIdAndDelete(req.params.id);
    res.send('User deleted');
 });

 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

 

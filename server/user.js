const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const router = express.Router()

// Schema for users
const usersSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
  email: String,
  uploadList: [{type: mongoose.ObjectId, ref: 'Recipe'}],
  likeList: [{type: mongoose.ObjectId, ref: 'Recipe'}]
  },{
  versionKey: false  // Get rid of __v when creating a document
});

// Mongoose model for user 
const User = mongoose.model('users', usersSchema);

// Display all users at /getUsers
router.get('/getUsers', async (req, res) => {
  const users = await User.find();
  res.json(users);
  });
  
// Display all recipes at /getRecipes
router.get('/getRecipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
  });

// Create a user at /SignUp and append result message to header
router.post('/SignUp', async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  const newUser = new User({
    username: username,
    password: password,
    email: email,
    uploadList: [],
    likeList: []
  });
  await newUser.save()
  .then(doc => {
    res.append('message', username + ' signed up successfully');
    res.send(true);
    console.log('signup succeeded');
  })
  .catch(err => {
    console.log(err.code);
    if (err.name === 'MongoServerError' && err.code === 11000) {
      res.append('message', 'Username already exists');
      console.log(username + ' already exists');
    } else {
      res.append('message', 'An error occured while searching database');
    }
    res.send(false);
    console.log('signup failed');
  });
});

// Try to log in a user at /users/login
router.post('/login', async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  User.exists({username: username, password: password}, (err, doc) => {
    if (doc) {
      console.log(username + ' signed in successfully');
    } else {
      console.log('Username and password do not match');
    }
    res.send(doc);
  });
})

exports.model = User;
exports.router = router;

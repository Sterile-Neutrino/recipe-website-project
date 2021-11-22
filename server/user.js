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
  
// Create a user at /SignUp
router.post('/SignUp', async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  return await signUp(username, password, email)
  .then(doc => {
    console.log('signup succeeded');
    res.send(true);
  })
  .catch(err => {
    console.log('signup failed');
    res.send(false);
  });
});

/* Create a user with username, password, and email, and store in database
Example:
signup('bruin', 'bruin123', 'bruin@ucla.edu')
.then(value => {console.log("%s signed up successfully.", value.username)})
.catch(err => {console.log(err)});
*/
async function signUp(u, p, e) {
    const newUser = new User({
      username: u,
      password: p,
      email: e,
      uploadList: [],
      likeList: []
    });
    return await newUser.save();
  }

// Return true if the user with username u and password p exists
async function signIn(u, p) {
  var user = User.exists({username: u, password: p}, (err, doc) => {
    if (err) {
      console.log(err);
    } else if (doc !== null) {
      console.log(u + ' signed in successfully');
    } else {
      console.log('username and password do not match')
    }
  });
  return new Promise((resolve, reject) => {
    if (user) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

/*
signIn('john', 'john123')
.then(value => {
    console.log(value);
})
.catch(err => {
    console.log(err);
});
*/

// Return recipe id given its name
function getRecipeId(n) {
}

// Add recipe r to user u's likeList, and add one to r's like count.
function like(u, r) {
}

exports.model = User;
exports.router = router;
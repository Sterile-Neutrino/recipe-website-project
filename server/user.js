const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()

// Schema for users
const usersSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
  email: String,
  uploadList: [String],
  likeList: [String],
  myList: [String]
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

// Add recipe id to a user's like list
router.post('/like', async (req, res) => {
  var userId = mongoose.Types.ObjectId(req.body.userId);
  var user = null;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    console.log('An error occured when searching for user')
  }
  if (user) {
    user.likeList.push(req.body.recipeId);
    user.save()
    .then(doc => {
      res.send(true);
      console.log('Recipe liked');
    })
    .catch(err => {
      res.send(false);
      console.log(err);
    })
  }
});

// Add recipe id to a user's my-list
router.post('/addToList', async (req, res) => {
  var userId = mongoose.Types.ObjectId(req.body.userId);
  var user = null;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    console.log('An error occured when searching for user')
  }
  if (user) {
    user.myList.push(req.body.recipeId);
    user.save()
    .then(doc => {
      res.send(true);
      console.log('Recipe added to my list');
    })
    .catch(err => {
      res.send(false);
      console.log(err);
    })
  } else {
    res.send(false);
    console.log('Failed to add to my list');
  }
});

// Remove recipe id from a user's like list
router.post('/dislike', async (req, res) => {
  var userId = mongoose.Types.ObjectId(req.body.userId);
  var user = null;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    console.log('An error occured when searching for user')
  }
  if (user) {
    const index = user.likeList.indexOf(req.body.recipeId);
    if (index > -1) {
      user.likeList.splice(index, 1);
      user.save()
      .then(doc => {
        res.send(true);
        console.log('Recipe Disliked');
      })
      .catch(err => {
        res.send(false);
        console.log(err);
      })
    } else {
      res.send(false);
      console.log('Failed to dislike: recipe not in like list')
    }
  } else {
    res.send(false);
    console.log('Failed to dislike: user not found');
  }
});

// Remove recipe id from a user's my list
router.post('/removeFromList', async (req, res) => {
  var userId = mongoose.Types.ObjectId(req.body.userId);
  var user = null;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    console.log('An error occured when searching for user')
  }
  if (user) {
    const index = user.myList.indexOf(req.body.recipeId);
    if (index > -1) {
      user.myList.splice(index, 1);
      user.save()
      .then(doc => {
        res.send(true);
        console.log('Recipe removed from my list');
      })
      .catch(err => {
        res.send(false);
        console.log(err);
      })
    } else {
      res.send(false);
      console.log('Failed to remove from list: recipe not in list')
    }
  } else {
    res.send(false);
    console.log('Failed to remove from list: user not found');
  }
});

// Get user json by userId
router.get('/find/:userId', async (req, res) => {
  var userId = mongoose.Types.ObjectId(req.params.userId);
  var user = null;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    console.log('An error occured when searching for user')
  }
  if (user) {
    res.json(user);
    console.log('Found user: ' + user.username);
  } else {
    res.json(null);
    console.log('User not found');
  }
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
    likeList: [],
    myList: []
  });
  await newUser.save()
  .then(doc => {
    res.append('message', username + ' signed up successfully');
    res.append('userId', doc._id.toString());
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
});

exports.model = User;
exports.router = router;

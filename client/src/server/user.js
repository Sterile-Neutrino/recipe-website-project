const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const Schema = mongoose.Schema;
// To use a local mongodb
// const url = 'mongodb://127.0.0.1:27017/recipes';

// To use mongodb on Atlas
const url = 'mongodb+srv://recipe:cs35lfall21@cluster0.2hwcf.mongodb.net\
/recipe-app?retryWrites=true&w=majority';

// Listen to port
app.listen(3000, function() {
    console.log('listening on 3000')
  })

// Connect to the database
mongoose.connect(url, { useNewUrlParser: true })
db.once('open', _ => {
  console.log('Database connected:', url)
})
db.on('error', err => {
  console.error('Connection error:', err)
})

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

// Schema for recipes
const recipesSchema = new mongoose.Schema({
  name: String,
  category: String,
  ingredients: Object,
  calories: Number,
  likes: Number,
  description: String
},{
  versionKey: false  // Get rid of __v when creating a document
});

const User = mongoose.model('users', usersSchema);
const Recipe = mongoose.model('recipes', recipesSchema);


// Display all users at /getUsers
app.get('/getUsers', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Display all recipes at /getRecipes
app.get('/getRecipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// Create a user at /signUp
app.post('/SignUp', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  return signUp(username, password, email);
});


// Create a user with username, password, and email, and store in database
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

/* // signup example:
signup('bruin', 'bruin123', 'bruin@ucla.edu')
.then(value => {console.log("%s signed up successfully.", value.username)})
.catch(err => {console.log(err)});
*/

// Create and upload a recipe to database
// Image processing to be done...
async function uploadRecipe(n, cat, i, cal, d) {
  const newRecipe = new Recipe({
    name: n,
    category: cat,
    ingredients: i,
    calories: cal,
    description: d,
    likes: 0
  });
  return await newRecipe.save();
}

/* // uploadRecipe example:
uploadRecipe(
  'cheese cake',
  'dessert',
  {
    "sugar": [100, "g"],
    "salt": [10, "g"],
    "cheese": [50, "g"],
    "flour": [1, "lb"]
  },
  500,
  "Mix everything up and put in the oven preheated to 325 degress for 10 min."
)
.then(value => {console.log("%s uploaded successfully.", value.name)})
.catch(err => {console.log(err)});
*/

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

signIn('john', 'john123')
.then(value => {
    console.log(value);
})
.catch(err => {
    console.log(err);
});

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo');
    }, 300);
  });

// Return recipe id given its name
function getRecipeId(n) {
}

// Add recipe r to user u's likeList, and add one to r's like count.
function like(u, r) {
}

module.exports = User;

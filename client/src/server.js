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
  username: String,
  password: String,
  email: String,
  uploadList: Array,
  likeList: Array,
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
app.get('/users/login', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Display all recipes at /getRecipes
app.get('/getRecipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

/*  
axios
  .post("/signUp", SingUpData,
  .then((res) =>{
      console.log("success");
  })
  .catch((err) => {
      console.log(err);
  });
*/
/* app.post('/signUp', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  signUp(username, password, email);
});
*/

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

var a = User.exists({username: 'john'}, (err, res) => {
  if(err) {
    console.log(err);
  } else {
    console.log(res);
  }
});

console.log(a);
// Return true if the user with username u and password p exists
function signIn(u, p, callback) {
}

// Return recipe id given its name
function getRecipeId(n) {
}

// Add recipe r to user u's likeList, and add one to r's like count.
function like(u, r) {
}

module.exports = app;

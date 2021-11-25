const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const router = express.Router()
const multer = require('multer');
const upload = multer()

// Schema for recipes
const recipesSchema = new mongoose.Schema({
    author: String,
    title: String,
    description: String,
    calories: Number,
    ingredients: String,
    category: String,
    likes: Number
    },{
    versionKey: false  // Get rid of __v when creating a document
  });

// Mongoose model for recipes
const Recipe = mongoose.model('recipes', recipesSchema);
  
// Handle Recipe Upload
router.post('/upload', upload.none(), async (req, res) => {
  var author = req.body.author;
  var title = req.body.title;
  var calories = req.body.calories;
  var ingredient = req.body.ingredient;
  var description = req.body.description;
  var category = req.body.category;
  //console.log(author)
  //console.log(title)
  //console.log(calories)
  //console.log(ingredient)
  //console.log(description)
  //console.log(category)

  // TO-DO: var image
  const newRecipe = new Recipe({
    author: author,
    title: title,
    description: description,
    calories: calories,
    ingredients: ingredient,
    category: category,
    likes: 0
  });
  await newRecipe.save()
  .then(doc => {
    res.append('message', title + ' uploaded successfully');
    res.send(true);
    console.log('upload succeeded');
  })
  .catch(err => {
    console.log(err.code);
    console.log(err);
    //TO-DO: Error Handling
    console.log('upload failed');
  });
});

exports.model = Recipe;
exports.router = router;


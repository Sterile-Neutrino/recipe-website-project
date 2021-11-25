const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./user');
const recipe = require('./recipe');
const app = express();
const db = mongoose.connection;
const port = 4000;
// To use a local mongodb
// const url = 'mongodb://127.0.0.1:27017/recipes';

// To use mongodb on Atlas
const url = 'mongodb+srv://recipe:cs35lfall21@cluster0.2hwcf.mongodb.net\
/recipe-app?retryWrites=true&w=majority';

// Listen to port
app.listen(port, function() {
  console.log('listening on %d', port);
})

// Set up body-parser for express
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up router at /users
app.use('/users', user.router);

// Set up router at /recipes
app.use('/recipes', recipe.router);

// Connect to the database
mongoose.connect(url, { useNewUrlParser: true })
db.once('open', _ => {
  console.log('Database connected:', url)
})
db.on('error', err => {
  console.error('Connection error:', err)
})

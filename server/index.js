require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./user');
const recipe = require('./recipe');
const cors=require('cors');
const app = express();  
const db = mongoose.connection;
const port = 4000;
// To use a local mongodb
// const url = 'mongodb://127.0.0.1:27017/recipes';
// To use mongodb on Atlas
const url = process.env.DB_URL;

// Set cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Set up body-parser for express
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up router at /users
app.use('/users', user.router);

// Set up router at /recipes
app.use('/recipes', recipe.router);

// Listen to port
app.listen(port, function() {
  console.log('listening on %d', port);
})

// Connect to the database
mongoose.connect(url, { useNewUrlParser: true })
db.once('open', _ => {
  console.log('Database connected:', url)
})
db.on('error', err => {
  console.error('Connection error:', err)
})

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const router = express.Router()

// Schema for recipes
const recipesSchema = new mongoose.Schema({
    name: {type: String, required=true},
    category: String,
    ingredients: Object,
    calories: Number,
    likes: Number,
    description: String
    },{
    versionKey: false  // Get rid of __v when creating a document
  });
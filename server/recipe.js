const express = require('express');
const mongoose = require('mongoose');
const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const router = express.Router()

// Schema for recipes
const recipesSchema = new mongoose.Schema({
  author: String,
  title: String,
  description: String,
  calories: Number,
  ingredients: String,
  category: String,
  likes: Number,
  imageId: String
}, {
  versionKey: false // Get rid of __v when creating a document
});

// Mongoose model for recipes
const Recipe = mongoose.model('recipes', recipesSchema);

// Mongoose model for users
const User = mongoose.model('users');

var storage = new GridFsStorage({
  db: mongoose.connection,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      console.log('Image type not supported');
      return null;
    } else {
      return {
        bucketName: 'image',
        filename: 'image_' + Date.now()
      };
    }
  }
});

// Filter out non png/jepg files when uploading
const fileFilter = (req, file, cb) => {
  const match = ["image/png", "image/jpeg"];
  // Reject a file of wrong type
  if (match.indexOf(file.mimetype) === -1) {
    req.fileValidationError = 'Image type not supported';
    cb(null, false, req.fileValidationError);
    console.log('Image type not supported');
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).single('image');

// Make an async version of upload()
const aSyncUpload = util.promisify(upload);

// Handle Recipe Upload
router.post('/upload', aSyncUpload, async (req, res) => {
  if ((req.fileValidationError)) {
    res.append('message', req.fileValidationError);
    res.send(false);
  } else {
    var author = req.body.author;
    var title = req.body.title;
    var calories = req.body.calories;
    var ingredient = req.body.ingredient;
    var description = req.body.description;
    var category = req.body.category;
    var imageId = req.file.id.toString();
    const newRecipe = new Recipe({
      author: author,
      title: title,
      description: description,
      calories: calories,
      ingredients: ingredient,
      category: category,
      imageId: imageId,
      likes: 0
    });
    await newRecipe.save()
    .then(doc => {
      res.append('message', title + ' uploaded successfully');
      res.send(true);
      console.log('Upload succeeded');
    })
    .catch(err => {
      res.append('message', 'An error occured while saving your recipe');
      res.send(false);
      console.log(err);
      console.log('Upload failed');
    });
  }
  // add the id of the uploaded recipe to associated user's uploaded list
  // find by matching author, title, and calories
  var query = { author: author, title: title, calories: calories}
  var option = { "author": 0, "title": 0, "description": 0, "calories": 0, "ingredients": 0,
                "category": 0, "likes": 0, "imageId": 0}
  try {
    uploadedRecipeId = await Recipe.findOne(query, option);
    
    console.log(uploadedRecipeId)
    await User.updateOne(
      { _id: author },
      { $push: { uploadList: uploadedRecipeId }}
    )
  } catch (err) {
    console.log(err)
  }
});

// Get an image by its objectId in databse. For example, the following url
// directs to the image whose objectId is 000000000000000000000000:
// http://localhost:4000/recipes/image/000000000000000000000000
router.get('/image/:imageId', (req, res) => {
  var imageId = mongoose.Types.ObjectId(req.params.imageId);
  var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'image',
  });
  bucket
  .find({
    _id: imageId
  })
  .toArray((err, files) => {
    if (!files || files.length === 0) {
      console.log('Image not found');
      res.status(404).send('Image not found');
    } else {
      bucket.openDownloadStream(imageId).pipe(res);
    }
  });
});

// Get an image by the id of its associated recipe. For example, the following
// url directs to the image that belongs to recipe 000000000000000000000000:
// http://localhost:4000/recipes/image/000000000000000000000000
router.get('/recipeImage/:recipeId', async (req, res) => {
  var recipeId = mongoose.Types.ObjectId(req.params.recipeId);
  var imageId = null;
  try {
    var recipe = await Recipe.findById(recipeId);
    imageId = mongoose.Types.ObjectId(recipe.imageId);
  } catch (err) {
    console.log('Recipe not found');
    res.status(404).send('Recipe not found');
  }
  if (imageId) {
    var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'image',
    });
    bucket
    .find({
      _id: imageId
    })
    .toArray((err, files) => {
      if (err) {
        console.log(err);
      } else if (!files || files.length === 0) {
        console.log('Image not found');
        res.status(404).send('Image not found');
      } else {
        bucket.openDownloadStream(imageId).pipe(res);
      }
    });
  }
});

// Get all image data
router.get('/getImages', (req, res) => {
  var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'image',
  });
  bucket.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.json("No image exists");
    } else {
      files.map(file => {
        if (file.contentType === 'image/jpeg' ||
            file.contentType === 'image/png') {
          file.isImage = true;
        }
        else {
          file.isImage = false;
        }
      });
      res.json({ files: files });
    }
  });
});

// Get a recipe in json format by id
router.get('/:postID', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.postID);
    res.json(recipe);
  } catch (err) {
    res.json({ message: err });
  }
})

// Return an array of words from the input string, using non-alphanumeric
// characters as separators.
function parse(s) {
  return s.toString().toLowerCase().split(/[\W_]+/);
}

// Return an array of key words of a recipe object for search.
function keyWords(recipe) {
  var result = [];
  var uniqueResult = [];
  if (recipe instanceof Recipe) {
    result = result.concat(parse(recipe.title));
    result = result.concat(parse(recipe.description));
    result = result.concat(parse(recipe.calories));
    result = result.concat(parse(recipe.ingredients));
    result = result.concat(parse(recipe.category));
  }
  // Remove duplicates
  for (let i = 0; i < result.length; i++) {
    var currentWord = result[i];
    if (result.indexOf(currentWord) === i) {
      uniqueResult.push(currentWord);
    }
  }
  return uniqueResult;
}

// Search recipes and get results that are related. The content from search
// bar should be a string in req.body
router.get('/search/:input', async (req, res) => {
  var searchInput = [];
  var recipeArray = [];
  var resultSet = new Set();
  var resultIdList = [];
  try {
    // Parse the search input into words
    //searchInput = parse(req.body);
    searchInput = parse(req.params.input);
    recipeArray = await Recipe.find();
    for (const recipe of recipeArray) {
      if (!(resultSet.has(recipe))) {
        var recipeKeyWords = keyWords(recipe);
        for (const key of searchInput) {
          if (recipeKeyWords.includes(key)) {
            resultSet.add(recipe);
            break;
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.send(null);
  }
  if (resultSet.size !== 0) {
    for (const recipe of resultSet) {
      resultIdList.push(recipe._id.toString());
    }
    // Return a list of recipe Ids
    res.send(resultIdList);
    console.log('Search results returned');
  } else {
    res.send(null);
    console.log('No result found');
  }
})

exports.model = Recipe;
exports.router = router;

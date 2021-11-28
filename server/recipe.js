const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const router = express.Router()
const multer = require('multer');
const upload = multer()
const ObjectId = require('mongodb').ObjectId

const {GridFsStorage} = require('multer-gridfs-storage');
let Grid = require("gridfs-stream")
let connection = mongoose.connection;
Grid.mongo = mongoose.mongo
let gfs;



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
  
    },{
    versionKey: false  // Get rid of __v when creating a document
  });

// Mongoose model for recipes
const Recipe = mongoose.model('recipes', recipesSchema);




connection.once('open', () => {
  // Init stream
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
});


const storage = new GridFsStorage({
  url: "mongodb+srv://recipe:cs35lfall21@cluster0.2hwcf.mongodb.net/recipe-app?retryWrites=true&w=majority",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads'
      };
      resolve(fileInfo);
    });
  }
});

//GET ALL IMAGES
router.get('/Getupload', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.json("errr");
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
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

//function that selects what type of file can be uploaded
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// initialize multer , storing all file in this Path
const Upload = multer({
  storage: storage,
  fileFilter: fileFilter
});
  



// Handle Recipe Upload
router.post('/upload', Upload.single('image'), async (req, res) => {
  var author = req.body.author;
  var title = req.body.title;
  var calories = req.body.calories;
  var ingredient = req.body.ingredient;
  var description = req.body.description;
  var category = req.body.category;
  var imageId=req.file.id.toString();
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
    imageId: imageId,
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


//SPECIFIC Recipe
router.get('/:postID', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.postID);
    res.json(recipe);
  } catch (err) {
    res.json({ message: err });
  }
})

exports.model = Recipe;
exports.router = router;


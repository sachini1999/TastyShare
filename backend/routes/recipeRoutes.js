const express = require('express');
const multer = require('multer'); // Import multer for file uploads
const { 
  getAllRecipes, 
  getRecipeById, 
  getRecipeWithCreator, 
  getRecipesByCreator, 
  getRecipesByCategory,
  getCreatorByRecipeId,

} = require('../controllers/RecipeController');

const router = express.Router();

// Configure multer for file upload (e.g., recipe images)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set filename with timestamp
  }
});

const upload = multer({ storage: storage }); // Create multer instance

// Routes
router.get('/', getAllRecipes);                 // Get all recipes
router.get('/:id', getRecipeById);              // Get recipe details by ID
router.get('/creator/:id', getRecipeWithCreator);  // Get recipe with creator details
router.get('/creator-recipes/:creatorId', getRecipesByCreator); // Get all recipes by a creator
router.get('/category/:category', getRecipesByCategory); // Get recipes by category
router.get('/:id/creator-details', getCreatorByRecipeId);


module.exports = router;

const express = require('express');
const latestRecipeController = require('../controllers/latestRecipeController');

const router = express.Router();

// Get latest jobs for the homepage
router.get('/',  latestRecipeController.getLatestRecipes);



module.exports = router;

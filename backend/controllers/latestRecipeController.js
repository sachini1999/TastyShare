const Recipe = require('../models/LatestRecipeModel'); // Import the Recipe model


// Get latest recipes
async function getLatestRecipes(req, res) {
  try {
    const recipes = await Recipe.getLatestRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest recipes', error });
  }
}




module.exports = { 
  getLatestRecipes, 
};

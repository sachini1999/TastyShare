const Recipe = require('../models/recipe'); // Import the Recipe model

// Get all recipes
async function getAllRecipes(req, res) {
  try {
    const recipes = await Recipe.getAllRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
}

// Get recipe details by ID
async function getRecipeById(req, res) {
  try {
    const { id } = req.params;
    const recipe = await Recipe.getRecipeById(id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe details', error });
  }
}

// Get recipe details with creator information by recipe ID
async function getRecipeWithCreator(req, res) {
  try {
    const { id } = req.params;
    const recipeWithCreator = await Recipe.getRecipeWithCreatorById(id);
    if (recipeWithCreator) {
      res.status(200).json(recipeWithCreator);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe with creator details', error });
  }
}

// Get all recipes by a specific creator
async function getRecipesByCreator(req, res) {
  try {
    const { creatorId } = req.params;
    const recipes = await Recipe.getRecipesByCreatorId(creatorId);
    if (recipes.length > 0) {
      res.status(200).json(recipes);
    } else {
      res.status(404).json({ message: 'No recipes found for this creator' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes by creator', error });
  }
}

// Get recipes by category
async function getRecipesByCategory(req, res) {
  try {
    const { category } = req.params;
    const recipes = await Recipe.getRecipesByCategory(category);
    if (recipes.length > 0) {
      res.status(200).json(recipes);
    } else {
      res.status(404).json({ message: 'No recipes found for this category' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes by category', error });
  }
}




// NEW: Get detailed creator information by recipe ID
async function getCreatorByRecipeId(req, res) {
  try {
    const { id } = req.params;
    const creator = await Recipe.getCreatorByRecipeId(id);
    
    if (creator) {
      res.status(200).json({
        id: creator.id,
        name: creator.name,
        profile_image: creator.profile_image,
        bio: creator.bio,
        social_links: creator.social_links,
        recipes_count: creator.recipes_count,
        created_at: creator.created_at
      });
    } else {
      res.status(404).json({ message: 'Creator not found for this recipe' });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching creator details',
      error: error.message 
    });
  }
}


module.exports = { 
  getAllRecipes, 
  getRecipeById, 
  getRecipeWithCreator, 
  getRecipesByCreator, 
  getRecipesByCategory, 
  getCreatorByRecipeId,
};

const db = require('../config/db'); // Import the MySQL connection pool

const recipe = {
  // Fetch all recipes
  getAllRecipes: async () => {
    try {
      const [recipes] = await db.execute('SELECT * FROM recipes');
      return recipes;
    } catch (error) {
      console.error('Error fetching all recipes:', error);
      throw error;
    }
  },

  // Fetch recipe by ID
  getRecipeById: async (id) => {
    try {
      const [recipe] = await db.execute('SELECT * FROM recipes WHERE id = ?', [id]);
      return recipe[0]; // Return the first matching recipe
    } catch (error) {
      console.error('Error fetching recipe by ID:', error);
      throw error;
    }
  },

  // Fetch recipe details with creator information by recipe ID
  getRecipeWithCreatorById: async (id) => {
    try {
      const [recipeWithCreator] = await db.execute(
        `SELECT recipes.*, creators.name AS creator_name, creators.profile_image, creators.bio
         FROM recipes
         LEFT JOIN creators ON recipes.creator_id = creators.id
         WHERE recipes.id = ?`,
        [id]
      );
      return recipeWithCreator[0]; // Return the recipe details with creator info
    } catch (error) {
      console.error('Error fetching recipe with creator by ID:', error);
      throw error;
    }
  },

  // Fetch all recipes by a specific creator
  getRecipesByCreatorId: async (creatorId) => {
    try {
      const [recipes] = await db.execute('SELECT * FROM recipes WHERE creator_id = ?', [creatorId]);
      return recipes;
    } catch (error) {
      console.error('Error fetching recipes by creator ID:', error);
      throw error;
    }
  },

  // Fetch recipes by category
  getRecipesByCategory: async (category) => {
    try {
      const [recipes] = await db.execute('SELECT * FROM recipes WHERE category = ?', [category]);
      return recipes;
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      throw error;
    }
  },

  // Fetch latest recipes (sorted by created_at)
  getLatestRecipes: async () => {
    try {
      const [recipes] = await db.execute('SELECT * FROM recipes ORDER BY created_at DESC LIMIT 5');
      return recipes;
    } catch (error) {
      console.error('Error fetching latest recipes:', error);
      throw error;
    }
  },

   // Fetch recipe details with FULL creator information by recipe ID
   getRecipeWithCreatorById: async (id) => {
    try {
      const [recipeWithCreator] = await db.execute(
        `SELECT 
          recipes.*, 
          creators.id AS creator_id,
          creators.name AS creator_name, 
          creators.profile_image, 
          creators.bio,
          creators.social_links,
          creators.created_at AS creator_created_at,
          (SELECT COUNT(*) FROM recipes WHERE creator_id = creators.id) AS recipes_count
         FROM recipes
         LEFT JOIN creators ON recipes.creator_id = creators.id
         WHERE recipes.id = ?`,
        [id]
      );
      return recipeWithCreator[0];
    } catch (error) {
      console.error('Error fetching recipe with creator by ID:', error);
      throw error;
    }
  }



};

module.exports = recipe;

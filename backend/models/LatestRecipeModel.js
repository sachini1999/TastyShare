const db = require('../config/db'); // Import the MySQL connection pool

const LatestRecipeModel = {
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
  
};

module.exports = LatestRecipeModel;

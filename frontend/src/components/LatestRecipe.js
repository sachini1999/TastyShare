import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/LatestRecipes.css';

const LatestRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const recipesPerPage = 3;

  useEffect(() => {
    const fetchLatestRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/latest');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching latest recipes:', error);
      }
    };

    fetchLatestRecipes();
  }, []);

  const displayedRecipes = recipes.slice(currentIndex, currentIndex + recipesPerPage);

  const handleNext = () => {
    if (currentIndex + recipesPerPage < recipes.length) {
      setCurrentIndex(currentIndex + recipesPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - recipesPerPage >= 0) {
      setCurrentIndex(currentIndex - recipesPerPage);
    }
  };

  return (
    <div className="latest-recipes-container dark-theme">
      <h2>Latest Recipes</h2>

      <div className="recipes-wrapper">
        <button 
          className="arrow-btn" 
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={32} />
        </button>

        <div className="recipes-card-container">
          {displayedRecipes.length === 0 ? (
            <p>No recipes available</p>
          ) : (
            displayedRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <img 
                  src={`http://localhost:5000/images/${recipe.image_path}`} 
                  alt={recipe.title} 
                  className="recipe-image"
                />
                <div className="recipe-card-content">
                  <h3>{recipe.title}</h3>
                  <div className="recipe-meta">
                    <span className="cooking-time">{recipe.cook_time} mins</span>
                    <span className="difficulty">{recipe.difficulty}</span>
                  </div>
                  <a href={`/recipe/${recipe.id}`} className="btn-view">
                    View
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        <button 
          className="arrow-btn" 
          onClick={handleNext}
          disabled={currentIndex + recipesPerPage >= recipes.length}
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="view-all">
        <a href="/list" className="btn-view-all">
          View All Recipes
        </a>
      </div>
    </div>
  );
};

export default LatestRecipes;
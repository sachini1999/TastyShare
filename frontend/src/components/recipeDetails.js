// src/components/RecipeDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/recipeDetails.css';
import axios from 'axios';
import SaveIcon from '../assets/images/save.png';
import verifiedImage from '../assets/images/verified.png';
import { FaShareAlt } from 'react-icons/fa';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipe/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    const fetchCreator = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipe/creator/${recipeId}`);
        setCreator(response.data);
      } catch (error) {
        console.error("Error fetching creator details:", error);
      }
    };

    fetchRecipe();
    fetchCreator();
  }, [recipeId]);

  if (!recipe || !creator) return <p>Loading recipe details...</p>;

  return (
    <div className="recipe-details-container">
      {/* Left Side - Creator Overview */}
      <div className="creator-overview">
        <div className='creator-section'>
          <h2 className='overview-title'>Creator Overview</h2>
          {creator.profile_image && (
            <img 
              src={`http://localhost:5000/uploads/${creator.profile_image}`} 
              alt={`${creator.name} Profile`} 
              className="creator-image" 
            />
          )}
          <div className='creator-head'>
            <h3>{creator.creator_name}</h3>
            <img src={verifiedImage} alt="verified" />
          </div>
          <p>{creator.bio}</p>
          <p className='no-recipes'><strong>Recipes Created:</strong> {creator.recipes_count}</p>
          <div className="social-media">
            <FaShareAlt size={24} className="share-icon" />
          </div>
        </div>
      </div>

      {/* Right Side - Recipe Details */}
      <div className="recipe-details">
        <div className='recipe-section'>
          <div className='head-section'>
            <h2>{recipe.title}</h2>
            <p className='rtype'>{recipe.category} | {recipe.cuisine_type}</p>
            <p className='rposted'>By {creator.creator_name} on {new Date(recipe.created_at).toLocaleDateString()}</p>
            <button className="save-btn">
              <img src={SaveIcon} alt="Save" className="save-icon" />
            </button>
          </div>

          <div className="recipe-image-container">
            <img 
              src={`http://localhost:5000/images/${recipe.image_path}`} 
              alt={recipe.title} 
              className="main-recipe-image" 
            />
          </div>

          <h4>Description:</h4>
          <p>{recipe.description}</p>

          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients.split(',').map((ingredient, index) => (
              <li key={index}>{ingredient.trim()}</li>
            ))}
          </ul>

          <h4>Instructions:</h4>
          <ol>
            {recipe.instructions.split('\n').map((step, index) => (
              step.trim() && <li key={index}>{step.trim()}</li>
            ))}
          </ol>

          <h4>Cooking Time:</h4>
          <p>{recipe.cook_time} minutes</p>

          <h4>Difficulty Level:</h4>
          <p>{recipe.difficulty}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
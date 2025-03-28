import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/RecipeList.css';
import axios from 'axios';
import searchIcon from '../assets/searching.png';
import AIIcon from '../assets/images/ai.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const RecipeList = () => {
  const { category } = useParams(); // Get the category from the URL
  const [recipes, setRecipes] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [isAIRecommended, setIsAIRecommended] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    creator: '',
    searchQuery: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const RECIPES_PER_PAGE = 5;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let response;
        if (category) {
          response = await axios.get(`http://localhost:5000/api/recipe/category/${category}`);
        } else {
          response = await axios.get('http://localhost:5000/api/recipe');
        }
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, [category]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      searchQuery: e.target.value.trim(),
    });
    setCurrentPage(1);
  };

  const handleAIRecommendation = async () => {
    try {
      // This is a placeholder - you might want to implement actual recipe recommendation logic
      const response = await axios.get('http://localhost:5000/api/recipe/latest');
      setRecommendedRecipes(response.data);
      setIsAIRecommended(true);
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
    }
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const searchQueryLower = filters.searchQuery.toLowerCase();
    
    const matchesCategory = 
      (!filters.category || (recipe.category && recipe.category.toLowerCase() === filters.category.toLowerCase()));
    
    const matchesCreator = 
      (!filters.creator || (recipe.creator_name && recipe.creator_name.toLowerCase().includes(filters.creator.toLowerCase())));
  
    const matchesSearchQuery =
      !searchQueryLower ||
      (recipe.title && recipe.title.toLowerCase().includes(searchQueryLower)) ||
      (recipe.description && recipe.description.toLowerCase().includes(searchQueryLower)) ||
      (recipe.ingredients && recipe.ingredients.toLowerCase().includes(searchQueryLower)) ||
      (recipe.category && recipe.category.toLowerCase().includes(searchQueryLower)) ||
      (recipe.creator_name && recipe.creator_name.toLowerCase().includes(searchQueryLower));

    return matchesCategory && matchesCreator && matchesSearchQuery;
  });

  const displayedRecipes = isAIRecommended ? recommendedRecipes : filteredRecipes;
  const totalPages = Math.ceil(displayedRecipes.length / RECIPES_PER_PAGE);
  const paginatedRecipes = displayedRecipes.slice(
    (currentPage - 1) * RECIPES_PER_PAGE,
    currentPage * RECIPES_PER_PAGE
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='list-main'>
      <div className="job-search-bar">
        <input
          type="text"
          className="full-size-search"
          placeholder="Search for recipes..."
          onChange={handleSearchChange}
          style={{ backgroundImage: `url(${searchIcon})` }}
        />
      </div>

      <div className="job-list-container">
        <aside className="sidebar">
          <h3>Filter Recipes</h3>
          <label>
            Category
            <select name="category" onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Pasta">Pasta</option>
              <option value="Curry">Curry</option>
              <option value="Seafood">Seafood</option>
            </select>
          </label>
          <label>
            Creator
            <input 
              type="text" 
              name="creator" 
              placeholder="Search by creator" 
              onChange={handleFilterChange} 
            />
          </label>
          <button className='ai-button' onClick={handleAIRecommendation}>
            <img src={AIIcon} alt="AI" className="ai-icon" />
            Recommended Recipes
          </button>
        </aside>

        <div className="job-list">
          {paginatedRecipes.map((recipe) => (
            <div className="job-item" key={recipe.id}>
              <img 
                src={`http://localhost:5000/images/${recipe.image_path}`} 
                alt={recipe.title} 
                className="content-image" 
              />
              <div className="job-info">
                <h4>
                  {recipe.title}
                  <span className="days-left">{recipe.creator_name}</span>
                </h4>
                <p className="second-section">{recipe.category}</p>
                <p className="third-section">{recipe.description.substring(0, 100)}...</p>
                <Link to={`/recipe/${recipe.id}`} className="view-details">View Recipe</Link>
              </div>
            </div>
          ))}
          <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              <FaArrowLeft />
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
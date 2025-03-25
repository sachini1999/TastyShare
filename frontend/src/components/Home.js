// src/components/Home.js
import React from 'react';
import '../styles/Home.css';
import feature1Image from '../assets/images/feature1.png';
import feature2Image from '../assets/images/feature2.png';
import feature3Image from '../assets/images/feature3.png';
import Carousel from './Carousel'; // Import the Carousel component
import LatestJobs from './LatestJobs';
import Events from './EventList';
import section1Image from '../assets/images/section1.jpg';
import TopHiringCompanies from './TopHiringCompanies';
import dish2Image from '../assets/images/grid2.jpg';
import dish3Image from '../assets/images/grid3.jpg';
import dish4Image from '../assets/images/grid4.jpg';
import aboutImage from '../assets/images/about.jpg';


function Home() {
  return (
    <div className="home">
      {/* Carousel Section */}
      <Carousel /> 

  {/* Features Section */}
  <section id="features">
  <h2 className="section-featurestitle">We Offer</h2>
  <div className="container">
    <div className="features-card">
      <img src={feature1Image} alt="Career Connections" />
      <h3>Recipe Sharing</h3>
      <p>Share your favorite recipes with others and discover new dishes to try. Upload ingredients and instructions to inspire fellow food lovers.</p>
    </div>

    <div className="features-card">
      <img src={feature2Image} alt="Streamlined Applications" />
      <h3>Recipe Discoveries</h3>
      <p>Browse through a wide variety of recipes based on your taste preferences and dietary needs. Find new meals to cook every day.</p>
    
    </div>

    <div className="features-card">
      <img src={feature3Image} alt="Flexible Job Options" />
      <h3>Community Interaction</h3>
      <p>Engage with other cooks by commenting, sharing, and rating recipes. Build connections and get inspired by others' creations.</p>
    </div>
  </div>
</section>



<h2 className="section-title">About Us</h2>
<section id="about-us">
  <div className="about-container">

    
    <div className="about-text">
      <h3>Our Story</h3>
      <p>RecipeShare was created with a passion for bringing people together through the joy of cooking. Our platform allows food enthusiasts to share their favorite recipes, discover new dishes, and connect with a global community of home cooks and professional chefs alike.</p>
      
      <h3>Our Commitment</h3>
      <p>At RecipeShare, we are dedicated to inspiring creativity in the kitchen. We provide a space where everyone, from beginners to seasoned chefs, can explore diverse cuisines, share tips, and get personalized recipe recommendations. Our goal is to foster a love for cooking and create a welcoming community of food lovers.</p>
      
      <a href="/about" className="learn-more">Learn More</a>
    </div>
  </div>
</section>


<LatestJobs />

{/* Menu Introduction Section */}
<section className="menu-introduction">
        <div className="intro-content">
        <h2>Discover AI-Powered Recipe Recommendations</h2>
        <p>
      Let the power of AI guide you to the perfect recipe! 
      RecipeShare’s intelligent recommendation system matches your taste preferences, dietary needs, and cooking skills with the most delicious and suitable recipes, helping you cook with confidence and explore new flavors.
    </p>
          <a href="/list" className="view-btn">Explore Jobs</a>
        </div>

        <div className="images-grid">
          <img src={section1Image} alt="AI" />
          
        </div>
      </section>




    

    </div>
  );
}

export default Home;


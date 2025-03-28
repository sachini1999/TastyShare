import React, { useState, useEffect, useRef } from 'react';
import '../styles/Carousel.css';

const Carousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);
  const carouselRef = useRef(null);

  // Fetch carousel items
  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/carousels');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCarouselItems(data);
      } catch (error) {
        console.error('Error fetching carousel data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselItems();
  }, []);

  // Carousel functionality using React state and refs
  useEffect(() => {
    if (!carouselItems.length) return;

    const showSlide = (n) => {
      const newSlide = (n + carouselItems.length) % carouselItems.length;
      setCurrentSlide(newSlide);
    };

    // Auto-advance slides
    slideInterval.current = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 3000);

    // Cleanup
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [carouselItems, currentSlide]);

  const handlePrev = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    startTimer();
  };

  const handleNext = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    startTimer();
  };

  const startTimer = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 3000);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section id="carousel" ref={carouselRef}>
      <div id="carousel-container">
        {carouselItems.map((item, index) => (
          <div 
            className="carousel-slide" 
            key={index}
            style={{ 
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 0.5s ease'
            }}
          >
            <img src={`http://localhost:5000/images/${item.image_path}`} alt={item.alt_text} />
            <div className="carousel-overlay">
              <h3>{item.overlay_title}</h3>
              <p>{item.overlay_content}</p>
              <a href={item.button_link} className="carousel-btn">{item.button_text}</a>
            </div>
          </div>
        ))}
        <button id="prevBtn" onClick={handlePrev}>&#10094;</button>
        <button id="nextBtn" onClick={handleNext}>&#10095;</button>
      </div>
    </section>
  );
};

export default Carousel;
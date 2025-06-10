/* Author - Ihab Laboud */

// Importing necessary modules and components from React and external libraries.
import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';  
import '../styles_pages/Home_style.css';  
import data from '../data/data-Testimonials/testimonialsDataHome.json'; 
import '../styles_sections/style_Testimonials.css';  

const Testimonials = () => {
  const sliderRef = useRef(null);  
  const [slidesToShow, setSlidesToShow] = useState(1);  

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;  // Getting the current window width.
      if (width >= 900) {
        setSlidesToShow(3);  // Show 3 slides if window width is 900px or more.
      } else if (width >= 700) {
        setSlidesToShow(2);  // Show 2 slides if window width is 700px or more.
      } else {
        setSlidesToShow(1);  // Show 1 slide for smaller widths.
      }
    };

    handleResize();  // Initial call to set the correct number of slides on component mount.

    window.addEventListener('resize', handleResize);  

    return () => window.removeEventListener('resize', handleResize);  
  }, []);

  // Custom component for the next arrow button in the slider.
  const TestimonialNextArrow = ({ onClick }) => {
    return (
      <button className="testimonial-arrow next-arrow" onClick={onClick}>
        &#10095; 
      </button>
    );
  };

  // Custom component for the previous arrow button in the slider.
  const TestimonialPrevArrow = ({ onClick }) => {
    return (
      <button className="testimonial-arrow prev-arrow" onClick={onClick}>
        &#10094;  
      </button>
    );
  };

  // Function to render stars based on the rating provided in the testimonials data.
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i}>★</span>);  
    }
    return stars;  
  };

  // Settings for the react-slick slider.
  const settings = {
    dots: false,  
    infinite: true,  
    speed: data.settings.speed,  
    slidesToShow: slidesToShow,  
    slidesToScroll: 1,  
    autoplay: true,  
    autoplaySpeed: data.settings.autoplaySpeed,  
    pauseOnHover: false,  
    draggable: false,  
    arrows: false  
  };

  return (
    <div className="testimonials">
      <h2 className="testimonials-header">{data.header}</h2>  
      <Slider {...settings} ref={sliderRef}>
        {data.testimonials.map((testimonial) => (
          <div className="testimonial-item" key={testimonial.id}>
            <p className="testimonial-text">{testimonial.text}</p>  
            <div className="stars">
              {renderStars(testimonial.rating)}  
            </div>
            <small>- {testimonial.author}</small>  
          </div>
        ))}
      </Slider>
      <div className="arrows-container">
        <TestimonialPrevArrow onClick={() => sliderRef.current.slickPrev()} />  
        <TestimonialNextArrow onClick={() => sliderRef.current.slickNext()} />   
      </div>
    </div>
  );
};

export default Testimonials;
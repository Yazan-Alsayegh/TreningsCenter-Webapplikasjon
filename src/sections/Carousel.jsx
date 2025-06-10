/* Author: Yazan Alsayegh */

import React from 'react';
import Slider from 'react-slick'; // Importing the Slider component from 'react-slick' for carousel functionality
import 'slick-carousel/slick/slick.css'; // Importing slick-carousel CSS for default styles
import 'slick-carousel/slick/slick-theme.css'; // Importing slick-carousel theme CSS for additional styles
import '../styles_sections/style_Carousel.css'; // Importing custom CSS for the carousel

const Carousel = ({ ServicesData }) => {
  
  // Custom arrow component for next arrow
  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="custom-arrow next-arrow" onClick={onClick}>
        &#10095; 
      </button>
    );
  };

  // Custom arrow component for previous arrow
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="custom-arrow prev-arrow" onClick={onClick}>
        &#10094; 
      </button>
    );
  };

  // Settings for the slider
  const settings = {
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div>
      {/* Header section of the carousel */}
      <section className="Carousel-Header">
        <h2>{ServicesData.Carousel_HeaderTitle}</h2>
        <p>{ServicesData.Carousel_HeaderText}</p>
      </section>
      
      {/* Main carousel section */}
      <section className="Carousel">
        {/* Iterating through sections to create multiple carousels */}
        {[ServicesData.section_1, ServicesData.section_2, ServicesData.section_3].map((section, sectionIndex) => (
          <div key={sectionIndex} className={sectionIndex % 2 === 1 ? "reverse-container" : "container-carousel"}>
            <div className="image-info-container">
              {/* Container for image information */}
              {section.map((image, index) => (
                <div key={index} className="image-info">
                  <h2>{image.title}</h2>
                  <p>{image.description}</p>
                </div>
              ))}
            </div>
            {/* Slider component for the images */}
            <Slider {...settings} className="full-width-slider">
              {section.map((image, index) => (
                <div key={index} className="image-wrapper">
                  <img src={image.src} alt={`Img ${index + 1}`} /> {/* Displaying image */}
                </div>
              ))}
            </Slider>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Carousel;
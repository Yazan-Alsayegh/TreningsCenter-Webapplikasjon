// Author - Ihab Laboud 

// Import necessary React hooks and components.
import React, { useEffect, useRef, useState } from 'react';
// Import CSS for the Banner component.
import '../styles_sections/style_Banner.css';
// Import banner data from the JSON file.
import bannerDataHome from '../data/data-Banner/bannerDataHome.json';

// Define a functional component named `Banner`.
function Banner() {
  // A useRef to track the visibility state of the slogan without re-rendering the component.
  const showSloganRef = useRef(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    // Define a function to fade in elements after a delay.
    const fadeInElement = (element, delay) => {
      setTimeout(() => {
        if (element) {
          element.style.opacity = 1;  
        }
      }, delay);
    };

    // Get elements by ID to be used for animations.
    const firstPart = document.getElementById('first-part');
    const secondPart = document.getElementById('second-part');
    const thirdPart = document.getElementById('third-part');

    // Get animation delay from the imported JSON data.
    const { animationDelay } = bannerDataHome;

    // Apply the fade-in effect to the elements.
    fadeInElement(firstPart, animationDelay);
    fadeInElement(secondPart, animationDelay);
    fadeInElement(thirdPart, animationDelay);
    
    showSloganRef.current = true;
  }, []);  

  // The component renders a div containing different types of content based on the data.
  return (
    <div className="banner-container">
      <div className="Banner">
        {bannerDataHome.items.map((item, index) => {
          if (item.type === 'text' && item.slogan) {
            // Render text items with slogans.
            return (
              <div key={index} className={`slogan ${showSloganRef.current ? 'show' : ''}`}>
                <div className="slogan">
                  <div className="slogan-parts">
                    <h1 id="first-part">{item.slogan.firstPart}</h1>
                  </div>
                  <h5 id="second-part">{item.slogan.secondPart}</h5>                
                  </div>
              </div>
            );
          } else if (item.type === 'video' && item.videoURL) {
            // Render video or alternative image content.
            return (
              <div key={index} className="banner-media">
                {!videoFailed ? (
                  <video
                    autoPlay
                    loop
                    muted
                    className="banner-video"
                    onError={() => setVideoFailed(true)}  // Handle video load failure.
                  >
                    <source src={process.env.PUBLIC_URL + item.videoURL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : !imageFailed ? (
                  <img
                    src={process.env.PUBLIC_URL + item.altImageURL}
                    alt={item.altText}
                    className="banner-image"
                    onError={() => setImageFailed(true)}  // Handle image load failure.
                  />
                ) : (
                  <div className="banner-alt-text">
                    {item.altText}
                  </div>
                )}
              </div>
            );
          }
          return null; 
        })}
      </div>
    </div>
  );
}


export default Banner;
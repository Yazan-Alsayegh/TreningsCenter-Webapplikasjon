// Author: Dilovan Muradyan & Ihab Laboud

import React, { useState, useRef, useEffect } from 'react';

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false); // State to track if the accordion is active/open
  const contentRef = useRef(null); // Reference to the accordion content div

  useEffect(() => {
    // Adjust the max-height of the content based on the active state
    if (isActive) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`; // Expand to show content
    } else {
      contentRef.current.style.maxHeight = '0px'; // Collapse to hide content
    }
  }, [isActive]); // Effect runs whenever isActive changes

  return (
    <div className="accordion">
      {/* Label acting as the title of the accordion; toggles isActive state on click */}
      <label
        htmlFor={title.replaceAll(' ', '')} // Use a unique ID based on the title
        className={`accordion-title ${isActive ? 'active' : ''}`} // Apply active class if accordion is open
        onClick={() => setIsActive(!isActive)}
      >
        {title}
      </label>
      {/* Content section of the accordion, height controlled by CSS */}
      <div ref={contentRef} className="accordion-content">
        {content}
      </div>
    </div>
  );
};

export default Accordion;

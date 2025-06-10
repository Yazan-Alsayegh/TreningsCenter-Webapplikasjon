// Author Zafar Alem

import React from 'react';
import '../styles_sections/style_CardBox.css';

const CardBox = ({ data }) => {
  // Extract section title and subtitle
  const { sectionTitle, sectionSubtitle, cards,} = data;

  return (
    <div className="cardbox-section">
      <div className="section-title">
        <h5 className='section-subtitle'>{sectionSubtitle}</h5>
        <h2 className='section-title'>{sectionTitle}</h2>
      </div>
      <div className="card-box-container">
        {cards.map((item, index) => (
          <div className="cardbox" key={index}>
            <img src={item.image} alt={item.alt} className="card-image" />
            <h2 className="card-title">{item.title}</h2>
            <p className="card-text">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardBox;

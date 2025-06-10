// Author Osasere Dauda Usen

import React from 'react';
import '../styles_sections/style_SubHero.css';

const SubHero = ({ data }) => {
  return (
    <div className="subhero-container">
      <section className="subhero">
        <div className="text-content">
          <h1 className="main-title" id="main-title">{data.bannerTitle}</h1>
          <p className="description" id="description">{data.bannerDescription}</p>
          <div className="webstore-icons">
            <a href={data.appStoreLink} target="_blank" rel="noopener noreferrer">
              <img src={data.appStoreBadge} alt="App Store Badge Link" />
            </a>
            <a href={data.googlePlayLink} target="_blank" rel="noopener noreferrer">
              <img src={data.googlePlayBadge} alt="Google Play Store Link" />
            </a>
          </div>
        </div>
        <div className="hero-images">
          <img src={data.bannerImages[0]} alt="Hero One" id="hero-one" className="hero-one" />
          <img src={data.bannerImages[1]} alt="Hero Two" id="hero-two" className="hero-two" />
        </div>
      </section>
    </div>
  );
};

export default SubHero;

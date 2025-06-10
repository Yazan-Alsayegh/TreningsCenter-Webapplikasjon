// Author - Tinius S-F //
import React from 'react';
import SubBanner from '../sections/SubBanner';
import aboutData from '../data/data-AboutUs/data-AboutUs.json';
import '../styles_pages/AboutUs.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function AboutUs() {
    const { aboutZenFitness, teamMembers } = aboutData;

    return (
        <div className='about-us-body'>
            <SubBanner pageId="AboutUs" />

            <section className="about-zen-fitness-section">
                <h2 className="section-title">{aboutZenFitness.intro}</h2>
                <div className="features-grid">
                    {aboutZenFitness.features.map((feature, index) => (
                        <div key={index} className="feature-box">
                            <div className="feature-header">
                                <FontAwesomeIcon className="feature-icon" icon={faCheckCircle} />
                                <h3 className="feature-title">{feature.title}</h3>
                            </div>
                            <p className="feature-text">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="welcome-section">
                <div className='welcome-title-txt'>
                    <h2 className="section-title">Meet Our Professional Trainers</h2>
                    <div className="welcome-box-wide">
                        {aboutZenFitness.welcomeText.map((paragraph, index) => (
                            <p key={index} className="feature-text">{paragraph}</p>
                        ))}
                    </div>
                </div>
            </section>

            {teamMembers.map((item, index) => (
                <div key={index} className={`team-member-box ${index === 1 ? "middle-container" : ""}`}>
                    <div className="team-member-text">
                        <h2 className="team-member-title">{item.title}</h2>
                        <p className="team-member-content">{item.content}</p>
                    </div>
                    <div className="team-member-image-container">
                        <img src={item.src} alt={item.title} className="team-member-image" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AboutUs;

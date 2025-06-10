// Author - Tinius S-F
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../styles_sections/style_TeamMembers.css';

function TeamMembers({ teamData }) { 

    return (
        <div className='teamMembers-body'>
            <h5 className="teamMembers-main-title section-subtitle">WHO WE ARE</h5>
            <h2 className="teamMembers-subtitle section-title">THE MINDS BEHIND OUR SUCCESS</h2>
            <div className="teamMembers-container">
                {teamData.map((member, index) => (
                    <div className="teamMembers-rectangle" key={index}>
                        <img src={member.imageSrc} alt={member.name} className="teamMembers-image" />
                        <div className="teamMembers-info">
                            <h3>{member.name}</h3>
                            <p>{member.position}</p>
                            <div className="teamMembers-social-icons">
                                <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="teamMembers-social-icon-link">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </a>
                                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="teamMembers-social-icon-link">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default TeamMembers;
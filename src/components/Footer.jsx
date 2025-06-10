/* Author - Ihab Laboud */

import React from 'react';
import logo from '../logo/zenTreeLogo.png'; 
import footerData from '../data/data-Footer/footerData.json'; 
import { FaMapMarkerAlt, FaPhone, FaEnvelopeOpen, FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa'; 
import { BsTwitterX } from "react-icons/bs"; 
import '../styles_components/style_footer.css'; 
// Footer component
const Footer = () => {
  
  // Function to render social media icons
  const renderSocialIcon = (platform, url) => {
    switch(platform) {
      case 'facebook': 
        return <a href={url} target="_blank" rel="noopener noreferrer"><FaFacebookF className="facebook-bg" /></a>;
      case 'twitter': 
        return <a href={url} target="_blank" rel="noopener noreferrer"><BsTwitterX className="twitter-bg" /></a>;
      case 'instagram': 
        return <a href={url} target="_blank" rel="noopener noreferrer"><FaInstagram className="instagram-bg" /></a>;
      case 'linkedin': 
        return <a href={url} target="_blank" rel="noopener noreferrer"><FaLinkedin className="linkedin-bg" /></a>;
      default: 
        return null; 
    }
  };

  // Return JSX to render the footer
  return (
    <footer className="footer">
      <div className="container">
        {/* Contact Information Section */}
        <div className="footer-contact pt-5 pb-5">
          <div className="row">
            {/* Address */}
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="footer-contact-item">
                <FaMapMarkerAlt />
                <div className="footer-contact-text">
                  <h5>{footerData.address.title}</h5>
                  <a href={`https://www.google.com/maps/place/${encodeURIComponent(footerData.address.content)}`} target="_blank" rel="noopener noreferrer">
                    {footerData.address.content}
                  </a>
                </div>
              </div>
            </div>
            {/* Phone */}
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="footer-contact-item">
                <FaPhone />
                <div className="footer-contact-text">
                  <h5>{footerData.phone.title}</h5>
                  <span><a href={`tel:${footerData.phone.number}`}>{footerData.phone.number}</a></span>
                </div>
              </div>
            </div>
            {/* Email */}
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="footer-contact-item">
                <FaEnvelopeOpen />
                <div className="footer-contact-text">
                  <h5>{footerData.email.title}</h5>
                  <span><a href={`mailto:${footerData.email.address}`}>{footerData.email.address}</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Footer Content */}
        <div className="footer-content pt-5 pb-5">
          <div className="row">
            {/* About Section */}
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <img src={logo} alt="Logo" className="footer-logo-img" />
                </div>
                <div className="footer-text">
                  <p>{footerData.about}</p>
                </div>
                <div className="footer-social-icon">
                  <span>{footerData.socialMedia.title}</span>
                  {/* Render social media links */}
                  {footerData.socialMedia.links.map((link, index) => (
                                        <React.Fragment key={index}>
                      {renderSocialIcon(link.platform, link.url)}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            {/* Quick Links Section */}
            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 mb-20">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h2>{footerData.quickLinks.title}</h2>
                </div>
                <ul>
                  {footerData.quickLinks.links.map((link, index) => (
                    <li key={index}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Useful Links Section */}
            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 mb-20">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h2>{footerData.usefulLinks.title}</h2>
                </div>
                <div className="footer-text">
                  <ul>
                    {footerData.usefulLinks.links.map((link, index) => (
                      <li key={index}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Opening Hours Section */}
            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 mb-20">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h2>{footerData.openingHours.title}</h2>
                </div>
                <div className="footer-text mb-25">
                  {footerData.openingHours.schedule
                                      .map((item, index) => (
                    <div key={index}>
                      <p>{item.days}</p>
                      <p>{item.hours}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Copyright */}
      <div className="footer-copyright">
        <div className="row">
          <div className="col-xl-12">
            <div className="footer-copyright-text text-center">
              <p>{footerData.copyright}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
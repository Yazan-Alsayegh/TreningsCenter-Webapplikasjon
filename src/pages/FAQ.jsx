// Author: Dilovan Muradyan & Joakim Evensen

import React from 'react';
import '../styles_pages/FAQ_style.css'; // Main CSS for FAQ page
import Accordion from '../sections/Accordion'; // Accordion component for collapsible sections
import '../styles_sections/style_Accordion.css'; // CSS specific to Accordion component
import faqData from '../data/data-FAQ/faqData.json'; // Importing FAQ data from a JSON file
import SubBanner from '../sections/SubBanner'; // Import SubBanner component for the banner section

function FAQ() {
    // Function to smoothly scroll to a specific section of the page
    const handleScrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.getBoundingClientRect().top + window.pageYOffset - 120;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    };

    // Button titles corresponding to FAQ categories
    const buttonTitles = [
        "Membership", "Payment", "Access", "Guest Policies", "Privacy & Data Security", "Facilities & Equipment"
    ];

    // Destructuring the data from the imported JSON
    const { membershipData, paymentData, accessData, guestPolicies, privacyAndDataSecurity, facilitiesAndEquipment } = faqData;

    return (
        <div className='faq-page'>
            {/* Banner section with a sub-banner component */}
            <section className="faq-banner-section faq-banner-img">
                <SubBanner pageId="FAQ" />
            </section>

            {/* Section for FAQ heading and subtitle */}
            <section className="faq-section faq-section-1">
                <h2 className="faq-heading">Frequently Asked Questions</h2>
                <h6 className="faq-subtitle">Here you can find a variety of frequently asked questions. If none of these questions have the answers you need, feel free to contact us!</h6>
            </section>

            {/* Button section for navigating to different FAQ categories */}
            <section className="faq-section faq-section-2">
                <div className="button-container">
                    {buttonTitles.map((title, index) => (
                        <button
                            key={index}
                            className="faq-button"
                            onClick={() => handleScrollToSection(`faq-section-${index + 3}`)}
                        >
                            {title}
                        </button>
                    ))}
                </div>
            </section>

            {/* Membership FAQ Section */}
            <div id="faq-section-3" className="faq-accordion-section">
                <h2>Membership</h2>
                {membershipData.map((item, index) => (
                    <Accordion key={index} title={item.title} content={<div dangerouslySetInnerHTML={{ __html: item.content }} />} />
                ))}
            </div>

            {/* Payment FAQ Section */}
            <div id="faq-section-4" className="faq-accordion-section">
                <h2>Payment</h2>
                {paymentData.map((item, index) => (
                    <Accordion key={index} title={item.title} content={<div dangerouslySetInnerHTML={{ __html: item.content }} />} />
                ))}
            </div>

            {/* Access FAQ Section */}
            <div id="faq-section-5" className="faq-accordion-section">
                <h2>Access</h2>
                {accessData.map((item, index) => (
                    <Accordion key={index} title={item.title} content={<div dangerouslySetInnerHTML={{ __html: item.content }} />} />
                ))}
            </div>

            {/* Guest Policies FAQ Section */}
            <div id="faq-section-6" className="faq-accordion-section">
                <h2>Guest Policies</h2>
                {guestPolicies.map((item, index) => (
                    <Accordion key={index} title={item.title} content={<div dangerouslySetInnerHTML={{ __html: item.content }} />} />
                ))}
            </div>

            {/* Privacy and Data Security FAQ Section */}
            <div id="faq-section-7" className="faq-accordion-section">
                <h2>Privacy and Data Security</h2>
                {privacyAndDataSecurity.map((item, index) => (
                    <Accordion key={index} title={item.title} content={<div dangerouslySetInnerHTML={{ __html: item.content }} />} />
                ))}
            </div>

            {/* Facilities and Equipment FAQ Section */}
            <div id="faq-section-8" className="faq-accordion-section">
                <h2>Facilities and Equipment</h2>
                {facilitiesAndEquipment.map((item, index) => (
                    <Accordion key={index} title={item.title} content={<div dangerouslySetInnerHTML={{ __html: item.content }} />} />
                ))}
            </div>
        </div>
    );
}

export default FAQ;

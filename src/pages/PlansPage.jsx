// Author: Dilovan Muradyan

import React from 'react';
import '../styles_pages/PlansPage_style.css'; // Main CSS for the Plans page
import Accordion from '../sections/Accordion'; // Accordion component for collapsible sections
import '../styles_sections/style_Accordion.css'; // CSS specific to Accordion component for Plans page
import Plans from '../sections/Plans'; // Component for displaying prices
import plansPageData from '../data/data-PlansPage/PlansPageData'; // Importing JSON data for banner and boxes

const PlansPage = () => {
    // Destructure mainSection and accordionData from plansPageData
    const { mainSection, accordionData } = plansPageData;

    return (
        <div className='plans'>
            {/* Main section displaying the heading and subheading */}
            <section className='Plans-main-section'>
                <h5 className="main-subheading section-subtitle">{mainSection.subheading}</h5>
                <h2 className="main-heading section-title">{mainSection.heading}</h2>
            </section>
            
            <div className="title-container-plans"></div>
            
            {/* Section displaying the Plans component for pricing information */}
            <section className='Plans-prices-section'>
                <Plans /> 
            </section>
            
            {/* Accordion section for common questions */}
            <section className='Accordion-section'>
                <h2 className='section-title'>Common Questions</h2>
                {accordionData.map((item, index) => (
                    <Accordion 
                        key={index}
                        title={item.title} 
                        content={item.content.map((paragraph, idx) => (
                            // Use dangerouslySetInnerHTML to render HTML content safely because of JSON data extraction
                            <div key={idx} dangerouslySetInnerHTML={{ __html: paragraph }}></div>
                        ))}
                    />
                ))}
                <br></br>
            </section>
        </div>
    );
}

export default PlansPage;

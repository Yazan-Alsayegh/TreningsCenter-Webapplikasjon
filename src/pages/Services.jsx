/* Author: Yazan Alsayegh */

import React from 'react';
import SubBanner from '../sections/SubBanner'; // Importing the SubBanner component
import '../styles_sections/style_SubBanner.css'; // Importing custom styles for the SubBanner
import Carousel from '../sections/Carousel';  // Importing the Carousel component
import ServicesData from '../data/data-Carousel/carouselData.json'; // Importing carousel data from carouselData json 

function Services() {

    return (
        <div>
            {/* Main container for the services page */}
            <div className="services-body"></div> {/* Placeholder div for the main content body */}
            <SubBanner pageId="Services" /> {/* Rendering SubBanner component with "Services" as pageId */}
            <div className='carousels'></div> {/* Placeholder div for the carousels */}
            <Carousel ServicesData={ServicesData} /> {/* Rendering Carousel component with data from ServicesData */}
        </div>
    );
}

export default Services;
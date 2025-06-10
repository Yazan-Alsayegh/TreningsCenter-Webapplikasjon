// Tinius N-S

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles_sections/style_SubBanner.css';

const SubBanner = ({ pageId }) => {
    const [bannerData, setBannerData] = useState({
        imagePath: '',
        altText: ''
    });

    useEffect(() => {
        // Correct path to go up one level and then into the data directory
        import('../data/data-SubBanner/subBannerDataHome.json')
            .then(data => {
                const pageData = data.default[pageId];
                if (pageData) {
                    // Dynamically find the first image path in the pageData object
                    const imagePathKey = Object.keys(pageData).find(key => key.includes('imagePath'));
                    const imagePath = pageData[imagePathKey] || '';

                    setBannerData({
                        imagePath: imagePath,
                        altText: pageData.altText
                    });
                } else {
                    console.error("Banner data not found for the page:", pageId);
                }
            })
            .catch(error => console.error("Failed to load banner data", error));
    }, [pageId]);

    const { imagePath, altText } = bannerData;

    return (
        <div className="subBanner-container">
            <img src={imagePath} alt={altText} className="subBanner-image horizontal" />
        </div>
    );
};

SubBanner.propTypes = {
    pageId: PropTypes.string.isRequired,
};

export default SubBanner;

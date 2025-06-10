// Author: Dilovan Muradyan & Zafar Alem

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles_sections/style_Plans.css'; // Main CSS for the Plans component
import { getDatabase, ref, onValue } from 'firebase/database'; // Firebase imports for real-time database interaction

function Plans() {
    const navigate = useNavigate();
    const [isYearly, setIsYearly] = useState(false); // State to toggle between monthly and yearly plans
    const [plansData, setPlansData] = useState([]); // State to store plans data fetched from Firebase

    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    // Function to toggle the price plan between monthly and yearly
    const togglePrice = () => {
        setIsYearly(prevState => !prevState);
    };

    useEffect(() => {
        // Fetch plan data from Firebase Realtime Database
        const db = getDatabase();
        const plansRef = ref(db, 'zenData/plans');
        
        // Listen for changes in plan data
        onValue(plansRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert the data into an array of plan objects
                const plansArray = Object.entries(data).map(([name, details]) => ({ name, ...details }));
                setPlansData(plansArray);
            }
        });
    }, []); // Empty dependency array means this effect runs once after initial render

    // Function to handle plan selection and navigate to the signup page
    const handlePlanSelect = (plan) => {
        scrollToTop(); // Scroll to the top before navigating
        // Pass selected plan data to the signup page
        navigate('/signup', { state: { selectedPlan: { ...plan, isYearly: isYearly } } });
    };

    return (
        <div className="pricing-container">
            {/* Toggle switch between monthly and yearly plans */}
            <div className="plan-switch">
                <span className="price-span">Monthly Plan</span>
                <div className="switch-container" onClick={togglePrice}>
                    <div className={`switch-container--box ${isYearly ? 'switch-container--box--move' : ''}`}></div>
                </div>
                <span className="price-span">Yearly Plan</span>
            </div>

            {/* Cards displaying the different pricing options */}
            <div className="cards">
                {plansData.map((pricingOption, index) => (
                    <div className={`price-card ${pricingOption.name === 'Premium' ? 'premium' : ''}`} key={index}>
                        <div className="price-card--top">
                            <h3>{pricingOption.name}</h3>
                            <h5>${isYearly ? pricingOption.priceYearly : pricingOption.priceMonthly}<strong className="price-text">{isYearly ? '/year' : '/month'}</strong></h5>
                            <hr />
                        </div>
                        <div className="price-card--bottom">
                            <ul>
                                {/* List of features included in the plan */}
                                {pricingOption.features.map((feature, index) => (
                                    <li key={index}><i className="fa fa-check"></i>{feature}</li>
                                ))}
                            </ul>
                            <button className="btn" onClick={() => handlePlanSelect(pricingOption)}>
                                {pricingOption.name === 'Free' ? 'Try it' : `Buy ${isYearly ? 'yearly' : 'monthly'}`}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Plans;
// Author: Zafar Alem


import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getDatabase, ref, get, set } from "firebase/database";
import "../styles-sections-mymembership/style_plansContent.css";
import { auth } from "../config-fb/firebase"; 

function PlansContent({ userData, setUserData }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPlan, setEditedPlan] = useState({
        name: userData.selectedPlan.name,
        type: userData.selectedPlan.type,
        price: userData.selectedPlan.price,
    });
    const [plans, setPlans] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(userData.selectedPlan.price);
    const [isYearly, setIsYearly] = useState(editedPlan.type === "Yearly");
    const [planStartDate, setPlanStartDate] = useState(userData.planStartDate);
    const [currentPlanText, setCurrentPlanText] = useState('');
    const [membershipActive, setMembershipActive] = useState(userData.membershipActive);

    useEffect(() => {
        // Fetch plans from the database
        const db = getDatabase();
        const plansRef = ref(db, "zenData/plans");

        get(plansRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const plansData = snapshot.val();
                    const plansArray = Object.keys(plansData).map((key) => ({
                        name: key,
                        priceMonthly: plansData[key].priceMonthly,
                        priceYearly: plansData[key].priceYearly,
                    }));
                    setPlans(plansArray);
                } else {
                    console.log("No plans available");
                }
            })
            .catch((error) => {
                console.error("Error fetching plans:", error);
            });

        // Set current plan text if membership is active
        if (membershipActive) {
            setCurrentPlanText(`Current plan: ${userData.selectedPlan.type}, ${userData.selectedPlan.name}, $${userData.selectedPlan.price}`);
        } else {
            setCurrentPlanText('');
        }
    }, [userData.selectedPlan, membershipActive]);

    useEffect(() => {
        // Update membershipActive state
        setMembershipActive(userData.membershipActive);
    }, [userData.membershipActive]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handlePlanNameChange = (selectedOption) => {
        const selectedPlanName = selectedOption.value;
        const selectedPlan = plans.find((plan) => plan.name === selectedPlanName);
        console.log("Selected plan:", selectedPlan);
        if (selectedPlan) {
            const price = isYearly ? selectedPlan.priceYearly : selectedPlan.priceMonthly;
            setEditedPlan({
                ...editedPlan,
                name: selectedPlanName,
                price: price,
            });
            setSelectedPrice(price); // Update selected price
        } else {
            console.error("Selected plan not found:", selectedPlanName);
        }
    };

    const handlePlanTypeChange = () => {
        const newType = isYearly ? "Monthly" : "Yearly";
        const price = isYearly ? plans.find(plan => plan.name === editedPlan.name).priceMonthly : plans.find(plan => plan.name === editedPlan.name).priceYearly;
        setEditedPlan({
            ...editedPlan,
            type: newType,
            price: price,
        });
        setIsYearly(!isYearly);
        setSelectedPrice(price); // Update selected price
    };

    const updateUserPlan = (updatedPlan) => {
        const db = getDatabase();
        const userRef = ref(db, `zenData/userData/${auth.currentUser.uid}`);
        set(userRef, { ...userData, selectedPlan: updatedPlan, planStartDate: new Date().toISOString().slice(0, 10), membershipActive: true })
            .then(() => {
                console.log("User's selected plan and membership status updated successfully");
                // Update the user data in the parent component
                if (typeof setUserData === 'function') {
                    setUserData({
                        ...userData,
                        selectedPlan: updatedPlan,
                        planStartDate: new Date().toISOString().slice(0, 10),
                        membershipActive: true
                    });
                }
            })
            .catch((error) => {
                console.error("Error updating user's selected plan and membership status:", error);
            });
    };

    const handleSavePlan = () => {
        // Check if the selected plan is different from the user's current plan
        if (editedPlan.name !== userData.selectedPlan.name || editedPlan.type !== userData.selectedPlan.type || !membershipActive) {
            // Update user's selected plan, plan start date, and membership status in the database
            updateUserPlan(editedPlan);
        } else {
            // If the selected plan is the same as the user's current plan and membership is active, only set isEditing to false
            setIsEditing(false);
        }
        // Refresh the page
        window.location.reload();
    };

    const handleCancelMembership = () => {
        const confirmation = window.confirm("Are you sure you want to cancel your membership?");
        if (confirmation) {
            // Set membershipActive to false
            const db = getDatabase();
            const userRef = ref(db, `zenData/userData/${auth.currentUser.uid}`);
            set(userRef, { ...userData, membershipActive: false })
                .then(() => {
                    console.log("Membership canceled successfully");
                    // Update the user data in the parent component
                    if (typeof setUserData === 'function') {
                        setUserData({
                            ...userData,
                            membershipActive: false
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error canceling membership:", error);
                });
        }
    };

    return (
        <div className="plan-content">
            <div className="plan-data">
                <div className="plan-data-fields">
                    <div className="plan-top-part">
                        <div className="plan-input-info">
                            {isEditing && membershipActive && (
                                <div className="current-plan-text"><strong>{currentPlanText}</strong></div>
                            )}
                            <div className="plan-field planName-field">
                                <label htmlFor="planName">Name:</label>
                                {isEditing ? (
                                    <Select
                                        value={{ label: editedPlan.name, value: editedPlan.name }}
                                        onChange={(selectedOption) => handlePlanNameChange(selectedOption)}
                                        options={plans.map(plan => ({ value: plan.name, label: plan.name }))}
                                        className="select-wrapper"
                                        classNamePrefix="react-select"
                                    />
                                ) : (
                                    <li>{editedPlan.name}</li>
                                )}
                            </div>
                            <div className="plan-field">
                                <label htmlFor="planType">Type:</label>
                                {isEditing ? (
                                    <div className="custom-toggle-switch">
                                        <span className="toggle-label">MM</span>
                                        <div className="toggle-container" onClick={handlePlanTypeChange}>
                                            <div className={`toggle-button ${isYearly ? 'toggle-button--active' : ''}`}></div>
                                        </div>
                                        <span className="toggle-label">YY</span>
                                    </div>
                                ) : (
                                    <li>{editedPlan.type}</li>
                                )}
                            </div>

                            <div className="plan-field">
                                <label htmlFor="planPrice">Price($): </label>
                                <li>{selectedPrice}</li>
                            </div>
                        </div>
                    </div>
                    <div className="planStartDate">
                        <label>Start Date:</label>
                        <li>{planStartDate}</li>
                    </div>
                </div>
                <p>
                    The subscription for the plan is charged on{" "}
                    <strong>{editedPlan.type}</strong> basis.
                </p>
                {isEditing ? (
                    <>
                        <button onClick={handleSavePlan}>Save</button>
                        <button onClick={handleEditToggle}>Cancel</button>
                    </>
                ) : (
                    <div className="footer-buttons">
                        <button onClick={handleEditToggle}>Edit Plan</button>
                        {membershipActive ? (
                            <button id="cancelMembershipBtn" onClick={handleCancelMembership}>Cancel Membership</button>
                        ) : (
                            <p>Become a member again by selecting a plan</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlansContent;

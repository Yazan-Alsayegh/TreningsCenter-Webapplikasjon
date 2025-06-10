// Author Zafar Alem

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import '../styles_login-signup/signup-style.css'; // Import CSS file
import PersonalInformation from '../utils-login-signup/PersonalInformation';
import ContactInformation from '../utils-login-signup/ContactInformation';
import PaymentInformation from '../utils-login-signup/PaymentInformation';
import { validatePersonalInfo, validateContactInfo, validatePaymentInfo } from '../utils-login-signup/formValidation';

function Signup() {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedPlan = location.state ? location.state.selectedPlan : null;
    const [step, setStep] = useState(1); // Current step of the form
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        phoneNumber: '',
        email: '',
        password: '',
        cardNumber: '',
        cvv: '',
        expiryDate: '',
        gender: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [termsChecked, setTermsChecked] = useState(false);
    const [infoChecked, setInfoChecked] = useState(false);

    const signupFee = 20.00; // Fixed signup fee

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.trim(), // Trim input value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear error message when submitting the form

        // Perform final validation before submitting the form
        const validationError = validatePaymentInfo(formData);
        if (validationError) {
            setErrorMessage(validationError);
            return; // Do not submit if payment information is not valid
        }

        if (!termsChecked || !infoChecked) {
            setErrorMessage("Please accept terms of service and confirm provided information.");
            return;
        }

        try {
            // Create user in Firebase auth
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            const userUid = user.uid; // Get the UID of the newly created user

            // Save user data to the database
            const db = getDatabase();
            const userDataRef = ref(db, `zenData/userData/${userUid}`); // Save user data under "zenData/userData" with the user UID
            const registrationDate = new Date().toISOString().slice(0, 10); // Get current date (YYYY-MM-DD format)
            const planStartDate = selectedPlan ? new Date().toISOString().slice(0, 10) : null; // Get current date for plan start date

            // Create user data object without the password
            const { password, ...userData } = {
                ...formData,
                selectedPlan: selectedPlan
                    ? {
                        name: selectedPlan.name,
                        type: selectedPlan.isYearly ? 'Yearly' : 'Monthly',
                        price: selectedPlan.isYearly ? selectedPlan.priceYearly : selectedPlan.priceMonthly,
                    }
                    : null,
                membershipActive: true,
                registrationDate,
                planStartDate,
            };
            await set(userDataRef, userData);

            // If sign up successful: display success message 
            window.alert("Account Created successfully, Welcome!");
            navigate('/'); // Navigate to a success page or home page after successful signup
        } catch (error) {
            console.error('Error signing up:', error.message);
            // Check if the error is due to email already in use
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage("Email address is already in use. Please use a different email.");
            } else {
                setErrorMessage("An error occurred while signing up. Please try again later.");
            }
        }
    };

    const handleNext = () => {
        // Perform validation before proceeding to the next section
        switch (step) {
            case 1:
                const personalInfoError = validatePersonalInfo(formData);
                if (personalInfoError) {
                    setErrorMessage(personalInfoError);
                    return; // Do not proceed if any required fields are empty
                }
                break;
            case 2:
                const contactInfoError = validateContactInfo(formData);
                if (contactInfoError) {
                    setErrorMessage(contactInfoError);
                    return; // Do not proceed if any required fields are empty
                }
                // Add any additional validation logic for contact information
                break;
            case 3:
                const paymentInfoError = validatePaymentInfo(formData);
                if (paymentInfoError) {
                    setErrorMessage(paymentInfoError);
                    return; // Do not proceed if payment information is not valid
                }
                break;
            default:
                break;
        }

        setErrorMessage(''); // Clear error message when proceeding to the next step
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const renderSection = () => {
        switch (step) {
            case 1:
                return <PersonalInformation formData={formData} handleChange={handleChange} />;
            case 2:
                return <ContactInformation formData={formData} handleChange={handleChange} />;
            case 3:
                return <PaymentInformation formData={formData} handleChange={handleChange} />;
            default:
                return null;
        }
    };

    // Calculate total price
    const totalPrice = selectedPlan ? (signupFee + (selectedPlan.isYearly ? selectedPlan.priceYearly : selectedPlan.priceMonthly)).toFixed(2) : null;

    // Dynamically adjust form height based on error message presence
    const formHeightStyle = {
        height: errorMessage ? 'auto' : '30em',
    };

    return (
        <div className='signup-container'>
            <h2>Signup Page</h2>
            <div className='selectedPlan-signupform'>
                <div className='selectedPlan'>
                    <h3>Selected plan</h3>
                    {selectedPlan && (
                        <div className='selectedPlan-box'>
                            <div className='selectedPlan-header'>
                                <p className='selectedPlan-span'>Name: <span>{selectedPlan.name}</span></p>
                                <p className='selectedPlan-span'>Type: <span>{selectedPlan.isYearly ? 'Yearly' : 'Monthly'}</span></p>
                                <p>Start date: {new Date().toLocaleDateString()}</p>
                                <p>Signup fee: ${signupFee.toFixed(2)}</p>
                                <p>Total price: ${totalPrice}</p>
                            </div>
                            <div className='selectedPlan-footer'>
                                <p className='planPriceRow'>Plan Price: <span>${selectedPlan.isYearly ? selectedPlan.priceYearly : selectedPlan.priceMonthly}</span> </p>
                                <p className='planPriceInfo'>Your plan is charged on <strong>{selectedPlan.isYearly ? 'Yearly' : 'Monthly'}</strong>  basis.</p>
                            </div>
                        </div>
                    )}
                    {!selectedPlan && <p>No plan selected.</p>}
                </div>
                <form className='multiSecForm' onSubmit={handleSubmit} style={formHeightStyle}>
                    <div className='inputForm-area'>
                        {renderSection()}
                        {step === 3 && (
                            <div className="signup-checkboxes">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={termsChecked}
                                        onChange={() => setTermsChecked(!termsChecked)}
                                    />
                                    <p>I accept <a href='/tos' target="_blank" rel="noopener noreferrer">terms of service</a></p>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={infoChecked}
                                        onChange={() => setInfoChecked(!infoChecked)}
                                    />
                                    <p>The information I have provided is correct</p>
                                </label>
                            </div>
                        )}
                        <div className="signup-buttons">
                            {step !== 1 && <button type="button" onClick={handlePrev}>Previous</button>}
                            {step !== 3 && <button type="button" onClick={handleNext}>Next</button>}
                            {step === 3 && <button className='submitButton' type="submit">Submit</button>}
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;

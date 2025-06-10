// Author: Zafar Alem


import React, { useState } from "react";
import { getDatabase, ref, update } from "firebase/database";
import { auth } from "../config-fb/firebase"; // Assuming this is your Firebase config file
import "../styles-sections-mymembership/style_paymentContent.css";

function PaymentContent({ userData, onUpdateUserData }) {
    const [editedCardNumber, setEditedCardNumber] = useState(userData?.cardNumber || "");
    const [editedExpiryDate, setEditedExpiryDate] = useState(userData?.expiryDate || "");
    const [editedCVV, setEditedCVV] = useState(userData?.cvv || "");
    const [isEditingPayment, setIsEditingPayment] = useState(false);
    const [error, setError] = useState("");

    const handleEditPayment = () => {
        setIsEditingPayment(true);
        // Set initial state for payment details if userData exists
        if (userData) {
            setEditedCardNumber(userData.cardNumber || "");
            setEditedExpiryDate(userData.expiryDate || "");
            setEditedCVV(userData.cvv || "");
        }
    };

    const handleCancelPayment = () => {
        setEditedCardNumber(userData?.cardNumber || "");
        setEditedExpiryDate(userData?.expiryDate || "");
        setEditedCVV(userData?.cvv || "");
        setIsEditingPayment(false);
        setError(""); // Clear any previous errors
    };

    const handleSavePayment = () => {
        // Validate fields
        if (editedCardNumber.length !== 16) {
            setError("Card number must be 16 digits");
            return;
        }
        if (editedExpiryDate.length !== 4) {
            setError("Expiry date must be 4 digits");
            return;
        }
        if (editedCVV.length !== 3) {
            setError("CVV must be 3 digits");
            return;
        }

        const db = getDatabase();
        const userDataRef = ref(db, `zenData/userData/${auth.currentUser.uid}`);

        update(userDataRef, {
            cardNumber: editedCardNumber,
            expiryDate: editedExpiryDate,
            cvv: editedCVV,
        })
            .then(() => {
                console.log("Payment details updated successfully");
                setIsEditingPayment(false);
                // Call the callback function to update the parent component's data
                onUpdateUserData({
                    ...userData,
                    cardNumber: editedCardNumber,
                    expiryDate: editedExpiryDate,
                    cvv: editedCVV,
                });
                setError(""); // Clear any previous errors
            })
            .catch((error) => {
                console.error("Error updating payment details:", error);
                setError("Error updating payment details");
            });
    };

    const handleCardNumberChange = (event) => {
        const inputValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setEditedCardNumber(inputValue);
    };

    const handleExpiryDateChange = (event) => {
        const inputValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setEditedExpiryDate(inputValue);
    };

    const handleCVVChange = (event) => {
        const inputValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setEditedCVV(inputValue);
    };

    return (
        <div className="payment-container">
            {error && <div className="error-message">{error}</div>}
            <div className="payment-content">
                <div className="payment-data">
                    <div className="creditcard-card">
                        <div className="card-header">
                            <h6 id="card-title">Zen Mastercard</h6>
                            <img src="\images\images-MyMembership\z-line.png" alt="" />
                        </div>
                        <div className="card-data">
                            <div className="paymentcard-field">
                                <img id="card-chip" src="\images\images-MyMembership\bankchipNoBg.png" alt="" />
                                {isEditingPayment ? (
                                    <input
                                        id="cardNumb-input-field"
                                        type="password"
                                        value={editedCardNumber}
                                        onChange={handleCardNumberChange}
                                        maxLength="16" // Set maximum character limit to 16 for card number
                                    />
                                ) : (
                                    <li id="cardNumber-field">{userData && "**** **** **** " + userData.cardNumber.slice(-4)}</li>
                                )}
                                {isEditingPayment ? (
                                    <input
                                        id="cvv-input-field"
                                        type="password"
                                        value={editedCVV}
                                        onChange={handleCVVChange}
                                        maxLength="3" // Set maximum character limit to 3 for CVV
                                    />
                                ) : (
                                    <div className="cvv-display-field">
                                        <input type="password" value={"***"} readOnly />
                                    </div>
                                )}
                            </div>
                            <div className="paymentcard-footer">
                                <div className="paymentcard-exp-name">
                                    <div id="expiryDate">
                                        {isEditingPayment ? (
                                            <input
                                                id="exp-input-field"
                                                type="text"
                                                value={editedExpiryDate}
                                                onChange={handleExpiryDateChange}
                                                maxLength="4" // Set maximum character limit to 4 for expiry date
                                            />
                                        ) : (
                                            <li>
                                                {userData &&
                                                    userData.expiryDate &&
                                                    `${userData.expiryDate.substring(0, 2)}/${userData.expiryDate.substring(2)}`}
                                            </li>
                                        )}
                                    </div>
                                    <li id="Card-FullName">
                                        {userData && `${userData.firstName} ${userData.lastName}`}
                                    </li>
                                </div>
                                <img id="footerIcon" src="\images\images-MyMembership\crown.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="edit-buttons">
                    {isEditingPayment ? (
                        <>
                            <button onClick={handleSavePayment}>Save</button>
                            <button onClick={handleCancelPayment}>Cancel</button>
                        </>
                    ) : (
                        <button onClick={handleEditPayment}>Edit Payment</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PaymentContent;

// Author: Zafar Alem


import React, { useState } from "react";
import {
    getAuth,
    updateEmail as updateAuthEmail,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import ChangePassword from './ChangePassword'; // Import ChangePassword component
import "../styles-sections-mymembership/style_contactContent.css";

function ContactContent({
    userData,
    isEditingPhoneNumber,
    setIsEditingPhoneNumber,
    editedPhoneNumber,
    setEditedPhoneNumber,
    isEditingEmail,
    setIsEditingEmail,
    editedEmail,
    setEditedEmail,
    isModalOpen,
    setIsModalOpen,
    userPasswordForReauth,
    setUserPasswordForReauth,
    userID,
    setUserData,
}) {
    const [error, setError] = useState("");

    const handlePhoneNumberChange = (event) => {
        // Limit to 8 characters and allow only numerical input
        const inputPhoneNumber = event.target.value.replace(/\D/g, "").slice(0, 8);
        setEditedPhoneNumber(inputPhoneNumber);
    };

    const handleEmailChange = (event) => {
        setEditedEmail(event.target.value.toLowerCase()); // Convert email to lowercase
    };

    const handleEditPhoneNumber = () => {
        setIsEditingPhoneNumber(true);
    };

    const handleEditEmail = () => {
        setIsEditingEmail(true);
    };

    const handleCancelPhoneNumber = () => {
        setEditedPhoneNumber(userData.phoneNumber || ""); // Reset to original phone number or empty string
        setIsEditingPhoneNumber(false);
    };

    const handleCancelEmail = () => {
        setEditedEmail(userData.email || ""); // Reset to original email or empty string
        setIsEditingEmail(false);
    };

    const handleSavePhoneNumber = () => {
        if (editedPhoneNumber.length !== 8) {
            setError("Phone number must be 8 digits");
            return;
        }

        const db = getDatabase();
        const userDataRef = ref(db, `zenData/userData/${userID}`);
        update(userDataRef, { phoneNumber: editedPhoneNumber })
            .then(() => {
                console.log("Phone number updated successfully");
                setIsEditingPhoneNumber(false); // Disable editing mode
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    phoneNumber: editedPhoneNumber,
                }));
                setError(""); // Clear any previous errors
            })
            .catch((error) => {
                console.error("Error updating phone number:", error);
                setError("Error updating phone number");
            });
    };

    const handleSaveEmail = () => {
        if (!editedEmail) {
            setError("Email cannot be empty");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(editedEmail)) {
            setError("Invalid email format");
            return;
        }

        const db = getDatabase();
        const userDataRef = ref(db, `zenData/userData/${userID}`);
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const credential = EmailAuthProvider.credential(user.email || "", userPasswordForReauth || "");
            reauthenticateWithCredential(user, credential)
                .then(() => {
                    updateAuthEmail(user, editedEmail)
                        .then(() => {
                            update(userDataRef, { email: editedEmail })
                                .then(() => {
                                    console.log("Email updated successfully");
                                    setIsEditingEmail(false); // Disable editing mode
                                    setUserData((prevUserData) => ({
                                        ...prevUserData,
                                        email: editedEmail,
                                    }));
                                    setUserPasswordForReauth("");
                                    setError(""); // Clear any previous errors
                                })
                                .catch((error) => {
                                    console.error("Error updating email in db:", error);
                                    setError("Error updating email in the database");
                                });
                        })
                        .catch((error) => {
                            if (error.code === 'auth/email-already-in-use') {
                                setError("The email address is already in use by another account");
                            } else {
                                console.error("Error updating email in Firebase Auth:", error);
                                setError("Error updating email in Firebase Auth");
                            }
                        });
                })
                .catch((error) => {
                    console.error("Error re-authenticating user:", error);
                    setError("Error re-authenticating user");
                });
        } else {
            console.log("User not authenticated");
            setError("User not authenticated");
        }
    };

    return (
        <div className="contact-content">
            {error && <div className="error-message">{error}</div>}
            <div className="contact-passwd">
                <div className="input-field">
                    <div className="user-info">
                        <label>Phone Number:</label>
                        {isEditingPhoneNumber ? (
                            <input type="text" value={editedPhoneNumber || ""} onChange={handlePhoneNumberChange} />
                        ) : (
                            <li>{userData && userData.phoneNumber}</li>
                        )}
                    </div>
                    <div className="edit-button-field">
                        {isEditingPhoneNumber ? (
                            <>
                                <button onClick={handleSavePhoneNumber}>Save</button>
                                <button onClick={handleCancelPhoneNumber}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={handleEditPhoneNumber}>Edit</button>
                        )}
                    </div>
                </div>
                <div className="input-field">
                    <div className="user-info">
                        <label>Email:</label>
                        {isEditingEmail ? (
                            <>
                                <input
                                    type="text"
                                    value={editedEmail || ""}
                                    onChange={handleEmailChange}
                                    maxLength="100" // Maximum character limit to 100
                                />
                                {isModalOpen && (
                                    <div className="">
                                        <div className="input-field">
                                            <div className="user-info">
                                                <label>Confirm with password</label>
                                                <input
                                                    type="password"
                                                    value={userPasswordForReauth || ""}
                                                    onChange={(e) => setUserPasswordForReauth(e.target.value)}
                                                />
                                            </div>
                                            <div className="edit-button-field">
                                                <button onClick={handleSaveEmail}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <li>{userData && userData.email}</li>
                        )}
                    </div>
                    <div className="edit-button-field">
                        {isEditingEmail ? (
                            <>
                                {!isModalOpen && <button onClick={() => setIsModalOpen(true)}>Save</button>}
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        handleCancelEmail();
                                    }}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button onClick={handleEditEmail}>Edit</button>
                        )}
                    </div>
                </div>
                <ChangePassword /> {/* Use ChangePassword component */}
            </div>
        </div>
    );
}

export default ContactContent;
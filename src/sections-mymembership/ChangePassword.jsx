// Author: Zafar Alem


import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ChangePassword() {
    const [resetMessageVisible, setResetMessageVisible] = useState(false);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let timerID;
        if (timer > 0) {
            timerID = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        } else {
            clearTimeout(timerID);
        }

        return () => clearTimeout(timerID);
    }, [timer]);

    const handleResetPassword = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            sendPasswordResetEmail(auth, user.email)
                .then(() => {
                    setResetMessageVisible(true); // Show reset password message
                    setTimer(120); // Set timer to 2 minutes (120 seconds)
                })
                .catch((error) => {
                    console.error("Error sending reset password email:", error);
                    setError("Error sending reset password email");
                });
        } else {
            setError("User not authenticated");
        }
    };

    return (
        <div className="change-password">
            {error && <div className="error-message">{error}</div>}
            <div className="input-field passwordField">
                <div className="user-info">
                    <label>Password:</label>
                    <input type="password" value="*********" readOnly />
                </div>
                <div className="edit-button-field">
                    <button onClick={handleResetPassword} disabled={timer > 0}>
                        {timer > 0 ? `Retry in ${timer} seconds` : "Reset Password"}
                    </button>
                </div>
            </div>
            {resetMessageVisible && (
                <div className="reset-message">
                    A reset link has been sent to your email.
                </div>
            )}
        </div>
    );
}

export default ChangePassword;

// Author Zafar Alem

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

// Function to send a password reset email
export const resetPassword = async (email) => {
    try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email);
        // Password reset email sent successfully
        return true;
    } catch (error) {
        // Error sending password reset email
        console.error('Error sending password reset email:', error);
        throw error;
    }
};

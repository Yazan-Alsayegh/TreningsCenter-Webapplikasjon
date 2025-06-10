// Author Zafar Alem

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const errorMessages = {
    "auth/invalid-email": "The email address is badly formatted.",
    "auth/user-disabled": "The user account has been disabled by an administrator.",
    "auth/user-not-found": "User not found",
    "auth/wrong-password": "The password is invalid",
    "auth/network-request-failed": "A network error has occurred.",
};

export async function authenticateUserWithEmailAndPassword(email, password) {
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return { success: true, message: 'Authentication successful!', user };
    } catch (error) {
        console.error('Error signing in:', error);
        const errorMessage = errorMessages[error.code] || "An error occurred during sign in. Please try again.";
        return { success: false, message: errorMessage };
    }
}

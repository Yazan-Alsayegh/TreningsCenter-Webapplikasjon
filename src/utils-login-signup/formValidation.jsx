// Author Zafar Alem
export const validatePersonalInfo = (formData) => {
    if (!formData.firstName || !formData.lastName || !formData.dob || !formData.gender) {
        return "Please fill in all required fields for personal information.";
    }
    // Check if the date of birth makes the user at least 18 years old
    const currentDate = new Date();
    const selectedDate = new Date(formData.dob);
    const yearsDiff = currentDate.getFullYear() - selectedDate.getFullYear();
    if (yearsDiff < 18) {
        return "You must be at least 18 years old.";
    }
    // Trim whitespace from first name and last name
    const trimmedFirstName = formData.firstName.trim();
    const trimmedLastName = formData.lastName.trim();
    // Check if name and last name contain only letters
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(trimmedFirstName) || !nameRegex.test(trimmedLastName)) {
        return "First name and last name can contain only letters.";
    }
    return null;
};

// formValidation.js

export const validateContactInfo = (formData) => {
    if (!formData.phoneNumber || !formData.email || !formData.password) {
        return "Please fill in all required fields for contact information.";
    }
    // Check if phone number is exactly 8 digits and consists of only numbers
    const phoneNumberRegex = /^\d{8}$/;
    if (!phoneNumberRegex.test(formData.phoneNumber)) {
        return "Phone number must be 8 digits.";
    }
    // Check if email is in correct format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return "Please enter a valid email address.";
    }
    // Check if email length is not more than 100 characters
    if (formData.email.length > 100) {
        return "Email address cannot be more than 100 characters.";
    }
    // Check if password length is at least 6 characters
    if (formData.password.length < 6) {
        return "Password must be at least 6 characters long.";
    }
    return null;
};

export const validatePaymentInfo = (formData) => {
    if (!formData.cardNumber || !formData.cvv || !formData.expiryDate) {
        return "Please fill in all required fields for payment information.";
    }
    // Check if card number, CVV, and expiry date contain only numbers
    const numberRegex = /^\d+$/;
    if (
        !numberRegex.test(formData.cardNumber) ||
        !numberRegex.test(formData.cvv) ||
        !numberRegex.test(formData.expiryDate)
    ) {
        return "Card number, CVV, and expiry date should contain only numbers.";
    }
    // Check if card number is exactly 16 digits
    if (formData.cardNumber.length !== 16) {
        return "Card number must be 16 digits.";
    }
    // Check if CVV is exactly 3 digits
    if (formData.cvv.length !== 3) {
        return "CVV must be 3 digits.";
    }
    // Check if expiry date is exactly 4 digits
    if (formData.expiryDate.length !== 4) {
        return "Expiry date must be 4 digits.";
    }
    return null;
};

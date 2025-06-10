// Author Zafar Alem

import React from 'react';

function ContactInformation({ formData, handleChange }) {
    const handlePhoneNumberChange = (e) => {
        const { name, value } = e.target;
        // Only allow numeric characters and limit length to 8 digits
        const numericValue = value.replace(/\D/g, '').slice(0, 8);
        handleChange({ target: { name, value: numericValue } });
    };

    return (
        <section className='inputFields'>
            <h2>Contact Information</h2>
            <label>
                <h6>Phone Number:</h6>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handlePhoneNumberChange} maxLength={8} />
            </label>
            <label>
                <h6>Email:</h6>
                <input type="email" name="email" value={formData.email} onChange={handleChange} maxLength={100} />
            </label>
            <label>
                <h6>Password:</h6>
                <input type="password" name="password" value={formData.password} onChange={handleChange} maxLength={100} />
            </label>
        </section>
    );
}

export default ContactInformation;

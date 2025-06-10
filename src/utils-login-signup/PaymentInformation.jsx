// Author Zafar Alem

import React from 'react';

function PaymentInformation({ formData, handleChange }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Allow only numbers and limit input length
        const sanitizedValue = value.replace(/\D/g, '').slice(0, name === 'cardNumber' ? 16 : 4);
        handleChange({ target: { name, value: sanitizedValue } });
    };

    return (
        <section className='payment-info-section'>
            <h2>Payment</h2>
            <label className='cardNumber long-inputfield'>
                <h6>Card Number:</h6>
                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} maxLength={16} />
            </label>
            <div className='cvv-expDate-box'>
                <label className='cvv'>
                    <h6>CVV:</h6>
                    <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} maxLength={3} />
                </label>
                <label className='expDate'>
                    <h6>EXP:</h6>
                    <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} maxLength={4} />
                </label>
            </div>
        </section>
    );
}

export default PaymentInformation;

// Author Zafar Alem

import React from 'react';

function PersonalInformation({ formData, handleChange }) {
    return (
        <section className='personalInfo-section'>
            <h2>Personal Information</h2>
            <label>
                <h6>First Name:</h6>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </label>
            <label>
                <h6>Last Name:</h6>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </label>
            <label>
                <h6>Date of Birth:</h6>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            </label>
            <div className="gender-selection">
                <h6>Gender:</h6>
                <label className="radio-label">
                    <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
                    <span className="radio-custom"></span>
                    Male
                </label>
                <label className="radio-label">
                    <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
                    <span className="radio-custom"></span>
                    Female
                </label>
            </div>

        </section>
    );
}

export default PersonalInformation;

/* Author - Ihab Laboud */

// Import necessary dependencies from React and Firebase libraries
import React, { useState, useEffect } from 'react';
import { database, storage } from '../config-fb/firebase'; 
import { ref as dbRef, push, update } from 'firebase/database'; 
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import ContactFormData from '../data/data-ContactForm/contactFormData.json'; 
import '../styles_sections/style_ContactForm.css'; 

// ContactForm component
const ContactForm = () => {
  
  const [formDataState, setFormDataState] = useState(ContactFormData.formData); 
  const [isVisible, setIsVisible] = useState(false); 
  const [isButtonVisible, setIsButtonVisible] = useState(false); 
  const [submitted, setSubmitted] = useState(false); 
  const [fileName, setFileName] = useState(''); 
  const [attachment, setAttachment] = useState(null); 

  // useEffect hook to add and remove scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle scroll event
  const handleScroll = () => {
    setIsButtonVisible(window.scrollY > 100); 
  };

  // useEffect hook to store form data in session storage on formDataState change
  useEffect(() => {
    sessionStorage.setItem('formData', JSON.stringify(formDataState));
  }, [formDataState]);

  // Function to handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDataState({ ...formDataState, [name]: value });
  };

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); 
      setAttachment(file); 
    } else {
      setFileName(''); 
      setAttachment(null); 
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email format
    const isValidEmail = formDataState.email.includes('@');
    if (!isValidEmail) {
      alert(ContactFormData.alerts.invalidEmail);
      return;
    }

    try {
      // Prepare form data for submission
      const formData = {
        name: formDataState.name,
        email: formDataState.email,
        phoneNumber: formDataState.phoneNumber,
        message: formDataState.message,
      };

      // Push form data to Firebase database
      const formRef = dbRef(database, 'contactFormData');
      const newFormRef = await push(formRef, formData);

      // Handle file upload if an attachment is provided
      if (attachment) {
        const storageReference = storageRef(storage, `attachments/${newFormRef.key}/${attachment.name}`);
        await uploadBytes(storageReference, attachment);

        // Get download URL of the uploaded file and update the database entry
        const fileURL = await getDownloadURL(storageReference);
        await update(dbRef(database, `contactFormData/${newFormRef.key}`), { attachment: fileURL });
      }

      // Reset form state after successful submission
      setSubmitted(true);
      setIsVisible(false);
      setFormDataState(ContactFormData.formData);
      setFileName('');
      setAttachment(null);
    } catch (error) {
      console.error('Error saving form data:', error);
      alert(ContactFormData.alerts.submissionError);
    }
  };

  // Function to toggle form visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Function to close the form and reset states
  const closeForm = () => {
    setIsVisible(false);
    setSubmitted(false);
    setFileName('');
    setAttachment(null);
  };

  return (
    <>
      <button className={`contact-button ${isButtonVisible ? 'visible' : ''}`} onClick={toggleVisibility}>
        {ContactFormData.labels.contactButton}
      </button>
      <div className={`popup-background ${isVisible || submitted ? 'show-popup' : ''}`}>
        <div className="contact-form-popup">
          {submitted ? (
            <div className="thank-you-message">
              <p>{ContactFormData.labels.thankYouMessage}</p>
              <button className="close-button" onClick={closeForm}>{ContactFormData.labels.closeButton}</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form-layout">
              <h2 className="contact-header">{ContactFormData.labels.contactHeader}</h2>
              <div className="form-fields">
                <div className="form-group full-width">
                  <label className="form-label">
                    {ContactFormData.placeholders.message}<span className="mandatory">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="message"
                    value={formDataState.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group half-width">
                  <label className="form-label">
                    {ContactFormData.placeholders.name}<span className="mandatory">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formDataState.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group half-width">
                  <label className="form-label">
                    {ContactFormData.placeholders.phoneNumber}
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phoneNumber"
                    value={formDataState.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group half-width">
                  <label className="form-label">
                    {ContactFormData.placeholders.email}<span className="mandatory">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formDataState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Attachment</label>
                  <div className="custom-file-input">
                    <input
                      type="file"
                      id="file-upload"
                      className="form-control-file"
                      name="attachment"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload" className="custom-file-label">
                      {fileName || "Choose a file"}
                    </label>
                  </div>
                </div>
                <div className="button-group">
                  <button type="button" className="cancel-button" onClick={closeForm}>
                    {ContactFormData.labels.cancelButtonText}
                  </button>
                  <button type="submit" className="submit-button">
                    {ContactFormData.labels.submitButton}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactForm;

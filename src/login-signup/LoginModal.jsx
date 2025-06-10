// Author Zafar Alem

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUserWithEmailAndPassword } from '../utils-login-signup/LoginHandler';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import '../styles_login-signup/signup-style.css';
import '../styles_login-signup/loginModal-style.css';

const LoginModal = ({ showModal, setShowModal, setLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false); // State to control forgot password modal visibility
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState(''); // State to store email for password reset
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState(''); // State to store message for password reset
    const [forgotPasswordError, setForgotPasswordError] = useState(''); // State to store error for password reset
    const [forgotEmailModal, setForgotEmailModal] = useState(false); // State to control forgot email modal visibility
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const authResult = await authenticateUserWithEmailAndPassword(email, password);
        if (authResult.success) {
            localStorage.setItem('userID', authResult.user.uid);
            setEmail('');
            setPassword('');
            setShowModal(false);
            setLoggedIn(true);
            navigate('/my-membership');
        } else {
            setLoginError(authResult.message);
        }
    };

    const handleForgotPassword = () => {
        setForgotPasswordModal(true);
    };

    const handleSendResetEmail = async () => {
        if (!forgotPasswordEmail) {
            setForgotPasswordError('Email field cannot be empty.');
            return;
        }

        try {
            await sendPasswordResetEmail(getAuth(), forgotPasswordEmail);
            setForgotPasswordMessage('If the email exists in our database, a reset link will be sent with further instructions.');
            setForgotPasswordError(''); // Clear any previous error messages
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setForgotPasswordMessage('Error sending password reset email.');
        }
    };

    const handleForgotEmail = () => {
        setForgotEmailModal(true);
    };

    return (
        <div>
            <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Welcome back</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="modal-content-section" onSubmit={handleLogin}>
                                <div className="signin-form-col">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <a className='reset-login reset-email' onClick={handleForgotEmail}>Forgot email</a>
                                </div>
                                <div className="signin-form-col">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <a className='reset-login reset-email' onClick={handleForgotPassword}>Forgot password</a>
                                </div>
                                {loginError && <div className="login-error">{loginError}</div>}
                                <button type="submit" className="btn btn-submit">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            <div className={`modal ${forgotPasswordModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: forgotPasswordModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Forgot Password</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setForgotPasswordModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="signin-form-col">
                                    <label htmlFor="forgotEmail">Email</label>
                                    <input type="email" className="form-control" id="forgotEmail" name="forgotEmail" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)} required />
                                </div>
                                {forgotPasswordError && <div className="error-message">{forgotPasswordError}</div>}
                                <p>Enter the email associated with your Zen Fitness account.</p>
                                <button type="button" className="btn btn-submit" onClick={handleSendResetEmail}>Send</button>
                                {forgotPasswordMessage && <p>{forgotPasswordMessage}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Forgot Email Modal */}
            <div className={`modal ${forgotEmailModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: forgotEmailModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Forgot Email</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setForgotEmailModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Contact us at our facilities or use our contact form to retrieve your email if you have forgotten it.</p>
                            <button type="button" className="btn btn-secondary" onClick={() => setForgotEmailModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;

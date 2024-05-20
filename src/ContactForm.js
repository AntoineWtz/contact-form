import React, { useState } from 'react';
import './App.css';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};

        if (!name) errors.name = 'Name is required';
        if (!email) {
            errors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            errors.email = 'Email is invalid';
        }
        if (!message) errors.message = 'Message is required';

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            setSubmitted(true);
        }
    };

    return (
        <div className="contact-form">
            {submitted ? (
                <div className="confirmation">
                    <h2>Thank you for your message!</h2>
                    <p>We will get back to you soon.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>Contact Us</h2>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={errors.name ? 'error-input' : ''}
                        />
                        {errors.name && <p className="error-text">{errors.name}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? 'error-input' : ''}
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={errors.message ? 'error-input' : ''}
                        ></textarea>
                        {errors.message && <p className="error-text">{errors.message}</p>}
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            )}
        </div>
    );
};

export default ContactForm;

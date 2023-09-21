/**
 * Register Component
 *
 * Provides a registration form for users (either Mentee or Mentor).
 * - Users can select their user type (Mentee or Mentor).
 * - Performs both frontend validation and handles backend validation responses.
 * - On successful registration, redirects users to the sign-in page.
 *
 * Dependencies:
 * - React useState hook
 * - axios for API calls
 * - useNavigate from 'react-router-dom' for navigation
 * - Local CSS for styling
 * - Icons for UI elements and feedback
 */
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import mentknowlogo from '../icons/mentknowlogo.svg';
import erro from '../icons/exclamation 6.svg';
import { useNavigate } from 'react-router-dom';
import profile from '../icons/Profile.svg';

function Register() {
    const navigate = useNavigate();


 // State variables initialization.
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        userType: 'mentee',
        groupNumber: '1',
        accessPin: ''
    });

    // Errors state for all form fields
    const [errors, setErrors] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        groupNumber: '',
        accessPin: ''
    });

    const { name, surname, email, password, userType, groupNumber, accessPin } = formData;


    /**
     * Updates the form data state based on user input.
     * 
     * @param {Object} e - The event object, containing information about the input change.
     */
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

   /**
     * Frontend validation for form fields.
     * Sets error messages where necessary.
     * @returns {boolean} If form is valid or not.
     */
    const validate = () => {
        let valid = true;
        let newErrors = {};

        if (!name.trim()) {
            valid = false;
            newErrors.name = "Please enter your first name ";
        }

        if (!surname.trim()) {
            valid = false;
            newErrors.surname = "Please enter your surname ";
        }

        if (!email.trim() || !email.toLowerCase().endsWith('@myuct.ac.za')) {
            valid = false;
            newErrors.email = !email.trim() ? "Please enter a valid UCT email address" : "Please enter a valid UCT email address";
        }

        if (!password.trim()) {
            valid = false;
            newErrors.password = "Passwords must be 6 or more characters and contain at least one number";
        }

        if (!groupNumber.trim()) {
            valid = false;
            newErrors.groupNumber = "Please select a group number from the drop-down";
        }

        if (userType === 'mentor' && accessPin.trim() != '1234') {
            valid = false;
            newErrors.accessPin = "Incorrect access pin";
        }
        if (![1, 2, 3, 4, 5].includes(parseInt(groupNumber))) {
            valid = false;
            newErrors.groupNumber = "Please select a group number from the drop-down";
        }

        setErrors(newErrors);
        return valid;
    }

    /**
     * Handles form submission:
     * - Performs validation
     * - Sends form data to the backend for registration
     * - Handles API responses and errors
     */
    const onSubmit = async e => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify(formData);
            const res = await axios.post('http://localhost:5004/api/users', body, config);

            if (res.status === 200) {
                setFormData({
                    name: '',
                    surname: '',
                    email: '',
                    password: '',
                    userType: 'mentee',
                    groupNumber: 1,
                    accessPin: ''
                });
                navigate('/signin');
            }

        } catch (error) {
            const errorMessage = error.response && error.response.data.errors
                ? error.response.data.errors[0].msg
                : error.message;
            setErrors(prevErrors => ({ ...prevErrors, general: `Error: ${errorMessage}` }));
        }
    };

    /**
     * Redirects the user to the login page.
     */
    const handleMoveToLogin = () => {
        navigate('/signin');
    };

    return (

        <div className="container">
            <div className="image-container">
                <img src={mentknowlogo} alt="MentKnow Logo" />
            </div>

            <div className="form-container">
                
                <div className="heading-error-container">
                    {errors.general && <div className='error-message-server'>{errors.general}</div>}
                    <h2 className='register-header'>Create Account</h2>
                </div>

                <form onSubmit={onSubmit}>
                    <div className='radio-group-signup'>
                        <label>
                            <input
                                className='radioButtonMentee'
                                type="radio"
                                name="userType"
                                value="mentee"
                                checked={userType === 'mentee'}
                                onChange={onChange}
                            />
                            Mentee
                        </label>
                        <label>
                            <input
                                className='radioButtonMentor'
                                type="radio"
                                name="userType"
                                value="mentor"
                                checked={userType === 'mentor'}
                                onChange={onChange}
                            />
                            Mentor
                        </label>
                    </div>

                    <div>

                        <div className="some-style">
                            <label className='name-label'>Name</label>

                            {errors.name && <div className='error-message-name'> <img src={erro} alt='error' className='error-style' /> {errors.name}</div>}
                        </div>
                        <input

                            className='name-form'
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                        />

                    </div>

                    <div>
                        <div className="some-style">
                            <label className='surname-label'>Surname</label>
                            {errors.surname && <div className='error-message'><img src={erro} alt='error' className='error-style' /> {errors.surname}</div>}
                        </div>
                        <input
                            className='surname-form'
                            type="text"
                            name="surname"
                            value={surname}
                            onChange={onChange}
                        />

                    </div>

                    <div>
                        <div className="some-style">
                            <label className='email-label'>UCT email address</label>
                            {errors.email && <div className='error-message'><img src={erro} alt='error' className='error-style' /> {errors.email}</div>}
                        </div>
                        <input
                            className='email-form'
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                        />

                    </div>

                    <div>
                        <div className="some-style">
                            <label className='password-label'>Password</label>
                            {errors.password && <div className='error-message'><img src={erro} alt='error' className='error-style' /> {errors.password}</div>}
                        </div>
                        <input
                            className='password-form'
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                        />

                    </div>

                    <div>
                        <div className="some-style">
                            <label className='group-label'>Group Number</label>
                            {errors.groupNumber && <div className='error-message'><img src={erro} alt='error' className='error-style' /> {errors.groupNumber}</div>}
                        </div>
                        <select
                            className='group-form'
                            name="groupNumber"
                            value={groupNumber}
                            onChange={onChange}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>


                    {userType === 'mentor' && (
                        <div>
                            <div className="some-style">
                                <label className='access-label'>Access Pin </label>
                                {errors.accessPin && <div className='error-message'><img src={erro} alt='error' className='error-style' /> {errors.accessPin}</div>}
                            </div>
                            <input
                                className='access-form'
                                type="text"
                                name="accessPin"
                                value={accessPin}
                                onChange={onChange}
                            />

                        </div>
                    )}

                    <div>
                        <button className='register-button' type="submit">Sign Up</button>
                    </div>

                    <a className='link-register' onClick={handleMoveToLogin}>Already have an account? Sign In</a>
                </form>
            </div>
        </div>
    );
};

export default Register;
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import mentknowlogo from '../icons/mentknowlogo.svg';
import erro from '../icons/exclamation 6.svg';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        userType: 'mentee',
        groupNumber: '',
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

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

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

        if (userType === 'mentor' && !accessPin.trim()) {
            valid = false;
            newErrors.accessPin = "Incorrect access pin";
        }

        setErrors(newErrors);
        return valid;
    }

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
                    groupNumber: '',
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

    const handleMoveToLogin = () => {
        navigate('/signin');
    };

    return (

        <div className="container">
            <div className="image-container">
                <img src={mentknowlogo} alt="MentKnow Logo" />
            </div>
            <div className="form-container">
                <h2 className='register-header'>Create Account</h2>
                {errors.general && <div className='error-message'>{errors.general}</div>}

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
                        <label className='name-label'>Name</label>
                        <br/>
                        
                          
                            {errors.name && <div className='error-message'> <img src={erro} alt='error' className='error-style'/> {errors.name}</div>}
                      
                        <input
                            className='name-form'
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                        />

                    </div>

                    <div>
                        <label className='surname-label'>Surname</label>
                        {errors.surname && <div className='error-message'><img src={erro} alt='error' className='error-style'/> {errors.surname}</div>}
                        <input
                            className='surname-form'
                            type="text"
                            name="surname"
                            value={surname}
                            onChange={onChange}
                        />

                    </div>

                    <div>
                        <label className='email-label'>Email</label>
                        {errors.email && <div className='error-message'><img src={erro} alt='error' className='error-style'/> {errors.email}</div>}
                        <input
                            className='email-form'
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                        />

                    </div>

                    <div>
                        <label className='password-label'>Password</label>
                        {errors.password && <div className='error-message'><img src={erro} alt='error' className='error-style'/> {errors.password}</div>}
                        <input
                            className='password-form'
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                        />

                    </div>

                    <div>
                        <label className='group-label'>Group Number</label>
                        {errors.groupNumber && <div className='error-message'><img src={erro} alt='error' className='error-style'/> {errors.groupNumber}</div>}
                        <input
                            className='group-form'
                            type="number"
                            name="groupNumber"
                            value={groupNumber}
                            onChange={onChange}
                        />

                    </div>

                    {userType === 'mentor' && (
                        <div>
                            <label className='access-label'>Access Pin: </label>
                            {errors.accessPin && <div className='error-message'><img src={erro} alt='error' className='error-style'/> {errors.accessPin}</div>}
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
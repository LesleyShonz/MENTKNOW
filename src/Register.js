import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'
import mentknowlogo from './icons/mentknowlogo.svg'
import {useNavigate} from 'react-router-dom'
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

    const [message, setMessage] = useState(null);

    const { name, surname, email, password, userType, groupNumber, accessPin } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify(formData);

            await axios.post('http://localhost:5004/api/users', body, config);
            console.log(res)
            // Clear form
            setFormData({
                name: '',
                surname: '',
                email: '',
                password: '',
                userType: 'mentee',
                groupNumber: '',
                accessPin: ''
            });

            // Show success message
            setMessage("Registration successful!");
            navigate('/signin');

        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(`Error: ${error.response.data.message}`);
            } else {
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="container">
            <div className="image-container">
                <img src={mentknowlogo} alt="Description of Image" />
            </div>
            <div className="form-container">
                <h2 className='register-header'>Create Account</h2>
                {message && <div>{message}</div>}
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
                        <br />
                        <input
                            className='name-form'
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <label className='surname-label'>Surname</label>
                        <input
                            className='surname-form'
                            type="text"
                            name="surname"
                            value={surname}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <label className='email-label'>Email</label>
                        <input
                            className='email-form'
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <label className='password-label'>Password</label>
                        <input
                            className='password-form'
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <label className='group-label'>Group Number</label>
                        <input
                            className='group-form'
                            type="number"
                            name="groupNumber"
                            value={groupNumber}
                            onChange={onChange}
                            required
                        />
                    </div>
                    {userType === 'mentor' && (
                        <div>
                            <label className='access-label'>Access Pin: </label>
                            <input
                                className='access-form'
                                type="text"
                                name="accessPin"
                                value={accessPin}
                                onChange={onChange}
                                required
                            />
                        </div>
                    )}
                    <div>
                        <button className='register-button' type="submit">Sign Up</button>
                    </div>

                    <a className= 'link-register' href='/signin'>Already have an account? Sign In</a>
                </form>
            </div>
        </div>
    );
}

export default Register;

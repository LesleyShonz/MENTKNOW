import React, { useState, useContext } from 'react';
import UserContext from '../Whiteboard/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import mentknowlogo from '../icons/mentknowlogo.svg';

/**
 * The Login component allows users to sign into their accounts by providing their email and password.
 *
 * @param {Function} setAuthenticated - A function to update the parent component's state indicating a user is authenticated.
 * @returns {JSX.Element} A rendered Login component.
 */
const Login = ({ setAuthenticated }) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State to manage potential error messages
  const [error, setError] = useState('');

  const { email, password } = formData;

  /**
   * Handle input changes and update the state accordingly.
   *
   * @param {Event} e - The triggered event.
   */
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  /**
   * Handle form submission, performing the login operation.
   *
   * @param {Event} e - The triggered event.
   */
  const onSubmit = async e => {
    e.preventDefault();

    // Clear any previous error messages
    setError('');

    // Define the configuration for the axios request
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const body = JSON.stringify({ email, password });
      const res = await axios.post('http://localhost:5004/api/users/login', body, config);

      if (res.data) {

        localStorage.setItem('userData', JSON.stringify(res.data));
        setUser(res.data);
        if(res.data.userType === 'mentee'){

          navigate('/dashboard')
        }
        else{
          navigate('/MentorDashboard');
        }
        
        //details and everything is okay
      } 
      else {
        setError('Login Failed. Please check your credentials.');
      }
    } catch (err) {
      const serverMessage = err.response?.data?.msg;
      console.log(serverMessage);
      setError(serverMessage || 'Login Failed. Please check your credentials.');
    }
  };

  return (
    <div className="container1">
      <div className="image-container1">
        <img src={mentknowlogo} alt="MentKnow Logo" />
      </div>
      <div className='login-container'>
        <h2 className='SignInText1'>Sign In</h2>
        <p className='UserNameText1'>Username</p>
        <form onSubmit={onSubmit}>
          <input className='userNameForm1' type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
          <label className='password-label1'>Password</label>
          <input className='password-form1' type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
          {error && <div style={{ color: 'red', marginTop: '13px' }}>{error}</div>}
          <button className='login-button1' type="submit">Sign In</button>
          <a className='link-register1' href='/register'> Don’t have an account? Sign Up here </a>
        </form>
      </div>
    </div>
  );
};

export default Login;

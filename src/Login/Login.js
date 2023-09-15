import React, { useState, useContext } from 'react';
import UserContext from '../Whiteboard/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import erro from '../icons/exclamation 6.svg';
import mentknowlogo from '../icons/mentknowlogo.svg';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({}); // New errors state
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigateUser = (userType) => {
    navigate(userType === 'mentee' ? '/dashboard' : '/MentorDashboard');
  };

  const handleMoveToRegister = () => {
    navigate('/register');
  }

  const onSubmit = async e => {
    e.preventDefault();
    
    // Simple Frontend validation
    if (!email) setErrors(prevErrors => ({ ...prevErrors, email: 'Incorrect username. Please try again' }));
    if (!password) setErrors(prevErrors => ({ ...prevErrors, password: 'Incorrect password. Please try again' }));
    if (!email || !password) return;

    setErrors('');
    setLoading(true);
  
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const body = JSON.stringify({ email, password });
      const res = await axios.post('http://localhost:5004/api/users/login', body, config);
  
      setLoading(false);
  
      if (res.data) {
        localStorage.setItem('userData', JSON.stringify(res.data));
        setUser(res.data);
        navigateUser(res.data.userType);
      } else {
        setErrors({ general: 'Login Failed. Please check your credentials.' });
      }
    } catch (err) {
      setLoading(false);
      setErrors({ general: err.message });
    }
  };

  return (
    <div className="container1">
      <div className="image-container1">
        <img src={mentknowlogo} alt="MentKnow Logo" />
      </div>
      <div className='login-container'>
        <h2 className='SignInText1'>Sign In</h2>
        <form onSubmit={onSubmit}>
          <p className='UserNameText1'>Username</p>
          {errors.email && <div className='error-message'><img src={erro} alt='error' className='error-style'/> {errors.email}</div>}
          <input
            className='userNameForm1'
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
         
          
          <label className='password-label1'>Password</label>
          {errors.password && <div className='error-message'><img src={erro} alt='error' className='error-style'/> {errors.password}</div>}
          <input
            className='password-form1'
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
          
          
          {loading && <div style={{marginTop: '13px' , marginLeft:'315px'}}>Loading...</div>}
          {errors.general && <div style={{ color: 'red', marginTop: '13px' , marginLeft:'315px'}}>{errors.general}</div>}
          <button className='login-button1' type="submit">Sign In</button>
          <a className='link-register1' onClick={handleMoveToRegister}> Don’t have an account? Sign Up here </a>
        </form>
      </div>
    </div>
  );
};

export default Login;

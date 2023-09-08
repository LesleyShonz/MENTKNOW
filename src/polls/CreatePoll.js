import React, { useState } from 'react';
import axios from 'axios';
import './CreatePoll.css';
import reject3 from '../icons/reject3.svg'

const CreatePoll = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [message, setMessage] = useState('');  // To provide feedback to the user

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const handleImageClick = () => {
    setIsVisible(false); // set to false to hide, or toggle with !isVisible if you want to show/hide on alternate clicks
  };

  const addOption = () => setOptions([...options, '']);

  const handleSubmit = async e => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    // Check for token
    // if (!token) {
    //   setMessage('Token not found. Please log in again.');
    //   return;
    // }

    const config = {
      headers: {
        'x-auth-token': token
      }
    };

    try {
      const response = await axios.post('http://localhost:5004/api/polls', { question, options }, config);
      console.log(response.data);
      if (response.data.question === question) {
        setMessage('Poll created successfully!');
        console.log(response.data);
      } else {
        setMessage(response.data.msg || 'Unknown error occurred while creating poll.');
        console.error('Error creating poll:', response.data.msg || 'Unknown error');
      }
    } catch (error) {
      setMessage('Error occurred. Please try again later.');
      console.error('Error creating poll:', error.message);
    }
  };

  return (
    <div className='create-container-poll' style={{ display: isVisible ? 'block' : 'none' }}>
      <form onSubmit={handleSubmit}>
      <img 
        className='exit-poll'
        src= {reject3} 
        alt="Click to hide container" 
        onClick={handleImageClick}
      />
        <input
          className='question-container'
          type="text"
          placeholder="Enter your question here"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        {options.map((option, index) => (
          <input
            className = 'options-container'
            key={`option-${index}`}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={e => handleOptionChange(index, e.target.value)}
          />
        ))}
        <p className='add-option-key' type="button" onClick={addOption}>+ Add option</p>
        <button className='create-poll-button'type="submit">Create Poll</button>
      </form>
      {message && <p>{message}</p>}  {/* Displaying feedback message */}
    </div>
  );
};

export default CreatePoll;

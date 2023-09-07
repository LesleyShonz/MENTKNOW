import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VoteForm.css';
import reject3 from '../icons/reject3.svg'

const VotePoll = () => {
    const [poll, setPoll] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [hasVoted, setHasVoted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleImageClick = () => {
        setIsVisible(false); // set to false to hide, or toggle with !isVisible if you want to show/hide on alternate clicks
    };

    useEffect(() => {
        async function fetchPoll() {
            try {
                const response = await axios.get('http://localhost:5008/api/polls/getPoll');
                setPoll(response.data);
            } catch (error) {
                console.error("Error fetching poll:", error);
            }
        }

        fetchPoll();
    }, []);

    const handleVote = async () => {
        try {
            await axios.post(`http://localhost:5008/api/polls/vote/${poll._id}`, { option: selectedOption });
            const response = await axios.get(`http://localhost:5008/api/polls/results/${poll._id}`);
            setPoll(response.data);
            setHasVoted(true);
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    const getMaxVotes = () => {
        if (!poll || !poll.options) return 0; // Return 0 if poll or poll.options doesn't exist
        return Math.max(...poll.options.map(option => option.votes));
    };

    const maxVotes = getMaxVotes();

    if (!poll) return <p>Loading poll...</p>;

    return (
        <div className="all-poll-container" style={{ display: isVisible ? 'block' : 'none' }}>
            <div className='VoteForm'>
                {hasVoted ? (

                    <div className='results-container1'>
                        <img
                            className='exit-poll1'
                            src={reject3}
                            alt="Click to hide container"
                            onClick={handleImageClick}
                        />
                        <h3 className='results-heading'>Results:</h3>
                        {poll.options.map((option, index) => (
                            <div
                                key={index}
                                className={`result-container ${option.votes === maxVotes ? 'most-voted' : ''}`}
                            >
                                {option.name}: {option.votes} votes
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='voting-container'>
                        <img
                            className='exit-poll1'
                            src={reject3}
                            alt="Click to hide container"
                            onClick={handleImageClick}
                        />
                        <h2 className='option-question-header'>{poll.question}</h2>
                        {poll.options.map((option, index) => (
                            <label className="option-label" key={index}>
                                <input
                                    className="option-input"
                                    type="radio"
                                    value={option.name}
                                    checked={selectedOption === option.name}
                                    onChange={e => setSelectedOption(e.target.value)}
                                />
                                <span className="custom-radio">{option.name}</span>
                            </label>
                        ))}
                        <button className='vote-button-form' onClick={handleVote}>Vote</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VotePoll;

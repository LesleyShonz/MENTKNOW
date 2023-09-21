/**
 * VotePoll Component
 *
 * Provides functionality to vote on an available poll fetched from an API.
 * Users can vote for a poll option and then view the results.
 *
 * Dependencies:
 * - React useState and useEffect hooks
 * - axios for API calls
 * - Local CSS for styling
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VoteForm.css";

const VotePoll = () => {
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Fetch the poll data when the component mounts
  useEffect(() => {
    async function fetchPoll() {
      try {
        const response = await axios.get(
          "http://localhost:5004/api/polls/getPoll"
        );
        setPoll(response.data);
      } catch (error) {
        console.error("Error fetching poll:", error);
      }
    }

    fetchPoll();
  }, []);
  /**
   * Handles the voting process:
   * - Sends a vote for the selected option
   * - Updates the poll data with the latest results
   */
  const handleVote = async () => {
    try {
      await axios.post(`http://localhost:5004/api/polls/vote/${poll._id}`, {
        option: selectedOption,
      });
      const response = await axios.get(
        `http://localhost:5004/api/polls/results/${poll._id}`
      );
      setPoll(response.data);
      setHasVoted(true);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  /**
   * Computes the maximum votes amongst all poll options.
   * @returns {number} The maximum votes.
   */
  const getMaxVotes = () => {
    if (!poll || !poll.options) return 0; // Return 0 if poll or poll.options doesn't exist
    return Math.max(...poll.options.map((option) => option.votes));
  };

  const maxVotes = getMaxVotes();

  if (!poll) return <p>Loading poll...</p>;

  return (
    <div
      className="all-poll-container"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="VoteForm">
        {hasVoted ? (
          <div className="results-container1">
            <h3 className="results-heading">Final Outcomes:</h3>
            <h3 className="results-heading">{poll.question}</h3>
            {poll.options.map((option, index) => (
              <div
                key={index}
                className={`result-container ${option.votes === maxVotes ? "most-voted" : ""
                  }`}
              >
                <div className="result-container-sort-style">
                  {option.name}: {option.votes} votes
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="voting-container">
            <h2 className="option-question-header">{poll.question}</h2>
            {poll.options.map((option, index) => (
              <label className="option-label" key={index}>
                <input
                  className="option-input"
                  type="radio"
                  value={option.name}
                  checked={selectedOption === option.name}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <span className="custom-radio">{option.name}</span>
              </label>
            ))}
            {selectedOption != "" && (
              <button className="vote-button-form" onClick={handleVote}>
                Vote
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VotePoll;

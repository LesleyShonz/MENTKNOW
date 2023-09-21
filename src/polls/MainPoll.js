/**
 * MainPoll Component
 *
 * Provides an entry point for users to either create a new poll or vote on an existing one.
 * Depending on the user's selection, the corresponding form (either `CreatePollForm` or `VoteForm`)
 * will be displayed to the user.
 *
 * Dependencies:
 * - React useState hook
 * - Local CSS for styling
 * - CreatePoll and VoteForm components for rendering respective functionalities
 * - Icons for UI (though not used in this specific component)
 */

import "./MainPoll.css";
import React, { useState } from "react";
import CreatePollForm from "./CreatePoll";
import VoteForm from "./VoteForm";

function MainPoll() {
  const [isContainerVisible, setIsContainerVisible] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showVoteForm, setShowVoteForm] = useState(false);

  /**
   * Handles the click event to show the Create Poll form.
   */
  const handleCreateClick = () => {
    setShowCreateForm(true);
    setShowVoteForm(false);
    setIsContainerVisible(false);
  };
  
  /**
   * Handles the click event to show the Vote form.
   */
  const handleVoteClick = () => {
    setShowCreateForm(false);
    setShowVoteForm(true);
    setIsContainerVisible(false);
  };

  return (
    <div>
      {isContainerVisible && (
        <div className="createButton-container">
          <h1 className="header-create-poll">I want to...</h1>
          <button
            className="create-new-poll-button"
            type="button"
            onClick={handleCreateClick}
          >
            Create new Poll
          </button>
          <button
            className="vote-on-existing-poll"
            type="button"
            onClick={handleVoteClick}
          >
            Vote on an existing poll
          </button>
        </div>
      )}
      {showCreateForm && <CreatePollForm />}
      {showVoteForm && <VoteForm />}
    </div>
  );
}

export default MainPoll;

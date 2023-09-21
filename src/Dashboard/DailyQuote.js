/**
 * DailyQuote Component
 *
 * Fetches and displays an educational quote daily.
 * 
 * This component:
 * - Makes a network request to an external API to retrieve a quote related to education.
 * - Handles loading and error states.
 * - Displays the fetched quote.
 * 
 * State Variables:
 * - quote: The fetched quote object containing the quote content and the author.
 * - loading: Indicates whether the quote is currently being fetched.
 * - error: Contains any errors that occurred during fetching.
 * 
 * Dependencies:
 * - React's useState and useEffect hooks.
 */

import React, { useState, useEffect } from 'react';

function DailyQuote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  /**
   * Effect hook to fetch the daily educational quote.
   * 
   * This hook runs once when the component mounts and fetches a quote from the external API.
   * Depending on the response, it updates the state variables appropriately.
   */
  useEffect(() => {
    fetch('https://api.quotable.io/education/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setQuote({
          content: data.content,
          author: data.author,
        });
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  //Handling different UI states
  if (loading) return <p>Loading quote...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <blockquote>
        "{quote.content}"
        <footer>— {quote.author}</footer>
      </blockquote>
    </div>
  );
}

export default DailyQuote;

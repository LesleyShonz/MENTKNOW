// src/DailyQuote.js

import React, { useState, useEffect } from 'react';

function DailyQuote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.quotable.io/random')
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

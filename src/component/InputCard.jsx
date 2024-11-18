import React, { useState } from 'react';
import axios from 'axios';
import '../style/InputCard.css';

const InputCard = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);
  const [scrapedData, setScrapedData] = useState(null);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setError(false); // Reset error when typing
  };

  const handleSubmit = async () => {
    if (!url || !isValidUrl(url)) {
      setError(true); // Show error message if URL is invalid
    } else {
      try {
        setError(false); // Clear error
        const response = await axios.post('http://localhost:8000/scrape', { url });
        setScrapedData(response.data.data); // Menyimpan data yang di-scrape
      } catch (err) {
        console.error("Error scraping data:", err);
      }
    }
  };

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  return (
    <div id="input-card" className="input-card">
      <div className="mt-4">
        <input
          type="text"
          id="input-url"
          className="input-url"
          placeholder="Masukkan URL yang ingin Anda scrape disini"
          value={url}
          onChange={handleInputChange}
        />
      </div>
      <div className="mt-6">
        <button
          id="submit-url"
          className="submit-btn"
          onClick={handleSubmit}
        >
          Scrape!
        </button>
      </div>
      {error && (
        <div id="error-message" className="error-message">
          URL tidak valid
        </div>
      )}

      {scrapedData && (
        <div id="scraped-data">
          <p><strong>Product URL:</strong> {scrapedData.produkUrl}</p>
          <p><strong>Product Name:</strong> {scrapedData.produkName}</p>
          <p><strong>Product Price:</strong> {scrapedData.produkPrice}</p>
          <p><strong>Product Rating:</strong> {scrapedData.produkRating}</p>
        </div>
      )}
    </div>
  );
};

export default InputCard;

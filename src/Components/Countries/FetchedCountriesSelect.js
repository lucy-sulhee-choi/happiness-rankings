import React, { useState, useEffect } from 'react';

export default function FetchedCountriesSelect({ onSelect, initialValue }) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    fetchCountriesList();
  }, []);

  const fetchCountriesList = () => {
    const apiUrl = 'https://d2h6rsg43otiqk.cloudfront.net/prod/countries';
    const token = localStorage.getItem('token');
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setFetchedCountries(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
    <select
    className="form-select"
      name="country"
      value={initialValue}
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">Select Country</option>
      {fetchedCountries.map((country, index) => (
        <option key={index} value={country}>
          {country}
        </option>
      ))}
    </select>
    </div>
  );
}
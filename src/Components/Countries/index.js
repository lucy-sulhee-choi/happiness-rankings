import React, { useState, useEffect } from 'react';
import {Alert} from 'react-bootstrap';
import FetchedCountriesSelect from './FetchedCountriesSelect'; 

export default function Countries() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const token = localStorage.getItem('token');
  const [country, setCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [factorsData, setFactorsData] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const getRankingByCountry = () => {
    setFactorsData(null);
    setError(null);

    let apiUrl = `https://d2h6rsg43otiqk.cloudfront.net/prod/rankings?country=${country}`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setMessage('Error fetching the data');
          throw new Error('Error fetching the data');
        }
        return response.json();
      })
      .then((data) => {
        setFactorsData(data);
        setSelectedCountry(country)
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Happiness rankings by country <small className="text-muted"> - no login required</small></h2>
      <div className="row">
      <div className="col-lg-6 col-md-8 col-12">
        <FetchedCountriesSelect
          onSelect={(value) => setCountry(value)}
          initialValue={country}
        /></div>
        <div className="col-lg-6 col-md-8 col-12">
          <button className="btn btn-sm btn-outline-info" onClick={getRankingByCountry}>GET RANKINGS</button></div>
          <hr />
        {error && <p>Error: {error}</p>}
        {factorsData && (
          <div>
            {message ? (
              <Alert variant="danger" >
                {message}
              </Alert>
            ) : null}
            <h2>Happiness Rankings for {selectedCountry}</h2>
            <table className="table table-sm table-striped">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Rank</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {factorsData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.year}</td>
                    <td>{item.rank}</td>
                    <td>{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}




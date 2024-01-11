import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

export default function Years() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const token = localStorage.getItem('token');
  const [year, setYear] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [factorsData, setFactorsData] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getRankingByYear();
  }, []);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const getRankingByYear = () => {
    setFactorsData(null);
    setError(null);

    let apiUrl = `https://d2h6rsg43otiqk.cloudfront.net/prod/rankings?year=${year}`;
    if (year) {
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
          setSelectedYear(year);
          console.log(token);
        })
        .catch((error) => {
          setError(error.message);
          console.error(error);
        });
    }
  };

  return (
    <div>
      <h2>
        Happiness rankings by year{' '}
        <small className="text-muted"> - no login required</small>
      </h2>
      <div className="row">
        <div className="col-lg-6 col-md-8 col-12">
          <select
            className="form-select"
            name="year"
            value={year}
            onChange={handleYearChange}
          >
            <option selected>Please select year</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
          </select>
        </div>
        <div className="col-lg-6 col-md-8 col-12">
          <button
            className="btn btn-sm btn-outline-info"
            onClick={getRankingByYear}
          >
            GET RANKINGS
          </button>
        </div>
        <hr />
      </div>
      {error && <p>Error: {error}</p>}
      {factorsData && (
        <div>
          {message ? (
            <Alert variant="danger">{message}</Alert>
          ) : null}
          <h2>Happiness Rankings in {selectedYear}</h2>
          <table className="table table-sm table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Country</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {factorsData.map((item, index) => (
                <tr key={index}>
                  <td>{item.rank}</td>
                  <td>{item.country}</td>
                  <td>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

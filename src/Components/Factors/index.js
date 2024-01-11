import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import FactorsTable from './FactorsTable';
import FetchedCountriesSelect from '../Countries/FetchedCountriesSelect';

export default function Factors() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [year1, setYear1] = useState('');
  const [year2, setYear2] = useState('');
  const [country1, setCountry1] = useState('');
  const [country2, setCountry2] = useState('');
  const [factorsData1, setFactorsData1] = useState(null);
  const [factorsData2, setFactorsData2] = useState(null);
  const [error, setError] = useState(null);
  const [selectedYear1, setSelectedYear1] = useState('');
  const [selectedYear2, setSelectedYear2] = useState('');
  const [selectedCountry1, setSelectedCountry1] = useState('');
  const [selectedCountry2, setSelectedCountry2] = useState('');
  const [message, setMessage] = useState("");

  const fetchData = async (country, year, setDataFunction) => {
    try {
      setError(null);
      const apiUrl = `https://d2h6rsg43otiqk.cloudfront.net/prod/factors/${year}?country=${country}`;
      const token = localStorage.getItem('token');
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        setMessage('Please log in to access this service');
        return
      }
      else if (!response.ok){
        setMessage('Error fetching the data')
        throw new Error('Error fetching the data');
      }
      const data = await response.json();
      setDataFunction(data);
    } 
    catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const getCountriesFactors = () => {
    if (country1 && country2 && year1 && year2) {
      setMessage(null)
      setFactorsData1(null);
      setFactorsData2(null);
      setSelectedYear1(year1);
      setSelectedYear2(year2);
      setSelectedCountry1(country1);
      setSelectedCountry2(country2);
      fetchData(country1, year1, setFactorsData1);
      fetchData(country2, year2, setFactorsData2);
    }
    else { setMessage("Please select all options") }
  };

  return (
    <div>
      <h2>Compare happiness factors between countries/years</h2>
      <div className="row">
        <div className="col-lg-3 col-md-4 col-6">
          <select
            className="form-select"
            name="year1"
            value={year1}
            onChange={(e) => setYear1(e.target.value)}
          >
            <option selected>Please select year</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
          </select></div>
        <div className="col-lg-3 col-md-4 col-6">
          <FetchedCountriesSelect
            onSelect={(value) => setCountry1(value)}
            initialValue={country1}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 col-6">
          <select
            className="form-select"
            name="year2"
            value={year2}
            onChange={(e) => setYear2(e.target.value)}
          >
            <option selected>Please select year</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
          </select></div>
        <div className="col-lg-3 col-md-4 col-6">
          <FetchedCountriesSelect
            onSelect={(value) => setCountry2(value)}
            initialValue={country2}
          />
        </div>
      </div>
      <div>
        <button className="btn btn-sm btn-outline-info" onClick={getCountriesFactors}>COMPARE FACTORS</button>
      </div><hr />
      {error && <p>Error: {error}</p>}
      {factorsData1 && (
        <FactorsTable title={`Factors in ${selectedYear1} - ${selectedCountry1}`} factorsData={factorsData1} />
      )}

      {factorsData2 && (
        <FactorsTable title={`Factors in ${selectedYear2} - ${selectedCountry2}`} factorsData={factorsData2} />
      )}{message ? (
        <Alert className="alert" variant="danger" >
          {message}
        </Alert>
      ) : null}
    </div>
  );
}


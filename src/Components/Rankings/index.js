import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import Pagination from './Pagination'
import './Rankings.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Rankings() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [year, setYear] = useState('');
  const [selectedYear, setselectedYear] = useState('');

  const [limit, setLimit] = useState('');
  const [selectedLimit, setSelectedLimit] = useState('10');
  const [message, setMessage] = useState("");

  const token = localStorage.getItem('token');
  const [factorsData, setFactorsData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortByFactor, setSortByFactor] = useState('score');

  useEffect(() => {
    getRankingByYear();
  }, []);

  useEffect(() => {
    if (factorsData) {
      const totalCount = factorsData.length;
      const totalPages = Math.ceil(totalCount / selectedLimit);
      setTotalPages(totalPages);
    }
  }, [factorsData, selectedLimit]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };
  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setSelectedLimit(parseInt(e.target.value, 10));
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getRankingByYear = () => {
    setFactorsData(null);
    setError(null);
    setMessage("")

    if (year) {
      let apiUrl = `https://d2h6rsg43otiqk.cloudfront.net/prod/factors/${year}`;

      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 401) {
            setMessage('Please log in to access this service');
            return
          }
          else if (!response.ok) {
            setMessage('Error fetching the data');
            throw new Error('Error fetching the data');
          }
          return response.json();
        })
        .then((data) => {
          setFactorsData(data);
          setselectedYear(year)
          setCurrentPage(1);
        })
        .catch((error) => {
          setError(error.message);
          console.error(error);
        });
    }
  }

  const filterAndSortData = () => {
    let filteredData = factorsData.slice();

    filteredData.sort((a, b) => {
      return b[sortByFactor] - a[sortByFactor];
    });

    for (let i = 0; i < filteredData.length; i++) {
      filteredData[i].rank = i + 1; 
    }
    return filteredData;
  };

  return (
    <div>
      <h2>Happiness rankings with factors by year</h2>
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
        <div className="col-lg-2 col-12">
          <button className="btn btn-sm btn-outline-info" onClick={getRankingByYear}>GET RANKINGS</button>
        </div>

        <hr />
      </div>

      {error && <p>Error: {error}</p>}
      {factorsData && (
        <div>
          <h2>The World's Happiest Countries in {selectedYear}</h2>
          <Container className="options">
            <Row>
              <Col xs={10} md={6} lg={5}>
                <select
                  className="form-select"
                  name="limit"
                  value={limit}
                  onChange={handleLimitChange}

                >
                  <option value="">number of items per page</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </Col>
              <Col Col xs={10} md={6} lg={5}>

                <select
                  className="form-select"
                  name="sort"
                  value={sortByFactor}
                  onChange={(e) => setSortByFactor(e.target.value)}
                >
                  <option value="score">Sort by Total Score</option>
                  <option value="economy">Sort by Economy</option>
                  <option value="family">Sort by Family</option>
                  <option value="health">Sort by Health</option>
                  <option value="freedom">Sort by freedom</option>
                  <option value="generosity">Sort by generosity</option>
                  <option value="trust">Sort by trust</option>

                </select>
              </Col>
            </Row>
          </Container>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Country</th>
                <th>Score</th>
                <th>Economy</th>
                <th>Family</th>
                <th>Health</th>
                <th>Freedom</th>
                <th>Generosity</th>
                <th>Trust</th>
              </tr>
            </thead>
            <tbody>
              {filterAndSortData()
                .slice((currentPage - 1) * selectedLimit, currentPage * selectedLimit)
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.rank}</td>
                    <td>{item.country}</td>
                    <td>{item.score}</td>
                    <td>{item.economy}</td>
                    <td>{item.family}</td>
                    <td>{item.health}</td>
                    <td>{item.freedom}</td>
                    <td>{item.generosity}</td>
                    <td>{item.trust}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      {message ? (
        <Alert className="alert" variant="danger" >
          {message}
        </Alert>
      ) : null}
    </div>
  );
}

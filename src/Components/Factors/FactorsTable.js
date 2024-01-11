// FactorsTable.js
import React from 'react';

export default function FactorsTable({ title, factorsData }) {
  return (
    <div>
      <h2>{title}</h2>
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
          {factorsData.map((item, index) => (
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
    </div>
  );
}

//export default FactorsTable;
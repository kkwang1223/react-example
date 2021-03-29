import React from 'react';
import { Link } from 'react-router-dom';

const DashBoard = ({ pages }) => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {
        pages && pages.map(item => (
          <li key={item.title}>
            <Link to={item.url}>{item.title}</Link>
          </li>
        ))
      }
    </ul>
  );
};

export default DashBoard;
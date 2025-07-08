import React from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchBar.css';
import { FaSearch } from 'react-icons/fa'; 

const SearchBar = ({ setQuery }) => (
  <div className="search-bar">
    <div className="search-input-wrapper">
      <input
        type="text"
        placeholder="Search movies..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button">
        <FaSearch />
      </button>
    </div>
  </div>
);

SearchBar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default SearchBar;

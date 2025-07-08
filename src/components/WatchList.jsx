import React from 'react';
import PropTypes from 'prop-types';
import '../styles/WatchList.css';

const Watchlist = ({ watchlist, onRemove }) => (
  <div className="watchlist-panel">
    <h2>Your Watchlist</h2>
    {watchlist.length === 0 ? (
      <p className="empty-message">🎬 No movies in the watchlist.</p>
    ) : (
      <div className="watchlist-grid">
        {watchlist.map((movie) => (
          <div key={movie.imdbID} className="watchlist-item">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
              alt={movie.Title}
            />
            <div className="movie-info">
              <h4>{movie.Title}</h4>
              <p>{movie.Year}</p>
              <button
                className="remove-button"
                onClick={() => onRemove(movie.imdbID)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

Watchlist.propTypes = {
  watchlist: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Watchlist;

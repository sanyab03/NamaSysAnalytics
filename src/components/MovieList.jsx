import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MovieList.css';

const MovieList = ({ movies, addToWatchlist, loading }) => {
  if (loading) {
    return <p className="loading">Loading movies...</p>;
  }

  if (!loading && movies.length === 0) {
    return <p className="no-results"> Search a movie name to get started, maybe try "Barbie", "John Wick", or "Oppenheimer".</p>
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="movie-card">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100x150?text=No+Image'}
            alt={movie.Title}
          />
          <div className="movie-details">
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <button onClick={() => addToWatchlist(movie)}>＋ Watchlist</button>
          </div>
        </div>
      ))}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  addToWatchlist: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MovieList;


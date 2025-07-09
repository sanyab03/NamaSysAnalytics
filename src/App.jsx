import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import Watchlist from './components/WatchList';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        setLoading(true);
        fetch(`https://www.omdbapi.com/?s=${query}&type=movie&page=1&apikey=eb562152`)
          .then(res => res.json())
          .then(data => {
            if (data.Response === 'True' && data.Search) {
              setMovies(data.Search.slice(0, 10));
            } else {
              setMovies([]);
            }
          })
          .catch(() => setMovies([]))
          .finally(() => setLoading(false));
      } else {
        setMovies([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    if (!watchlist.some(m => m.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (imdbID) => {
    setWatchlist(prevList => prevList.filter(movie => movie.imdbID !== imdbID));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="logo"> Movie<span>Explorer</span></h1>
        <SearchBar setQuery={setQuery} />
      </header>
      <div className="content-container">
        <MovieList
          movies={movies}
          addToWatchlist={addToWatchlist}
          loading={loading}
        />
        <Watchlist
          watchlist={watchlist}
          onRemove={removeFromWatchlist}
        />
      </div>
    </div>
  );
}

export default App;

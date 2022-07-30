import { useState, useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com/?apikey=6ee02946';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async(title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }
  
  useEffect(() => {
    searchMovies('iron man');
  }, []);

  return (
    <div className="app">
      <h1>Movies List</h1>
      <div className="search">
        <input placeholder="Search for movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <img src={SearchIcon} alt="searchicon" onClick={() => searchMovies(searchTerm)}/>
      </div>

      {
        movies?.length > 0 
        ? ( 
          <div className="container">
            {
              movies.map((movie,index) => (
                <MovieCard movie={movie} key={index} />
              ))
            }
          </div>
        ) : (
          <div className="empty">
            <h3>No Movies found</h3>
          </div>
        )
      }

    </div>
  );
}

export default App;

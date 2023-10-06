import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import OpenAI from 'openai';

function Dashboard() {
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<{ title: string; link: string; poster: string }[]>([]);
  const [selectedMovieInfo, setSelectedMovieInfo] = useState(null); // New state for movie details

  // Fetch movie posters when movies change
  useEffect(() => {
    const fetchMoviePoster = async (title: string) => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=87e9ddd6`);
        const data = await response.json();
        const poster = data.Poster || '';
        return poster;
      } catch (error) {
        console.error(error);
        return '';
      }
    };

    const updateMoviesWithPosters = async () => {
      const moviesWithPosters = await Promise.all(
        movies.map(async (movie) => ({
          ...movie,
          poster: await fetchMoviePoster(movie.title),
        }))
      );
      setMovies(moviesWithPosters);
    };

    if (movies.length > 0) {
      updateMoviesWithPosters();
    }
  }, [movies]);

  // Handle search button click
  const handleSearchClick = async () => {
    const openai = new OpenAI({
      apiKey: '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',
      dangerouslyAllowBrowser: true,
    });
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Name 5 titles (only the titles) of movie suggestions for those who enjoyed the movie "${searchTerm}"`,
          },
        ],
      });

      const assistantResponse = chatCompletion.choices[0].message.content;
      const moviesArray = assistantResponse
        ?.split('\n')
        .map((movie) => movie.replace(/["“”\d.]/g, '').trim())
        .filter((movie) => movie !== '')
        .map((title) => ({
          title,
          link: `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=87e9ddd6`,
          poster: '',
        })) || [];

      setMovies(moviesArray);
    } catch (error) {
      console.error(error);
    }
  };

  // Event handler for clicking on a movie poster
  const handleMoviePosterClick = (movie) => {
    if (movie.link) {
      // Check if the clicked movie is the same as the currently selected one
      if (selectedMovieInfo && selectedMovieInfo.Title === movie.title) {
        // If it is, close the popup
        setSelectedMovieInfo(null);
      } else {
        // If it's a different movie, fetch its details
        fetchMovieDetails(movie.link);
      }
    }
  };

  // Function to fetch movie details from the OMDB API
  const fetchMovieDetails = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setSelectedMovieInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Render the component
  return (
    <div className="Dashboard">
      <div>
        <h1>Recomendador de Filmes</h1>
        <div className="search-container">
          <input
            className="searchBar"
            type="text"
            placeholder="Insira o nome de um filme"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="searchButton" onClick={handleSearchClick}>
            Buscar
          </button>
        </div>
        <div className="response-container">
          {movies.length > 0 && (
            <div className="movies-list-container">
              <h2 className="recommended-movies-heading">Filmes Recomendados</h2>
              <div className="movies-container">
                {movies.map((movie, index) => (
                  <div
                    className="movie"
                    key={index}
                    onClick={() => handleMoviePosterClick(movie)} // Attach click event handler
                  >
                    <a href={movie.link} target="_blank" rel="noopener noreferrer">
                      {movie.title}
                    </a>
                    <br />
                    {movie.poster && (
                      <div className="movie-poster-container">
                        <img
                          src={movie.poster}
                          alt={`Poster for ${movie.title}`}
                          className="movie-poster"
                        />
                        {selectedMovieInfo && selectedMovieInfo.Title === movie.title && (
                          <div className="movie-info-popup">
                            <div className="movie-info">
                              <h3>{selectedMovieInfo.Title}</h3>
                              <p className = "movie-infos-text">Ano: {selectedMovieInfo.Year}</p>
                              <p className = "movie-infos-text">Diretor: {selectedMovieInfo.Director}</p>
                              <p className = "movie-infos-text">Nota no Imdb: {selectedMovieInfo.imdbRating}</p>
                              {/* Add more movie details as needed */}
                              <button onClick={() => setSelectedMovieInfo(null)} className="close-button">Fechar</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
      <br />
        <a href="/populares">Filmes populares</a>
      </div>

      <div>
        <a href="/novos">Filmes novos</a>
      </div>
    </div>
  );
}

export default Dashboard;

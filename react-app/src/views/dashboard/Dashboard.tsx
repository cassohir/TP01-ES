import { useState, useEffect } from 'react';
import './Dashboard.css';
import OpenAI from 'openai';

function Dashboard() {
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<{ title: string; link: string; poster: string }[]>([]);

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
      <h2 className="recommended-movies-heading">Filmes Recomendados:</h2>
      <br />
      <div className="movies-container">
        {movies.map((movie, index) => (
          <div className="movie" key={index}>
            <a href={movie.link} target="_blank" rel="noopener noreferrer">
              {movie.title}
            </a>
            <br />
            {movie.poster && (
              <img
                src={movie.poster}
                alt={`Poster for ${movie.title}`}
                className="movie-poster"
              />
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

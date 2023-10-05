import { useState, useEffect } from 'react';
import './Dashboard.css';
import OpenAI from 'openai';

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<{ title: string; link: string; poster: string }[]>([]);

  useEffect(() => {
    const fetchMoviePoster = async (title: string) => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=87e9ddd6`);
        const data = await response.json();
        const poster = data.Poster || ''; // Get the poster URL from the API response
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
        .map((movie) => movie.replace(/["“”\d.]/g, '').trim()) // Remove quotation marks, digits, and dots
        .filter((movie) => movie !== '')
        .map((title) => ({
          title,
          link: `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=87e9ddd6`,
          poster: '', // Initially, set the poster to an empty string
        })) || [];

      setMovies(moviesArray);
    } catch (error) {
      console.error(error);
    }
  };

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
            <div className="movies-container">
              <h2>Filmes recomendados:</h2>
              {movies.map((movie, index) => (
                <div className="movie" key={index}>
                  <a href={movie.link} target="_blank" rel="noopener noreferrer">
                    {movie.title}
                  </a>
                  <br />
                  {movie.poster && (
                    <img src={movie.poster} alt={`Poster for ${movie.title}`} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <a href="/populares">Filmes populares</a>
      </div>

      <div>
        <a href="/novos">Filmes novos</a>
      </div>
    </div>
  );
}

export default Dashboard;

import { useEffect, useState } from 'react';
import './Dashboard.css';
import apiGPT from '../../services/apiGPT';
import './Dashboard.css';
import OpenAI from 'openai';

export interface Movies {
  id: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
}

interface SuggestedMovies {
  Poster: string;
}

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<string[]>([]);
  const [filmesSugeridos, setFilmesSugeridos] = useState<SuggestedMovies[]>([]);



  
  useEffect(() => {
    const novoVetor = [...filmesSugeridos];
    for (let i=0; i<5;i++){
      apiGPT
        .get(`${movies[i]}`.substring(3))
        .then((response) => novoVetor[i] = response.data)
        .then(() => setFilmesSugeridos(novoVetor))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    } 
  },[]);
  
  const handleSearchClick = async () => {
    // Call the OpenAI API with user input

    const openai = new OpenAI({
      apiKey: "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",
      dangerouslyAllowBrowser: true 
    });
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: `Cite 5 nomes (somente os nomes) de sugestões de filmes para quem gostou do filme "${searchTerm}"` }
        ],
      });

      const assistantResponse = chatCompletion.choices[0].message.content;
      // Extract movies from the response
      const moviesArray = assistantResponse?.split('\n').filter(movie => movie.trim() !== '') ?? [];
      setMovies(moviesArray);
      console.log(moviesArray);
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
            <button className="searchButton" onClick={handleSearchClick}>Buscar</button>
          </div>
          <div className="response-container">
            {movies.length > 0 && (
              <div className="movies-container">
                <h2>Filmes recomendados:</h2>
                {movies.map((movie, index) => (
                <div className="movie" key={index}>
                  {movie}
                </div>
                ))}
              </div>
            )}
          </div>
      </div>

      <div className="image-container">
        {filmesSugeridos.length > 0 && (
          <div className="movies-image">
            {filmesSugeridos.map((movie, index) => (
              <div className="movie" key={index}>
                <img src={movie.Poster}></img>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <a href='/populares'>Filmes populares</a>
      </div>
      
      <div>
        <a href='/novos'>Filmes novos</a>
      </div>

    </div>
    );
}

export default Dashboard;


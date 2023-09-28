import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import OpenAI from 'openai';
import apiGPT from '../../services/apiGPT';
import api from '../../services/api';
import MovieCard from '../../components/cardMovie';
import './Dashboard.css'

interface Filme {
  id: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
}

interface Movie {
  Poster: string;
}

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [response, setResponse] = useState('');
  const [movies, setMovies] = useState<string[]>([]);

  const [filmesSugeridos, setFilmesSugeridos] = useState<Movie[]>([]);

  const [filmesPopulares, setFilmesPopulares] = useState<Filme[]>([]);

  
  useEffect(() => {
    const novoVetor = [...filmesSugeridos];
    for (let i=0; i<5;i++){
      apiGPT
        .get(`${movies[i]}`.substring(3))
        .then((response:any) => novoVetor[i] = response.data)
        .then(() => setFilmesSugeridos(novoVetor))
          .catch((err:any) => {
            console.error("ops! ocorreu um erro" + err);
          });
    } 
},  [filmesSugeridos]);

  useEffect(() => {
    api
      .get("")
      .then((response:any) => setFilmesPopulares(response.data.results))
          .catch((err:any) => {
            console.error("ops! ocorreu um erro" + err);
          });
    }, []);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
          { role: "user", content: `cite 5 nomes (somente os nomes) de filmes sugestão para quem gostou de "${searchTerm}"` }
        ],
      });

      const assistantResponse = chatCompletion.choices[0].message.content;
      setResponse(assistantResponse);

      // Extract movies from the response
      const moviesArray = response.split('\n').filter(movie => movie.trim() !== '');
      setMovies(moviesArray);
      console.log(moviesArray)
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
              type="text"
              placeholder="Insira o nome de um filme"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearchClick}>Buscar</button>
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

      <div className='popular-container'>
        <h1>Filmes Populares para você!</h1>
        <div className='carrosel'>
          {filmesPopulares.map((filme, index) => (
          <div className="filme" key={index}>
            <MovieCard titulo={filme.title} imagem={filme.poster_path} id={filme.id} data={filme.release_date} descricao={filme.overview}/>
          </div>
          ))}
        </div>
      </div>

    </div>
    );
}

export default Dashboard;

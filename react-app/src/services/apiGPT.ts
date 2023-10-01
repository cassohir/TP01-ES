import axios from "axios";

// const API_KEY = "bb10861399b0d4b308fb77aa97332179";
const API_KEY = "99604a09";

const apiGPT = axios.create({
    // baseURL: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=pt-BR`,
    baseURL: `http://www.omdbapi.com/?apikey=${API_KEY}&t=`
  });
  
export default apiGPT;
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Movies } from "../dashboard/Dashboard";
import { MoviesComponent } from '../../components/Movies';



export default function PopularMovies() {

    const [filmesPopulares, setFilmesPopulares] = useState<Movies[]>([]);

    useEffect(() => {
        api
          .get("")
          .then((response) => setFilmesPopulares(response.data.results))
              .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
              });
    }, []);
    
    return (
        <div>
            <MoviesComponent filmes={filmesPopulares} tipo='populares'/>
        </div>    
    )
}


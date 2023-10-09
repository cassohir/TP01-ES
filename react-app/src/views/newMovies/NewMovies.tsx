import { useEffect, useState } from 'react';
import api2 from '../../services/api2';
import { Movies } from "../dashboard/Dashboard";
import { MoviesComponent } from '../../components/Movies';


export default function NewMovies() {

    const [filmesNovos, setFilmesNovos] = useState<Movies[]>([]);

    useEffect(() => {
        api2
          .get("")
          .then((response) => setFilmesNovos(response.data.results))
              .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
              });
    }, []);
    
    return (
        <div>
            <MoviesComponent filmes={filmesNovos} tipo='novos'/>
        </div>    
    )
}
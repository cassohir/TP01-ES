import { Movies } from "../views/dashboard/Dashboard";
import MovieCard from "./cardMovie";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import "./Movies.css";
import useMovieRow from "../utils/useCarousel";
interface MoviesProps {
  filmes: Movies[];
  tipo: string;
}



export function MoviesComponent({ filmes, tipo }: MoviesProps) {
  const {
    margin,
    handleNavigationLeft,
    handleNavigationRight,
  } = useMovieRow({
    filmes
  });
  return (
    <>
      <div className='popular-container'>
        <h1>Filmes {tipo} para você!</h1>
      <div className='carrosel' style={{ marginLeft: margin }}>
        <div className="arrow left">
          <button className="arrow-button">
            {/* <MdKeyboardArrowLeft onClick={handleNavigationLeft} size={56} color={"#269912"} /> */}
            <KeyboardDoubleArrowLeftIcon onClick={handleNavigationLeft} />
          </button>
        </div>
          {filmes.map((filme, index) => (
          <div className="filme" key={index}>
            <MovieCard titulo={filme.title} imagem={filme.poster_path} id={filme.id} data={filme.release_date} descricao={filme.overview}/>
          </div>
          ))}
        <div className="arrow right">
          <button onClick={handleNavigationRight} className="arrow-button">
            {/* <MdKeyboardArrowRight size={56} color={ "#269912"} /> */}
            <KeyboardDoubleArrowRightIcon />
          </button>
        </div>
        </div>
      </div>
  </>
  )
}
import { useEffect, useState } from 'react';


import { Movies } from '../views/dashboard/Dashboard';

interface Props {
  filmes: Movies[];
}

const useMovieRow = ({ filmes }: Props) => {

  const [margin, setMargin] = useState(0);
  const [movie, setMovie] = useState<Movies[]>([]);

  useEffect(() => {
     setMovie(filmes);
  },[filmes])


  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const cardSize = 320 + 16;
  const cardsPerRow = {
    current: windowSize[0] / cardSize,
  };
  const totalWidth = movie.length * cardSize;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    cardsPerRow.current = window.innerWidth / cardSize;
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });




  const handleNavigationLeft = () => {
    let x = margin + Math.round(windowSize[0] / 1.25);
    if (x > 0) x = 0;
    setMargin(x);
  };

  const handleNavigationRight = () => {
    const maxMargin = totalWidth - (cardSize * cardsPerRow.current - 48);
    const jump = -margin + Math.round(windowSize[0] / 1.25);

    if (jump < maxMargin) setMargin(-jump);
    else if (totalWidth < windowSize[0]) setMargin(margin);
    else setMargin(-maxMargin);
  };



  return {
    movie,
    margin,
    handleNavigationLeft,
    handleNavigationRight,
  };
};

export default useMovieRow;

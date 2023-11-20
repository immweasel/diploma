import { useEffect, useState } from 'react';

const useWindowCalculator = () => {
  
  const [moviesDisplay, setMoviesDisplay] = useState(0);
  const [moviesAddDisplay, setMoviesAddDisplay] = useState(0);
  const [relationWidht, setRelationWidht] = useState(undefined);

  const handleResize = () => {
    setRelationWidht(window.innerWidth);
  };

  const resizeDelay = () => {
    let time;
    if (!time) {
      time = setTimeout(() => {
        time = null;
        handleResize();
      }, 1);
    };
  }

  const widthWindow = window.screen.width;

  useEffect(() => {

    if (relationWidht >= 1200) {
      setMoviesDisplay(16);
      setMoviesAddDisplay(4);
    }
    else if (relationWidht >= 960) {
      setMoviesDisplay(12);
      setMoviesAddDisplay(3);
    }
    else if (relationWidht >= 742) {
      setMoviesDisplay(8);
      setMoviesAddDisplay(2);
    }
    else if (relationWidht >= 0) {
      setMoviesDisplay(5);
      setMoviesAddDisplay(2);
    }
  }, [widthWindow, relationWidht]);

  const addCards = () => {
    setMoviesDisplay(moviesDisplay + moviesAddDisplay);
  };
  return { addCards, moviesDisplay, resizeDelay, handleResize }
};

export default useWindowCalculator;
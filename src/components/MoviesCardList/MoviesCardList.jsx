import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard';
import useWindowCalculator from '../../hooks/useWindowCalculator';
import useCheckSavedFilm from '../../hooks/useCheckSavedFilm';
import './MoviesCardList.css';

const MoviesCardList = ({
  listMovies,
  requestStorage,
  stateChechbox,
  onSaveFilms,
  onDeleteSaveFilm,
  savedFilms,
  onBlockedButton }) => {

  const { checkSaved } = useCheckSavedFilm();
  const { pathname } = useLocation();
  const isSavedMovies = pathname === '/saved-movies';

  const [insertList, setInsertList] = useState([]);

  const {
    addCards,
    moviesDisplay,
    resizeDelay,
    handleResize,
  } = useWindowCalculator();

  const filteredMovies = listMovies.slice(0, moviesDisplay).map((movie) => {

    return (
      <MoviesCard
        key={isSavedMovies ? movie._id : movie.id}
        movie={movie}
        isSavedMovies={isSavedMovies}
        onSaveFilms={onSaveFilms}
        onDeleteSaveFilm={onDeleteSaveFilm}
        checkSaved={
          isSavedMovies
            ? true
            : checkSaved(savedFilms, movie)}
        onBlockedButton={onBlockedButton}
      />
    )
  });

  const savedMovies = listMovies.map((movie) => {

    return (
      <MoviesCard
        key={isSavedMovies ? movie._id : movie.id}
        movie={movie}
        isSavedMovies={isSavedMovies}
        onSaveFilms={onSaveFilms}
        onDeleteSaveFilm={onDeleteSaveFilm}
        checkSaved={
          isSavedMovies
            ? true
            : checkSaved(savedFilms, movie)}
        disabled={onBlockedButton}
      />
    )
  });

  useEffect(() => {
    setInsertList(filteredMovies);
  }, [moviesDisplay, stateChechbox, listMovies]);

  useEffect(() => {
    // вешаем слушатель
    handleResize();
    window.addEventListener('resize', resizeDelay);
    // снимаем слушатель
    return () => window.removeEventListener('resize', resizeDelay);
  }, []);

  return (
    <section className='movies-list'>

      {listMovies.length !== 0
        ?
        <ul className='movies-list__list'>
          {isSavedMovies ? savedMovies : filteredMovies}
        </ul>
        :
        <p
          className='movies-list__not-found'>
          {`${requestStorage !== '' ? 'Ничего не найдено' : ''}`}
        </p>
      }

      {!isSavedMovies && insertList.length < listMovies.length
        ?
        <button type='button'
          onClick={addCards}
          className='movies-list__btn-more'>
          Ещё
        </button>
        :
        <div
          className='movies-list__saveddevider'>
        </div>
      }
      
    </section >
  );
}

export default MoviesCardList;
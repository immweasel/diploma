import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getFilms } from '../../utils/MoviesApi';
import useFilteredFilms from '../../hooks/useFilteredFilms';
import useCheckSavedFilm from '../../hooks/useCheckSavedFilm';
import './Movies.css';

const Movies = ({
  onSaveFilms,
  savedFilms,
  onDeleteSaveFilm,
  onBlockedButton }) => {

  const [isLoading, setIsLoading] = useState(false);

  const moviesAll = JSON.parse(localStorage.getItem('moviesFullList')) ?? [];
  const requestStorage = JSON.parse(localStorage.getItem('request')) ?? '';
  const checkboxMoviesStorage = JSON.parse(localStorage.getItem('checkboxMoviesStorage')) ?? false;
  
  const [isFindMoviesList, setIsFindMoviesList] = useState([]);
  const [isCheckedShortFilms, setIsCheckedShortFilms] = useState(checkboxMoviesStorage);

  const { foundFilms } = useFilteredFilms();
  const { checkSaved } = useCheckSavedFilm();

  const filteredFilms = (movies, request, isCheckedShortFilms) => {

    setIsFindMoviesList(foundFilms(movies, request, isCheckedShortFilms));
  }

  const handleChangeCheckbox = () => {

    localStorage.setItem('checkboxMoviesStorage', JSON.stringify(!isCheckedShortFilms));
    setIsCheckedShortFilms(!isCheckedShortFilms);
    if (moviesAll.length !== 0) {
      setIsFindMoviesList(foundFilms(moviesAll, requestStorage, !isCheckedShortFilms));
    }
  }

  const handleSavedFilms = (movie) => {
    const savedFilm = checkSaved(savedFilms, movie);
    if (savedFilm) {
      onDeleteSaveFilm(savedFilm._id);
      return;
    } else {
      onSaveFilms(movie);
    }
  }

  const getingFilms = (request) => {
    getFilms()
      .then((moviesFullList) => {
        localStorage.setItem('moviesFullList', JSON.stringify(moviesFullList));
        filteredFilms(moviesFullList, request, isCheckedShortFilms);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleSubmit = (request) => {
    if (moviesAll.length === 0) {
      getingFilms(request);
    } else {
      setIsFindMoviesList(foundFilms(moviesAll, request, isCheckedShortFilms))
    }
    localStorage.setItem('request', JSON.stringify(request));
  }


  useEffect(() => {
    if (requestStorage !== '') {
      setIsFindMoviesList(foundFilms(moviesAll, requestStorage, isCheckedShortFilms));
    } else {
      setIsCheckedShortFilms(false);
    }
  }, []);

  return (
    <main className='movies'>
      <SearchForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isChecked={isCheckedShortFilms}
        onChange={handleChangeCheckbox}
        oldRequest={requestStorage}
        listMovies={isFindMoviesList}
      ></SearchForm>

      {isLoading
        ? <Preloader />
        : (<MoviesCardList
          requestStorage={requestStorage}
          listMovies={isFindMoviesList}
          stateChechbox={isCheckedShortFilms}
          onSaveFilms={handleSavedFilms}
          onDeleteSaveFilm={onDeleteSaveFilm}
          savedFilms={savedFilms}
          onBlockedButton={onBlockedButton}
        ></MoviesCardList>)
      }
    </main >
  );
}

export default Movies;
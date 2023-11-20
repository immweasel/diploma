import React, { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import useFilteredFilms from '../../hooks/useFilteredFilms';

const SavedMovies = ({
  savedFilms,
  onDeleteSaveFilm,
  onBlockedButton }) => {

  const [listMovies, setListMovies] = useState([]);

  const [isRequestBlock, setIsRequestBlock] = useState('');
  const [isCheckedShortFilms, setIsCheckedShortFilms] = useState(false);

  const { foundFilms } = useFilteredFilms();

  const handleChangeCheckbox = () => {
    if (savedFilms) {
      setIsCheckedShortFilms(!isCheckedShortFilms);
      if (listMovies !== 0) {
        setListMovies(
          foundFilms(savedFilms, isRequestBlock, !isCheckedShortFilms)
        );
      } else {
        return;
      }
    }
  };

  const handleSubmit = (request) => {
    filtredFilms(request);
  };
  
  const filtredFilms = (request) => {
    setIsRequestBlock(request);
    setListMovies(
      foundFilms(savedFilms, request, isCheckedShortFilms)
    );
  };

  useEffect(() => {
    if (savedFilms) {
      if (isCheckedShortFilms || isRequestBlock !== '') {
        setListMovies(
          foundFilms(savedFilms, isRequestBlock, isCheckedShortFilms)
        );
        return
      }
      setListMovies(savedFilms);
    }
  }, [savedFilms]);

  return (
    <div className='movies'>

      <SearchForm
        onChange={handleChangeCheckbox}
        onSubmit={handleSubmit}
        isChecked={isCheckedShortFilms}
      ></SearchForm>

      <MoviesCardList
        listMovies={listMovies}
        onDeleteSaveFilm={onDeleteSaveFilm}
        onBlockedButton={onBlockedButton}
      ></MoviesCardList>
      
    </div>
  );
}

export default SavedMovies;
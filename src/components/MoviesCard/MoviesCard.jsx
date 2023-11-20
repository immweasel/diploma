import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { configUrl } from '../../utils/constants';
import './MoviesCard.css';

const MoviesCard = ({
  movie,
  onSaveFilms,
  isSavedMovies,
  onDeleteSaveFilm,
  checkSaved,
  onBlockedButton }) => {
  const { pathname } = useLocation();

  // стейт изменения состояния кнопки
  const [isMovieSaved, setIsMovieSaved] = useState(movie.status);

  function msToTime(duration) {

    let minutes = duration % 60, hours = Math.floor(duration / 60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    return hours + "ч" + minutes + 'м';
    
  }

  const handleClickSave = (e) => {
    e.preventDefault();
    if (isMovieSaved) {
      console.log(isMovieSaved);
      onDeleteSaveFilm(movie._id);
    } else {
      onSaveFilms(movie);
    }
    setIsMovieSaved(prevState => !prevState);
  };

  const handleClickDeleteSaveFilm = () => {
    onDeleteSaveFilm(movie._id);
    setIsMovieSaved(prevState => !prevState);
  }

  return (
    <li className='movie-card'>
      <a href={movie.trailerLink} target='_blank' rel='noreferrer'>
        <img src={isSavedMovies ? movie.image : `${configUrl.IMAGE_URL}${movie.image.url}`}
          alt={movie.description}
          className='movie-card__image'
        />
      </a>
      <div className='movie-card__wrapper'>
        <div className='movie-card__info'>
          <h2 className='movie-card__title'>
            {movie.nameRU}
          </h2>
          <p className='movie-card__duration'>{msToTime(movie.duration)}</p>
        </div>

        {pathname === '/movies'
          ? <button
            className={`movie-card__btn ${checkSaved ? 'movie-card__btn_saved' : ''} links-hover`}
            onClick={handleClickSave}
            disabled={onBlockedButton}
          ></button>
          : <button
            className={`movie-card__btn ${checkSaved ? 'movie-card__btn_saved' : ''} links-hover`}
            onClick={handleClickDeleteSaveFilm}
            disabled={onBlockedButton}
          ></button>}
      </div>
    </li>
  );
}

export default MoviesCard;
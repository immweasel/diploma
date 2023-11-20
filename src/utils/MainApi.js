import SavedMovies from '../components/SavedMovies/SavedMovies';
import { configMainApi, configUrl } from './constants';

const {
  BASE_URL,
  headers,
  credentials,
  endpoint } = configMainApi;

const {
  ENDPOINT_REGISTER,
  ENDPOINT_AUTH,
  ENDPOINT_CHECKJWL,
  ENDPOINT_OUT,
  ENDPOINT_MOVIES } = endpoint;

const checkError = (res) => {
  if (res.ok) {
    return res.json();
  }
  else {
    return Promise.reject(res.status);
  }
};

export const register = ({ email, password, name }) => {
  return fetch(
    `${BASE_URL}${ENDPOINT_REGISTER}`,
    {
      method: 'POST',
      headers,
      credentials,
      body: JSON.stringify({ email, password, name })
    })
    .then((res) => {
      return checkError(res);
    })
};

export const authorize = ({ email, password }) => {
  return fetch(
    `${BASE_URL}${ENDPOINT_AUTH}`,
    {
      method: 'POST',
      headers,
      credentials,
      body: JSON.stringify({ email, password })
    })
    .then((res) => {
      return checkError(res);
    })
};

export const logout = () => {
  return fetch(
    `${BASE_URL}${ENDPOINT_OUT}`,
    {
      method: 'GET',
      headers,
      credentials
    }
  )
    .then((res) => {
      return checkError(res);
    })
};

export const getUser = () => {
  return fetch(
    `${BASE_URL}${ENDPOINT_CHECKJWL}`,
    {
      method: 'GET',
      headers,
      credentials
    }
  )
    .then((res) => {
      return checkError(res);
    })
};

export const updateUserInfo = ({ name, email }) => {
  return fetch(
    `${BASE_URL}${ENDPOINT_CHECKJWL}`,
    {
      method: 'PATCH',
      headers,
      credentials,
      body: JSON.stringify({ name, email })
    }
  )
    .then((res) => {
      return checkError(res);
    })
};

export const savedMovies = (movie) => {
  return fetch(
    `${BASE_URL}${ENDPOINT_MOVIES}`,
    {
      method: 'POST',
      headers,
      credentials,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${configUrl.IMAGE_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `${configUrl.IMAGE_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      })
    }
  )
    .then((res) => {
      return checkError(res);
    })
};

// сохраненные 
export const getMovies = () => {
  return fetch(
    `${BASE_URL}${ENDPOINT_MOVIES}`,
    {
      method: 'GET',
      headers,
      credentials
    }
  )
    .then((res) => {
      return checkError(res);
    })
};

export const deleteMovie = (movieId) => {
  return fetch(
    `${BASE_URL}${ENDPOINT_MOVIES}/${movieId}`,
    {
      method: 'DELETE',
      headers,
      credentials
    }
  )
    .then((res) => {
      return checkError(res);
    })
};
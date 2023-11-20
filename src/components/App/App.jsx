import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { register, authorize, logout, getUser, updateUserInfo, savedMovies, getMovies, deleteMovie } from '../../utils/MainApi';
import { MESSAGE, ENDPOINTS, CODE_ERROR } from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  // навигация
  const [isAuthorized, setAuthorized] = useState(false);
  // context
  const [currentUser, setCurrentUser] = useState({});
  // блокирую кнопку в момент отправки формы
  const [isBlockedButton, setIsBlockedButton] = useState(false);
  // хранениу типа ошибок
  const [sourceInfoTooltips, setSourceInfoTooltips] = useState({
    access: false,
    message: '',
    isSuccess: false,
  });

  // сохранненые фильмы
  const [savedFilms, setSavedFilms] = useState([]);

  const resetSourceInfoTooltips = () => {
    setSourceInfoTooltips({
      access: false,
      message: '',
      isSuccess: false,
    });
  }

  const handlerSaveFilms = (movie) => {
    setIsBlockedButton(true);
    savedMovies(movie)
      .then((data) => {
        setSavedFilms([data, ...savedFilms]);
      })
      .catch((err) => {
        console.error(err);
        if (err === CODE_ERROR.authError) {
          removeCookie();
        }
        setIsBlockedButton(false);
      })
      .finally(() => {
        setIsBlockedButton(false);
      });
  };

  const handleDeleteSaveFilm = (movieId) => {
    setIsBlockedButton(true);

    const handledMovie = savedFilms.find((item) => {
      if (pathname === '/saved-movies') {
        return item.movieId === movieId;
      } else {
        return item.movieId === movieId;
      }
    });

    const isLiked = Boolean(handledMovie);

    const id = handledMovie ? handledMovie.id : movieId;
    console.log(movieId)

    deleteMovie(id)
      .then((res) => {
        const updateList = savedFilms.filter((movie) => movie._id !== id);
        setIsBlockedButton(false);
        setSavedFilms(updateList)
        console.log(savedFilms)
      })
      .catch((err) => {
        console.log(err);
        if (err === CODE_ERROR.authError) {
          removeCookie();
        }
        setIsBlockedButton(false);
      })
      .finally(() => {
        setIsBlockedButton(false);
      });
  };

  const getingSavedFilms = () => {
    getMovies()
      .then((data) => {
        setSavedFilms(data.movies);
      })
      .catch((err) => {
        console.error(err)
      });
  };

  // регистрация
  const handlerRegister = ({ email, password, name }) => {
    setIsBlockedButton(true);
    register({ email, password, name })
      .then((res) => {
        handlerLogin({ email, password });
      })
      .catch((err) => {
        console.log(err);
        if (err === CODE_ERROR.dataDublicate) {
          setSourceInfoTooltips({
            access: true,
            message: MESSAGE.USER_EXIST,
          });
          setIsBlockedButton(false);
        } else {
          setSourceInfoTooltips({
            access: true,
            message: MESSAGE.REGISTER_USER_ERROR,
          });
          setIsBlockedButton(false);
        }
      })
      .finally(() => {
        setIsBlockedButton(false);
      })
  };

  // авторизация
  const handlerLogin = ({ email, password }) => {
    const date = { email, password };
    setIsBlockedButton(true);
    authorize(date)
      .then((res) => {
        setAuthorized(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        if (err === CODE_ERROR.authError) {
          setSourceInfoTooltips({
            access: true,
            isSuccess: false,
            message: MESSAGE.LOGIN_PASSWORD_INCORRECT,
          });
          setIsBlockedButton(false);
        } else {
          setSourceInfoTooltips({
            access: true,
            isSuccess: false,
            message: MESSAGE.AUTHORIZATION_ERROR,
          });
          setIsBlockedButton(false);
        }
      })
      .finally(() => {
        setIsBlockedButton(false);
        resetSourceInfoTooltips();
      })
  };

  // удаление куки JWT
  const removeCookie = () => {
    logout()
      .then((res) => {
        console.log(res.exit);
        resetSourceInfoTooltips();
        localStorage.removeItem('moviesFullList');
        localStorage.removeItem('request');
        localStorage.removeItem('checkboxMoviesStorage');
        setAuthorized(false);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (pathname === '/') {
      resetSourceInfoTooltips();
    }
  }, [pathname]);

  // обновление пользователя
  const handlerUserInfo = ({ name, email }) => {
    const data = { name, email };
    setIsBlockedButton(true);
    updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        setSourceInfoTooltips({
          access: true,
          isSuccess: true,
          message: MESSAGE.USER_DATE_MODIFIED,
        });
        console.log(res);
      })
      .catch((err) => {
        if (err === CODE_ERROR.dataDublicate) {
          setSourceInfoTooltips({
            access: true,
            isSuccess: false,
            message: MESSAGE.USER_EXIST,
          });
          setIsBlockedButton(false);
        } else {
          setSourceInfoTooltips({
            access: true,
            isSuccess: false,
            message: MESSAGE.REGISTER_USER_ERROR,
          });
          setIsBlockedButton(false);
        }
      })
      .finally(() => {
        setIsBlockedButton(false);
      });
  }

  useEffect(() => {
    const currentPath = pathname;
    getUser()
      .then((user) => {
        setCurrentUser(user);
        setAuthorized(true);
        navigate(currentPath, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isAuthorized]);

  useEffect(() => {
    if (isAuthorized) {
      getingSavedFilms();
    }
}, [isAuthorized]);

  return (
    <div className='app'>
      <div className='page'>
        <CurrentUserContext.Provider
          value={currentUser}>
          <Header
            isLoggedIn={isAuthorized}
          ></Header>
          <Routes>
            <Route
              path='/signup'
              element={isAuthorized
                ? <Navigate to='/movies' replace />
                : (<Register
                  onRegister={handlerRegister}
                  sourceInfoTooltips={sourceInfoTooltips}
                  onBlockedButton={isBlockedButton}
                  onResetSourceInfoTooltips={resetSourceInfoTooltips}
                  ></Register>)
              } />

            <Route
              path='/signin'
              element={isAuthorized
                ? <Navigate to='/movies' replace />
                : (<Login
                  onLogin={handlerLogin}
                  sourceInfoTooltips={sourceInfoTooltips}
                  onBlockedButton={isBlockedButton}
                  onRemoveCookie={removeCookie}
                  onResetSourceInfoTooltips={resetSourceInfoTooltips}
                  ></Login>)
              } />

            <Route
              path='/'
              element={
                <Main></Main>
              } />
            <Route
              path='/profile'
              element={
                <ProtectedRoute
                  element={Profile}
                  isLoggedIn={isAuthorized}
                  onRemoveCookie={removeCookie}
                  sourceInfoTooltips={sourceInfoTooltips}
                  onUpdateUserInfo={handlerUserInfo}
                  onBlockedButton={isBlockedButton}
                  onResetSourceInfoTooltips={resetSourceInfoTooltips}
                >
                </ProtectedRoute>
              }
            />
            <Route path='/movies' element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isAuthorized}
                onSaveFilms={handlerSaveFilms}
                savedFilms={savedFilms}
                onDeleteSaveFilm={handleDeleteSaveFilm}
                onBlockedButton={isBlockedButton}
              ></ProtectedRoute>
            }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  isLoggedIn={isAuthorized}
                  savedFilms={savedFilms}
                  onDeleteSaveFilm={handleDeleteSaveFilm}
                />
              }
            />
            <Route
              path='*'
              element={
                <PageNotFound></PageNotFound>
              } />
          </Routes>
          <Footer></Footer>
        </CurrentUserContext.Provider>
      </div>
    </div >
  );
}

export default App;
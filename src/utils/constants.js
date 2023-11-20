export const configApiBeatfilm = {
  BASE_URL: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: { "Content-Type": "application/json" },
};

export const REGEX_EMAIL = '^[a-zA-Z0-9+_.\\-]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,4}$';
export const REGEX_NAME = '[A-Za-zА-Яа-яЁё\\s\\-]+';

export const ENDPOINTS = {
  ENDPOINT_REGISTER: '/signup',
  ENDPOINT_AUTH: '/signin',
  ENDPOINT_MOVIES: '/movies',
  ENDPOINT_PROFILE: '/profile',
  ENDPOINT_SAVED_MOVIES: '/saved-movies'
}

export const CODE_ERROR = {
  dataDublicate: 409,
  authError: 401,
  dataError: 400,
}

export const configMainApi = {
  BASE_URL: 'http://localhost:3000',
  // BASE_URL: 'https://api.immweasel.diploma.nomoredomainsrocks.ru',
  headers: {
    accept: 'application/json',
    'Content-type': 'application/json',
  },
  credentials: 'include',
  endpoint: {
    ENDPOINT_REGISTER: '/signup',
    ENDPOINT_AUTH: '/signin',
    ENDPOINT_OUT: '/signout',
    ENDPOINT_CHECKJWL: '/users/me',
    ENDPOINT_MOVIES: '/movies',
  }
};

export const
  MESSAGE = {
    SEARCH_PLACEHOLDER_INPUT: 'Фильм',
    EMPTY_PLACEHOLDER_INPUT: 'Нужно ввести ключевое слово',
    USER_EXIST: ' Пользователь с таким email уже существует.',
    REGISTER_USER_ERROR: 'При регистрации пользователя произошла ошибка.',
    LOGIN_PASSWORD_INCORRECT: 'Вы ввели неправильный логин или пароль.',
    AUTHORIZATION_ERROR: 'При авторизации произошла ошибка.',
    USER_DATE_MODIFIED: 'Данные профиля успешно изменены.',
  };

export const configUrl = {
  IMAGE_URL: 'https://api.nomoreparties.co'
};

import React, { useState } from 'react';

const useFilteredFilms = () => {
  // проверка дрейшн
  const checkedFilms = (movie) => {
    const { duration } = movie;
    if (duration <= 40) {
      return true;
    }
    return false;
  };

  const [filteredArray, setFilteredArray] = useState([]);

  const foundFilms = (movies, request, state) => {

    const newArr = [...movies].filter((movie) => {
      const filterToName =
        movie.nameEN.toLowerCase().includes(request.toLowerCase().trim()) ||
        movie.nameRU.toLowerCase().includes(request.toLowerCase().trim());
      if (filterToName && state) {
        return checkedFilms(movie);
      }
      return filterToName;
    });
    return newArr;
  };
  return { foundFilms, checkedFilms };
}

export default useFilteredFilms;
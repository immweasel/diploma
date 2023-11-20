import React, { useState, useRef, useEffect } from 'react';
import useValidationsForms from '../../hooks/useValidationsForms';
import { MESSAGE } from '../../utils/constants';
import './SearchForm.css';

const SearchForm = ({
  onSubmit,
  isLoading,
  isChecked,
  onChange,
  oldRequest,
}) => {

  const [errSearchMessage, setErrSearchMessage] = useState(MESSAGE.SEARCH_PLACEHOLDER_INPUT);

  const inputSearch = useRef(null);

  const listenerValidation = (isValid) => {
    if (isValid) { setErrSearchMessage(MESSAGE.SEARCH_PLACEHOLDER_INPUT) }
    else { setErrSearchMessage(MESSAGE.EMPTY_PLACEHOLDER_INPUT) }
    inputSearch.current.focus();
  }

  const {
    inputValues,
    isValid,
    handleChange,
  } = useValidationsForms();

  const handleSubmit = (e) => {
    e.preventDefault();
    listenerValidation(isValid);
    if (isValid) {
      onSubmit(inputValues.inputSearch);
    }
  };

  useEffect(() => {
    if (oldRequest !== '') {
      inputValues.inputSearch = oldRequest;
    }
  }, []);

  return (
    <section className='search'>
      <div className='search__container'>
        <form
          onSubmit={handleSubmit}
          className='search__form'
          noValidate>
          <fieldset className='search__fieldset'>
            <label htmlFor="search__input" className='search__label-form'>
              <input
                className='search__input'
                placeholder={errSearchMessage}
                ref={inputSearch}
                type="text"
                name='inputSearch'
                value={inputValues.inputSearch ?? ''}
                id="search__input"
                onChange={handleChange}
                required
              />
            </label>
          </fieldset>
          <button
            className='search__button'
            type='submit'
            disabled={isLoading}
          ></button>
        </form>
        <div className='search__wrapper'>
          <label
            className='search__switch'
            htmlFor="search__checkbox">
            <input
              className='search__checkbox'
              type="checkbox"
              id='search__checkbox'
              onChange={onChange}
              checked={isChecked}
            />
            <div className='search__slider search__slider_round'></div>
          </label>
          <label
            className='search__label-text'
            htmlFor="search__checkbox">Короткометражки</label>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
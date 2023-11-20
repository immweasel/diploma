import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useValidationsForms from '../../hooks/useValidationsForms';
import './Profile.css';

const Profile = ({
  onRemoveCookie,
  sourceInfoTooltips,
  onResetSourceInfoTooltips,
  onUpdateUserInfo,
  onBlockedButton }) => {

  const { name, email } = useContext(CurrentUserContext);
  const [isVisible, setIsVisible] = useState(true);
  const [isRedact, setIsRedact] = useState(false);
  const [changesInput, setChangesInput] = useState({
    name: '',
    email: '',
  });

  const {
    inputValues,
    errMessage,
    isValid,
    handleChange,
    setInputValues,
    setIsValid,
  } = useValidationsForms();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onUpdateUserInfo(inputValues);
    }
  }

  const handleRedact = (e) => {
    e.preventDefault();
    onResetSourceInfoTooltips();
    setIsVisible(!isVisible);
    setIsValid(true);
  }

  const btnCU = () => {
    console.log(name, email);
  }

  useEffect(() => {
    setInputValues({ name, email });
    setChangesInput({ name, email });
  }, [name, email]);

  useEffect(() => {
    if (
      inputValues.name === changesInput.name
      && inputValues.email === changesInput.email
    ) {
      setIsRedact(true);
    } else {
      setIsRedact(false);
    }
  }, [inputValues])

  useEffect(() => {
    if (sourceInfoTooltips.isSuccess) {
      setIsVisible(true);
    } 
  }, [sourceInfoTooltips]);

  return (
    <main className='profile'>

    <div className='profile__container'>
      <h1 className='profile__title'>{`Привет, ${name}!`}</h1>
      <form className='profile__form'
        onSubmit={handleSubmit}
        noValidate
      >
        <label
          className='profile__label'
          htmlFor="email">
          Имя
          <input
            placeholder='Введите имя'
            value={inputValues.name ?? ''}
            name='name'
            type="text"
            id='email'
            className='profile__input'
            onChange={handleChange}
            required />
          <span
            className='profile__error'>
            {errMessage.name}
          </span>
        </label>

        <div className='profile__line'></div>
        <label
          className='profile__label'
          htmlFor="name">
          E-mail
          <input
            placeholder='Введите e-mail'
            value={inputValues.email ?? ''}
            name='email'
            type="email"
            id='name'
            className='profile__input'
            onChange={handleChange}
            required />
          <span
            className='profile__error'>
            {errMessage.email}
          </span>
        </label>
        <span
          className={`profile__error-submit
            ${isVisible === false
              ? 'profile__error-submit_show'
              : ''}
          ${sourceInfoTooltips.isSuccess ? 'profile__error-submit_success' : ''}`}>
          {sourceInfoTooltips.message}
        </span>
        <button
          disabled={!isValid || onBlockedButton}
          className={`profile__btn-save
          ${isVisible === false
              ? 'profile__btn-save_show'
              : ''}`}>
          Сохранить
        </button>
      </form>
      <button
        disabled={isRedact || !isValid}
        onClick={handleRedact}
        className={`profile__btn-redact
            ${isVisible === true
            ? 'profile__btn-redact_show'
            : ''}
            links-hover`}>
        Редактировать
      </button>
      <Link
        to='/'
        className={`profile__link
        ${isVisible === true
            ? 'profile__link_show'
            : ''} links-hover`}
        onClick={onRemoveCookie}>
        Выйти из аккаунта
      </Link>
    </div>
  </main >
);
}

export default Profile;
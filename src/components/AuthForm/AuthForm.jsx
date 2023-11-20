import React from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ title,
  buttonText,
  authMessage,
  authLinkMessage,
  endpoint,
  onClickLogin,
  onSubmit,
  onDisabled,
  sourceInfoTooltips,
  onBlockedButton,
  onResetSourceInfoTooltips,
  ...props }) => {

  return (
    <>
      <h1 className='auth__title'>{title}</h1>
      <form className='auth__form'
        onSubmit={onSubmit}
        noValidate
      >
        {props.children}
        {sourceInfoTooltips.access ? <span
          className='auth__error'
        >{sourceInfoTooltips.message}</span> : ''}
        <button
          type='submit'
          className='auth__btn'
          disabled={!onDisabled || onBlockedButton}
          >{buttonText}</button>
      </form>
      <div className='auth__wrapper'>
        <p className='auth__paragraph'>{authMessage}<span className='auth__link'><Link
          to={endpoint}
          className='auth__link links-hover'
          onClick={onResetSourceInfoTooltips}
        >
          {authLinkMessage}
        </Link>
        </span>
        </p>
      </div>
    </>
  );
}

export default AuthForm;
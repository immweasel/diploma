import React from 'react';
import { REGEX_EMAIL } from '../../utils/constants';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import useValidationsForms from '../../hooks/useValidationsForms';
import './Login.css';

const Login = ({
  onLogin,
  sourceInfoTooltips,
  onBlockedButton,
  onResetSourceInfoTooltips }) => {

  const {
    inputValues,
    errMessage,
    isValid,
    handleChange } = useValidationsForms();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onLogin(inputValues);
    }
  }

  return (
    <main className='login auth'>
      <AuthForm
        title={'Рады видеть!'}
        buttonText={'Войти'}
        authMessage={'Ещё не зарегистрированы? '}
        authLinkMessage={'Регистрация'}
        endpoint={'/signup'}
        onClickLogin={handleSubmit}
        onBlockedButton={onBlockedButton}
        onResetSourceInfoTooltips={onResetSourceInfoTooltips}
        onDisabled={isValid}
        sourceInfoTooltips={sourceInfoTooltips}
      >
        <AuthInput
          inputType={'email'}
          placeholderInput={'Введите email'}
          labelName={'E-mail'}
          idInput={'email'}
          nameInput={'email'}
          onChange={handleChange}
          pattern={REGEX_EMAIL}
          inputValue={inputValues.email ?? ''}
          erorrMessage={errMessage.email ?? ''}
        />

        <AuthInput
          inputType={'password'}
          labelName={'Пароль'}
          placeholderInput={'Введите пароль'}
          idInput={'pwd'}
          nameInput={'password'}
          onChange={handleChange}
          minLength="6"
          inputValue={inputValues.password ?? ''}
          erorrMessage={errMessage.password ?? ''}
        />
      </AuthForm >
    </main >
  );
}

export default Login;
import React from 'react';
import { REGEX_EMAIL, REGEX_NAME } from '../../utils/constants';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import useValidationsForms from '../../hooks/useValidationsForms';

const Register = ({
  onRegister,
  sourceInfoTooltips,
  onBlockedButton,
  onResetSourceInfoTooltips }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegister(inputValues);
    }
  }

  const {
    inputValues,
    errMessage,
    isValid,
    handleChange,
  } = useValidationsForms();

  return (
    <main className='register auth'>
      <AuthForm
        title={'Добро пожаловать!'}
        buttonText={'Зарегистрироваться'}
        authMessage={'Уже зарегистрированы? '}
        authLinkMessage={'Войти'}
        endpoint={'/signin'}
        onSubmit={handleSubmit}
        onDisabled={isValid}
        sourceInfoTooltips={sourceInfoTooltips}
        onBlockedButton={onBlockedButton}
        onResetSourceInfoTooltips={onResetSourceInfoTooltips}
      >
        <AuthInput
          inputType={'text'}
          labelName={'Имя'}
          idInput={'name'}
          nameInput={'name'}
          placeholderInput={'Введите имя'}
          inptValue={inputValues.name ?? ''}
          erorrMessage={errMessage.name ?? ''}
          onChange={handleChange}
          pattern={REGEX_NAME}
        />

        <AuthInput
          inputType={'email'}
          labelName={'E-mail'}
          idInput={'email'}
          nameInput={'email'}
          placeholderInput={'Введите email'}
          inptValue={inputValues.email ?? ''}
          erorrMessage={errMessage.email ?? ''}
          onChange={handleChange}
          pattern={REGEX_EMAIL}
        />

        <AuthInput
          inputType={'password'}
          labelName={'Пароль'}
          idInput={'pwd'}
          nameInput={'password'}
          placeholderInput={'Введите пароль'}
          inptValue={inputValues.password ?? ''}
          erorrMessage={errMessage.password ?? ''}
          onChange={handleChange}
          minLength="6"
        />
      </AuthForm >
    </main >
  );
}
export default Register;
import React from 'react';
import './AuthInput.css';

const AuthInput = ({
  inputType,
  labelName,
  inputValue,
  idInput,
  nameInput,
  placeholderInput,
  erorrMessage,
  onChange,
  pattern,
  minLength,
  maxLength,
}) => {
  return (
    <label
      className='input-auth'
      htmlFor={idInput}>{labelName}
      <input
        type={inputType}
        placeholder={placeholderInput}
        name={nameInput}
        className={`input-auth__input ${erorrMessage === '' ? 'ПУСТО' : 'input-auth__input_type_error'}`}
        id={idInput}
        onChange={onChange}
        value={inputValue}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        required
      />
      <span
        className={`input-auth__error input-auth__error_${idInput}`}>{erorrMessage}</span>
    </label>
  );
}

export default AuthInput;
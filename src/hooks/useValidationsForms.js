import React from 'react';

const useValidationsForms = (values = {}) => {
  
  const [inputValues, setInputValues] = React.useState(values);
  const [errMessage, setErrMessage] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    setErrMessage({
      ...errMessage,
      [name]: e.target.validationMessage,
    });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = React.useCallback(() => {
    setInputValues({});
    setErrMessage({});
    setIsValid(false)
  }, []);

  return {
    inputValues,
    errMessage,
    isValid,
    handleChange,
    resetForm,
    setInputValues,
    setIsValid
  };
}

export default useValidationsForms;
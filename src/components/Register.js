import React from "react";
import {Link, useNavigate} from 'react-router-dom'
import useFormAndValidation from "./hooks/useFormAndValidation";
import * as auth from './Authorization'

export default function Register() {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const {password, email} = values;
    auth.register(password, email)
    .then(() => navigate('/sign-in', {replace: true}));
  }
    
  const navigate = useNavigate();

  return (
    <div className="enter">
      <h2 className="enter__heading">Регистрация</h2>
      <form className="form" name="register" noValidate>
        <input
          id="email"
          className={`enter__input ${!isValid ? "enter__input-error" : ""}`}
          required
          type="email"
          name="email"
          placeholder="Email"
          onInput={handleChange}
          value={values.email || ""}
        />
        <span className={`form__input-error ${!isValid ? "form__error_visible" : ""}`}>
          {!isValid ? errors.email : ""}
        </span>
        <input
          id="password"
          className={`enter__input ${!isValid ? "enter__input-error" : ""}`}
          required
          minLength="2"
          maxLength="40"
          type="password"
          name="password"
          placeholder="Пароль"
          onInput={handleChange}
          value={values.password || ""}
        />
        <span className={`form__input-error ${!isValid ? "form__error_visible" : ""}`}>
          {!isValid ? errors.password : ""}
        </span>
        <button className={`enter__submit ${!isValid ? 'enter__submit_type_disabled' : ''}`} 
                type="submit" onClick={handleSubmit}>
          Зарегистрироваться
        </button>
      </form>
      <p className="enter__question">
        Уже зарегистрированы?{" "}
        <a className="enter__question enter__link" href="#">
          Войти
        </a>
      </p>
    </div>
  );
}
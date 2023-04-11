import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import useFormAndValidation from "./hooks/useFormAndValidation";
import * as auth from './Authorization'
import Header from "./Header";

export default function Register({ onEnter, onHandleAttention }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const [submitButton, setSubmitButton] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    auth.register(email, password)
      .then(() => navigate('/sign-in', { replace: true }))
      .then(() => {
        onEnter(true);
        onHandleAttention(true);
      })
      .catch((err) => {
        onEnter(false);
        onHandleAttention(true);
        console.log(err);
      });
  };

  function handleSubmitButton(e) {
    if (e) {
      setSubmitButton(true);
    }
  };

  useEffect(() => {
    setSubmitButton(false);
  }, []);

  return (
    <>
      <Header link={'Войти'} />
      <div className="enter">
        <h2 className="enter__heading">Регистрация</h2>
        <form
          className="form"
          name="register"
          noValidate
        >
          <input
            id="email"
            className={
              `enter__input ${!isValid ? "enter__input-error" : ""}`
            }
            required
            type="email"
            name="email"
            placeholder="Email"
            onInput={handleChange}
            onChange={handleSubmitButton}
            value={values.email || ""}
          />
          <span className={
            `form__input-error ${!isValid ? "form__error_visible" : ""}`
          }>
            {!isValid ? errors.email : ""}
          </span>
          <input
            id="password"
            className={
              `enter__input ${!isValid ? "enter__input-error" : ""}`
            }
            required
            minLength="2"
            maxLength="40"
            type="password"
            name="password"
            placeholder="Пароль"
            onInput={handleChange}
            onChange={handleSubmitButton}
            value={values.password || ""}
          />
          <span className={
            `form__input-error ${!isValid ? "form__error_visible" : ""}`
          }>
            {!isValid ? errors.password : ""}
          </span>
          <button
            className={
              `enter__submit ${!isValid || !submitButton
                ? 'enter__submit_type_disabled'
                : ''}`
            }
            type="submit"
            onClick={handleSubmit}>
            Зарегистрироваться
          </button>
        </form>
        <p className="enter__question">
          Уже зарегистрированы?{" "}
          <Link
            to='/sign-in'
            className="enter__question enter__link"
          >
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}
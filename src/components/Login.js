import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import useFormAndValidation from "./hooks/useFormAndValidation";
import * as auth from '../utils/authorization'
import Header from "./Header";

export default function Login({ handleLogin, setEmail, onEnter, onHandleAttention }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const [submitButton, setSubmitButton] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          resetForm();
          handleLogin(true);
          setEmail(email);
          navigate('/main', { replace: true });
        }
      })
      .catch((err) => {
        onEnter(false);
        onHandleAttention(true);
        console.log(err);
      });
  }

  function handleSubmitButton(e) {
    if (e) {
      setSubmitButton(true)
    }
  }

  useEffect(() => {
    setSubmitButton(false)
  }, [])

  return (
    <>
      <Header link={'Регистрация'} />
      <div className="enter">
        <h2 className="enter__heading">Вход</h2>
        <form
          className="form"
          name="register"
          noValidate
        >
          <input
            className={`enter__input ${!isValid ? "enter__input-error" : ""}`}
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
            onClick={handleSubmit}
          >
            Войти
          </button>
        </form>
      </div>
    </>
  );
}



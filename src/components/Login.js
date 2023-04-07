import React from "react";
import {Link, useNavigate} from 'react-router-dom'
import useFormAndValidation from "./hooks/useFormAndValidation";
import * as auth from './Authorization'
import Header from "./Header";

export default function Login({handleLogin, setEmail}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
      useFormAndValidation();
  
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const {email, password} = values;
    auth.authorize(email, password)
      .then((data) => { 
        if (data.token) {
          resetForm();
          handleLogin(true);
          setEmail(email)
          navigate('/main', {replace:true})}})
      
      .catch(err => console.log(err));
  }

  return (
    <>
    <Header link={'Регистрация'}/>      
    <div className="enter">
      <h2 className="enter__heading">Вход</h2>
      <form className="form" name="register" noValidate>
        <input
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
          Войти
        </button>
      </form>
    </div>
    </>
  );
}



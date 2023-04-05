import React from "react";

function Register() {
  return (
    <div className="enter">
      <h2 className="enter__heading">Регистрация</h2>
      <form className="form" name="register" noValidate>
        <input
          className="enter__input"
          required
          type="email"
          name="email"
          placeholder="Email"
        />
        <span className="form__input-error"></span>
        <input
          className="enter__input"
          required
          type="password"
          name="password"
          placeholder="Пароль"
        />
        <span className="form__input-error"></span>
        <button className="enter__submit" type="submit">
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

export default Register;

import React from "react";

function Login() {
  return (
    <div className="enter">
      <h2 className="enter__heading">Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;

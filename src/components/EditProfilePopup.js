import React, { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormAndValidation from "./hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const config = {
    inputName: "form__item form__item_type_name",
    spanName: "name-input-error form__input-error",
    inputDescription: "form__item form__item_type_activity",
    spanDescription: "activity-input-error form__input-error",
    inputError: "form__input_type_error",
    errorClass: "form__error_visible",
  };

  useEffect(() => {
    resetForm();
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      submit={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validForm={isValid}
    >
      <input
        className={`${config.inputName} ${!isValid ? config.inputError : ""}`}
        required
        minLength="2"
        maxLength="40"
        type="text"
        name="name"
        placeholder="Имя Фамилия"
        id="name-input"
        value={values.name || ""}
        onInput={handleChange}
      />
      <span
        className={`${config.spanName} ${!isValid ? config.errorClass : ""}`}
      >
        {!isValid ? errors.name : ""}
      </span>
      <input
        className={`${config.inputDescription} ${
          !isValid ? config.inputError : ""
        }`}
        required
        minLength="2"
        maxLength="200"
        type="text"
        name="about"
        placeholder="Вид деятельности"
        id="activity-input"
        value={values.about || ""}
        onInput={handleChange}
      />
      <span
        className={`${config.spanDescription} ${
          !isValid ? config.errorClass : ""
        }`}
      >
        {!isValid ? errors.about : ""}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

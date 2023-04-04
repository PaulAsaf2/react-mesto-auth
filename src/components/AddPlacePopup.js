import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "./hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  const config = {
    inputTitle: "form__item form__item_type_card-title",
    spanTitle: "card-title-input-error form__input-error",
    inputLink: "form__item form__item_type_link",
    spanLink: "card-link-input-error form__input-error",
    inputError: "form__input_type_error",
    errorClass: "form__error_visible",
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      submit={isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validForm={isValid}
    >
      <input
        className={`${config.inputTitle} ${!isValid ? config.inputError : ""}`}
        required
        minLength="2"
        maxLength="30"
        type="text"
        name="name"
        placeholder="Название"
        id="card-title-input"
        onInput={handleChange}
        value={values.name || ""}
      />
      <span
        className={`${config.spanTitle} ${!isValid ? config.errorClass : ""}`}
      >
        {!isValid ? errors.name : ""}
      </span>
      <input
        className={`${config.inputLink} ${!isValid ? config.inputError : ""}`}
        required
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        id="card-link-input"
        onInput={handleChange}
        value={values.link || ""}
      />
      <span
        className={`${config.spanLink} ${!isValid ? config.errorClass : ""}`}
      >
        {!isValid ? errors.link : ""}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "./hooks/useFormAndValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const config = {
    inputLink: "form__item form__item_type_avatar-link",
    spanLink: "avatar-link-input-error form__input-error",
    inputError: "form__input_type_error",
    errorClass: "form__error_visible",
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values);
  }

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submit={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validForm={isValid}
    >
      <input
        className={`${config.inputLink} ${!isValid ? config.inputError : ""}`}
        required
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        id="avatar-link-input"
        value={values.avatar || ""}
        onInput={handleChange}
      />
      <span
        className={`${config.spanLink} ${!isValid ? config.errorClass : ""}`}
      >
        {!isValid ? errors.avatar : ""}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

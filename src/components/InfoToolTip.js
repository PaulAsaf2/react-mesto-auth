import React from "react";
import succes from "../images/succes.svg";

function InfoToolTip() {
  return (
    <div className="popup">
      <div className="popup__container">
        <button
          // onClick={onClose}
          className="popup__close"
          type="button"
        ></button>
        <img className="enter__iqon" src={succes} />
        <h2 className="enter__title">Вы успешно зарегистрировались!</h2>
      </div>
    </div>
  );
}

export default InfoToolTip;

import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "../index.css";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext, CardsContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from './Authorization'
import PageNotFound from "./PageNotFound";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isEnterPopupOpen, setIsEnterPopupOpen] = useState(false);
  const [isCardIdForDelete, setIsCardIdForDelete] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('')
  const [enter, setEnter] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        auth.getContent(token)
          .then((res) => {
            if (res) {
              setEmail(res.data.email)
              setLoggedIn(true);
              navigate('/main', { replace: true })
            }
          })
      }
    }
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleDeleteCardClick(cardId) {
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
    setIsCardIdForDelete(cardId);
  }

  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // закрытие попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsEnterPopupOpen(false);
  };

  const isOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isDeleteCardPopupOpen ||
    selectedCard.link;

  // закрытие по клику вне формы
  useEffect(() => {
    function closeByClickOutside(evt) {
      evt.target === evt.currentTarget && closeAllPopups();
    }
    if (isOpen) {
      const popup = document.querySelectorAll(".popup");
      popup.forEach((item) => {
        item.addEventListener("click", closeByClickOutside);
      });
    }
  }, [isOpen]);

  // закрытие по клавише Escape
  useEffect(() => {
    function closeByEscape(evt) {
      evt.key === "Escape" && closeAllPopups();
    }
    if (isOpen) {
      document.addEventListener("keyup", closeByEscape);
      return () => {
        document.removeEventListener("keyup", closeByEscape);
      };
    }
  }, [isOpen]);

  // получение с сервера данных пользователя и карточек
  useEffect(() => {
    Promise.all([api.getProfileData(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  // изменение данных пользователя
  const [currentUser, setCurrentUser] = useState({});

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api
      .setProfileData(userData)
      .then((res) => setCurrentUser(res))
      .then(closeAllPopups)
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // изменение аватара
  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api
      .setAvatar(link)
      .then((res) => setCurrentUser(res))
      .then(closeAllPopups)
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const [cards, setCards] = useState([]);

  // добавление карточки
  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    api
      .createCard(cardData)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(closeAllPopups)
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // удаление карточки
  function handleCardDelete(id) {
    setIsLoading(true);
    api
      .deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== id));
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // обработка лайков
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="root">
      <div className="container">
        <CurrentUserContext.Provider value={currentUser}>
          <CardsContext.Provider value={cards}>
            <Routes>
              <Route
                path="/"
                element={
                  <Navigate to={loggedIn ? "/main" : "/sign-in"} replace />
                }
              />
              <Route
                path="/main"
                element={
                  <ProtectedRoute
                    element={Main}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    isOpenDeleteCardPopup={handleDeleteCardClick}
                    loggedIn={loggedIn}
                    email={email}
                    onLoggin={setLoggedIn}
                  />
                }
              />
              <Route
                path="/sign-up"
                element={
                  <Register
                    onEnter={setEnter}
                    onHandleAttention={setIsEnterPopupOpen}
                  />
                }
              />
              <Route
                path="/sign-in"
                element={
                  <Login
                    handleLogin={setLoggedIn}
                    setEmail={setEmail}
                    onEnter={setEnter}
                    onHandleAttention={setIsEnterPopupOpen}
                  />
                }
              />
              <Route
                path="*"
                element={<PageNotFound />}
              />
            </Routes>

            {loggedIn && <Footer />}

            <InfoToolTip
              isOpen={isEnterPopupOpen}
              onClose={closeAllPopups}
              enter={enter}
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              isLoading={isLoading}
            />
            <DeleteCardPopup
              isOpen={isDeleteCardPopupOpen}
              onClose={closeAllPopups}
              cardId={isCardIdForDelete}
              onCardDelete={handleCardDelete}
              isLoading={isLoading}
            />
            <ImagePopup
              name="image"
              card={selectedCard}
              onClose={closeAllPopups}
            />
          </CardsContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;

import './index.css';
import { initialCards } from './components/cards.js';
import { createCard } from './components/card.js';
import { openModal, closeModal, setOverlayCloseListeners } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getUserInfo,
  getInitialCards,
  editProfile,
  updateUserAvatar,
  createNewCard,
} from './components/api.js';

//Поиск DOM-элементов на странице
// Элементы попапов
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');

// Элементы контента в попапе изображения
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

// Кнопки открытия попапов
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');

// Закрытие попапов
const closeButtons = document.querySelectorAll('.popup__close');

// Контейнер карточек
const placesList = document.querySelector('.places__list');

// Форма редактирования профиля
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileSubmitButton = profileForm.querySelector('.popup__button');

// Форма новой карточки
const cardForm = document.forms['new-place'];
const placeInput = cardForm.elements['place-name'];
const linkInput = cardForm.elements.link;
const cardSubmitButton = cardForm.querySelector('.popup__button');

// Форма изменения аватара
const avatarForm = document.forms['edit-avatar'];
const avatarInput = avatarForm.querySelector('.popup__input_type_url');
const avatarSubmitButton = avatarForm.querySelector('.popup__button');

// Конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Переменная ID пользователя
let userId;

// Активация валидации
enableValidation(validationConfig);

// Функция отображения состояния загрузки
function renderLoading(popupSubmit, isLoading) {
  popupSubmit.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

// Открытие попапа с изображением
function handleCardClick({name, link}) {
  imagePopupImg.src = link;
  imagePopupImg.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(profileSubmitButton, true);

  editProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(profilePopup);
    })
    .catch(console.error)
    .finally(() => renderLoading(profileSubmitButton, false));
}

// Обработчик формы новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(cardSubmitButton, true);

  createNewCard(placeInput.value, linkInput.value)
    .then((res) => {
      const card = createCard(
        res,
        handleCardClick,
        handleDeleteCard,
        handleLikeCard,
        userId
      );
      placesList.prepend(card);
      cardForm.reset();
      closeModal(cardPopup);
    })
    .catch(console.error)
    .finally(() => renderLoading(cardSubmitButton, false));
}

// Обработчик формы аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(avatarSubmitButton, true);

  updateUserAvatar(avatarInput.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      avatarForm.reset();
      closeModal(avatarPopup);
    })
    .catch(console.error)
    .finally(() => renderLoading(avatarSubmitButton, false));
}

// Обработчик лайка
function handleLikeCard(button) {
  button.classList.toggle('card__like-button_is-active');
}

// Обработчик удаления карточки
function handleDeleteCard(cardElement) {
  cardElement.remove();
}

// Открытие формы редактирования профиля
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profilePopup, validationConfig);
  openModal(profilePopup);
});

// Открытие формы добавления карточки
addCardButton.addEventListener('click', () => {
  cardForm.reset();
  clearValidation(cardPopup, validationConfig);
  openModal(cardPopup);
});

// Открытие формы аватара
profileImage.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarPopup, validationConfig);
  openModal(avatarPopup);
});

// Установка обработчиков форм
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

// Обработчики кнопок-крестиков
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
});

// Установка обработчиков закрытия по оверлею
setOverlayCloseListeners([profilePopup, cardPopup, imagePopup]);

// Добавление начальных карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`; 

    initialCards.forEach((cardData) => {
    const card = createCard(cardData, handleCardClick, handleDeleteCard, handleLikeCard, userId);
    placesList.append(card);
    });
  })
  .catch(console.error);








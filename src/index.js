import './index.css';
import { initialCards } from './components/cards.js';
import { createCard, handleLikeClick, handleDeleteCard } from './components/card.js';
import { openModal, closeModal, setModalListeners } from './components/modal.js';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

//Поиск DOM-элементов на странице

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const placesList = document.querySelector('.places__list');

const formElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// @todo: Функция создания карточки

function createCard(cardData, handleDelete) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
  
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
  
    deleteButton.addEventListener('click', () => {
      handleDelete(cardElement);
    });
  
    return cardElement;
  }

// Открытие попапа с изображением
function handleCardClick(name, link) {
  imagePopupImg.src = link;
  imagePopupImg.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

// Добавление начальных карточек
initialCards.forEach(({ name, link }) => {
  const card = createCard(name, link, handleCardClick);
  placesList.append(card);
});

// Открытие формы профиля
profileEditButton.addEventListener('click', () => {
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(profilePopup);
});

// Открытие формы добавления карточки
addCardButton.addEventListener('click', () => {
  cardForm.reset();
  openModal(cardPopup);
});

// Форма редактирования профиля

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  const popup = document.querySelector('.popup_type_edit');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

formElement.addEventListener('submit', handleFormSubmit);

// Форма новой карточки
const cardForm = document.querySelector('.popup_type_new-card .popup__form');
const placeInput = cardForm.querySelector('.popup__input_type_card-name');
const linkInput = cardForm.querySelector('.popup__input_type_url');

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  const newCard = createCard(name, link, handleCardClick);
  placesList.prepend(newCard);
  cardForm.reset();
  closeModal(cardPopup);
});

// Установка обработчиков закрытия по оверлею
[profilePopup, cardPopup, imagePopup].forEach(setOverlayClose);
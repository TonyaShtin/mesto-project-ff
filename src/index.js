import './index.css';
import { initialCards } from './components/cards.js';
import { createCard } from './components/card.js';
import { openModal, closeModal, setOverlayCloseListeners } from './components/modal.js';

//Поиск DOM-элементов на странице

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

const placesList = document.querySelector('.places__list');

const profileForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


// Открытие попапа с изображением

function handleCardClick({name, link}) {
  imagePopupImg.src = link;
  imagePopupImg.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

// Добавление начальных карточек

initialCards.forEach((cardData) => {
  const card = createCard(cardData, handleCardClick, handleDeleteCard, handleLikeCard);
  placesList.append(card);
});


// Открытие формы редактирования профиля
profileEditButton.addEventListener('click', () => {
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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(profilePopup);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Форма новой карточки
const cardForm = document.querySelector('.popup_type_new-card .popup__form');
const placeInput = cardForm.querySelector('.popup__input_type_card-name');
const linkInput = cardForm.querySelector('.popup__input_type_url');

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  const newCard = createCard({name, link}, handleCardClick, handleDeleteCard, handleLikeCard);
  placesList.prepend(newCard);
  closeModal(cardPopup);
});

// Обработчик удаления карточки
function handleDeleteCard(cardElement) {
  cardElement.remove();
}

// Обработчик лайка
function handleLikeCard(button) {
  button.classList.toggle('card__like-button_is-active');
}

// Обработчики кнопок-крестиков
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
});

// Установка обработчиков закрытия по оверлею
setOverlayCloseListeners([profilePopup, cardPopup, imagePopup]);
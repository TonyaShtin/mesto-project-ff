//Функции для работы с карточками

import { removeCard, likeCard, unLikeCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(
  cardData,
  handleCardClick,
  handleDeleteCard,
  handleLikeCard,
  userId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  // Слушатель на изображение
  cardImage.addEventListener("click", () => {
    handleCardClick(cardData);
  });

  // Проверяем владельца карточки
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", (evt) => {
      handleDeleteCard(evt, cardData._id);
    });
  } else {
    deleteButton.remove();
  }

  // Проверяем, лайкал ли пользователь
  const isUserLike = cardData.likes.some((user) => user._id === userId);
  if (isUserLike) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", (evt) => {
    handleLikeCard(evt, cardData._id, likeCounter);
  });

  return cardElement;
}

// Обработчик удаления карточки
function handleDeleteCard(evt, cardId) {
  const card = evt.target.closest(".card");
  removeCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => console.log("Ошибка при удалении карточки:", err));
}

// Обработчик лайка/дизлайка карточки
function handleLikeCard(evt, cardId, likeCounter) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  const toggleLike = isLiked ? unLikeCard : likeCard;

  toggleLike(cardId)
    .then((res) => {
      likeButton.classList.toggle("card__like-button_is-active", !isLiked);
      likeCounter.textContent = res.likes.length;
    })
    .catch((err) => console.log("Ошибка при обработке лайка:", err));
}

export { handleDeleteCard, handleLikeCard };

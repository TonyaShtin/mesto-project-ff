//Функции для работы с карточками

// Функция создания карточки
export function createCard(cardData, handleCardClick, handleDeleteCard, handleLikeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Слушатель на изображение
  cardImage.addEventListener('click', () => {
    handleCardClick(cardData);
  });

  // Слушатель лайка
  likeButton.addEventListener('click', () => {
  handleLikeCard(likeButton);
});


  // Слушатель удаления
  deleteButton.addEventListener('click', () => {
      handleDeleteCard(cardElement);
  });

  return cardElement;
}

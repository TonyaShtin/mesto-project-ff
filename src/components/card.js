//Функции для работы с карточками

// Функция создания карточки
export function createCard({ name, link }, handleCardClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener('click', toggleLike);
  deleteButton.addEventListener('click', () => cardElement.remove());
  cardImage.addEventListener('click', () => handleCardClick(name, link));

  return cardElement;
}

// Обработчик лайка
export function toggleLike(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

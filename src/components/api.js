const config = {
  baseUrl: `https://nomoreparties.co/v1/wff-cohort-39`,
  headers: {
    authorization: "59a07456-5df8-4c33-99c9-ed46c60a4ffb",
    "Content-Type": "application/json",
  },
};

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

// Получить информацию о пользователе
function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, 
    { headers: config.headers })
    .then((res) => handleResponse(res));
}

// Получить начальные карточки
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then((res) => handleResponse(res));
}

// Обновить данные профиля
function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  })
  .then((res) => handleResponse(res));
}

// Обновить аватар
function updateUserAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  })
  .then((res) => handleResponse(res));
}

// Создать новую карточку
function createNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  })
  .then((res) => handleResponse(res));
}

// Удалить карточку
function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then((res) => handleResponse(res));
}

// Поставить лайк карточке
function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then((res) => handleResponse(res));
}

// Удалить лайк с карточки
function unLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then((res) => handleResponse(res));
}

export {
  getUserInfo,
  getInitialCards,
  editProfile,
  updateUserAvatar,
  createNewCard,
  removeCard,
  likeCard,
  unLikeCard,
};
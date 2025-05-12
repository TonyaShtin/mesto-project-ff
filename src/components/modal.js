//Работа модальных окон

// Функция открытия модального окна
export function openModal(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия модального окна
export function closeModal(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Закрытие попапа клавишей Escape
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) closeModal(openedPopup);
  }
}

// Закрытие по клику на оверлей
export function setOverlayCloseListeners() {
  document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      }
    });
  });
}

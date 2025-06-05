//Работа модальных окон

// Функция открытия модального окна
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия модального окна
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Закрытие на крестики
export function setCloseButtonListeners() {
  document.querySelectorAll('.popup__close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const popup = closeBtn.closest('.popup');
      if (popup) closeModal(popup);
    });
  });
}

// Закрытие попапа клавишей Escape
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) closeModal(openedPopup);
  }
}

// Закрытие по клику на оверлей
export function setOverlayCloseListeners(popups) {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      }
    });
  });
}

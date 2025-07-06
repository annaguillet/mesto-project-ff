import { likeCard, unlikeCard } from './api.js';
import { popupConfirm, formConfirmDelete } from './constants.js';
import { openModal, closeModal } from './modal.js';
import { deleteCard as deleteCardApi } from './api.js';

// 👉 Добавьте переменные для хранения удаляемой карточки
let cardToDelete = null;
let cardElementToDelete = null;

export function createCard(cardData, { userId, handleDelete, handleLike, handleImageClick }, cardTemplate) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  // Активируем кнопку, если лайкнул текущий пользователь
  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Показываем кнопку удаления только для своих карточек
  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  }

  likeButton.addEventListener('click', () => handleLike(cardData, likeButton, likeCount, userId));
  deleteButton.addEventListener('click', () => handleDelete(cardData, cardElement));
  cardImage.addEventListener('click', () => handleImageClick(cardData));

  return cardElement;
}

// 🔨 Открываем попап и сохраняем данные карточки
export function deleteCard(cardData, cardElement) {
  cardToDelete = cardData;
  cardElementToDelete = cardElement;
  openModal(popupConfirm);
}

// ✅ Подтверждение удаления
formConfirmDelete.addEventListener('submit', (evt) => {
  evt.preventDefault();

  deleteCardApi(cardToDelete._id)
    .then(() => {
      cardElementToDelete.remove();
      closeModal(popupConfirm);
      cardToDelete = null;
      cardElementToDelete = null;
    })
    .catch(err => console.error(`Ошибка удаления карточки: ${err}`));
});

export function toggleLike(cardData, likeButton, likeCount, userId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  // Выбираем нужный метод API
  const likeRequest = isLiked ? unlikeCard : likeCard;

  likeRequest(cardData._id)
    .then((updatedCard) => {
      // Обновляем состояние кнопки в зависимости от того, есть ли лайк текущего пользователя
      const likedByUser = updatedCard.likes.some(user => user._id === userId);

      likeButton.classList.toggle('card__like-button_is-active', likedByUser);

      // Обновляем счётчик лайков
      likeCount.textContent = updatedCard.likes.length;

      // Обновляем объект карточки, чтобы сохранить актуальные данные
      cardData.likes = updatedCard.likes;
    })
    .catch((err) => {
      console.error(`Ошибка изменения лайка: ${err}`);
    });
}

import { likeCard, unlikeCard } from './api.js';

// card.js отвечает только за создание карточки и обработку лайков

export function createCard(cardData, { userId, handleDeleteClick, handleLikeClick, handleImageClick }, cardTemplate) {
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

  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  }

  likeButton.addEventListener('click', () => handleLikeClick(cardData, likeButton, likeCount, userId));
  deleteButton.addEventListener('click', () => handleDeleteClick(cardData, cardElement));
  cardImage.addEventListener('click', () => handleImageClick(cardData));

  return cardElement;
}

export function toggleLike(cardData, likeButton, likeCount, userId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeRequest = isLiked ? unlikeCard : likeCard;

  likeRequest(cardData._id)
    .then((updatedCard) => {
      const likedByUser = updatedCard.likes.some(user => user._id === userId);
      likeButton.classList.toggle('card__like-button_is-active', likedByUser);
      likeCount.textContent = updatedCard.likes.length;
      cardData.likes = updatedCard.likes;
    })
    .catch((err) => {
      console.error(`Ошибка изменения лайка: ${err}`);
    });
}
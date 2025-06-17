export function createCard(cardData, handlers, cardTemplate) {
  const { handleDelete, handleLike, handleImageClick } = handlers;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener('click', () => handleLike(likeButton));
  deleteButton.addEventListener('click', () => handleDelete(cardElement));
  cardImage.addEventListener('click', () => handleImageClick(cardData));

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function toggleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
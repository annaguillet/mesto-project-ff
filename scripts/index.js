// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardData, handleDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => {
    handleDelete(cardElement);
  });

  return cardElement;
}


// @todo: Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, deleteCard);
  placesContainer.append(cardElement);
});


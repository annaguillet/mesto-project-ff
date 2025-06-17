import '../pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, toggleLike } from './components/card.js';
import { openModal, closeModal, setModalListeners } from './components/modal.js';
import {
  cardTemplate, placesContainer, profileImage, profileName, profileJob,
  editButton, addButton, popupEdit, popupAdd, popupImage,
  popups, closeButtons, formEditProfile, formNewPlace,
  nameInput, jobInput, placeNameInput, placeLinkInput,
  popupImageElement, popupCaptionElement
} from './components/constants.js';

// Инициализация модальных окон
setModalListeners(popups, closeButtons);

// Обработчики карточек
const cardHandlers = {
  handleDelete: deleteCard,
  handleLike: toggleLike,
  handleImageClick: (cardData) => {
    popupImageElement.src = cardData.link;
    popupImageElement.alt = cardData.name;
    popupCaptionElement.textContent = cardData.name;
    openModal(popupImage);
  }
};

// Добавление начальных карточек
initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, cardHandlers, cardTemplate);
  placesContainer.append(cardElement);
});

// Обработчики открытия попапов
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupEdit);
});

addButton.addEventListener('click', () => openModal(popupAdd));

// Обработчики форм
formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupEdit);
});

formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const newCard = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };

  const cardElement = createCard(newCard, cardHandlers, cardTemplate);
  placesContainer.prepend(cardElement);
  closeModal(popupAdd);
  formNewPlace.reset();
});
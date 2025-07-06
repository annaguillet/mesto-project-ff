import '../pages/index.css';
import { createCard, toggleLike } from './components/card.js';
import { openModal, closeModal, setModalListeners } from './components/modal.js';
import {
  cardTemplate, placesContainer, profileImage, profileName, profileJob,
  editButton, addButton, popupEdit, popupAdd, popupImage,
  popups, closeButtons, formEditProfile, formNewPlace,
  nameInput, jobInput, placeNameInput, placeLinkInput,
  popupImageElement, popupCaptionElement, popupAvatar, formAvatar, avatarInput, avatarEditButton,
  popupConfirm, formConfirmDelete
} from './components/constants.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, addCard, editProfile, updateAvatar, deleteCard as deleteCardApi } from './components/api.js';
import { renderLoading } from './components/utils.js';
import logoPath from '../images/logo.svg';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const logo = document.querySelector('.header__logo');
logo.src = logoPath;

const profileSubmitButton = formEditProfile.querySelector('.popup__button');
const placeSubmitButton = formNewPlace.querySelector('.popup__button');
const avatarSubmitButton = formAvatar.querySelector('.popup__button');

function openImageModal(cardData) {
  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
  popupCaptionElement.textContent = cardData.name;
  openModal(popupImage);
}

avatarEditButton.addEventListener('click', () => {
  formAvatar.reset();
  clearValidation(formAvatar, validationConfig);
  openModal(popupAvatar);
});

let userId;
let cardToDelete = null;
let elementToDelete = null;

function handleDeleteClick(cardData, cardElement) {
  cardToDelete = cardData;
  elementToDelete = cardElement;
  openModal(popupConfirm);
}

formConfirmDelete.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deleteCardApi(cardToDelete._id)
    .then(() => {
      elementToDelete.remove();
      closeModal(popupConfirm);
    })
    .catch(err => console.error(`Ошибка удаления карточки: ${err}`))
    .finally(() => {
      cardToDelete = null;
      elementToDelete = null;
    });
});

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    profileImage.alt = userData.name;
    userId = userData._id;

    cards.forEach(cardData => {
      const cardElement = createCard(cardData, {
        userId,
        handleDeleteClick,
        handleLikeClick: toggleLike,
        handleImageClick: openImageModal
      }, cardTemplate);
      placesContainer.append(cardElement);
    });
  })
  .catch(err => console.error(`Ошибка загрузки данных: ${err}`));

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEdit);
});

addButton.addEventListener('click', () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openModal(popupAdd);
});

formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, profileSubmitButton);

  editProfile(nameInput.value, jobInput.value)
    .then(userData => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      closeModal(popupEdit);
    })
    .catch(err => console.error(`Ошибка обновления профиля: ${err}`))
    .finally(() => renderLoading(false, profileSubmitButton));
});

formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, placeSubmitButton);

  addCard(placeNameInput.value, placeLinkInput.value)
    .then(newCardData => {
      const cardElement = createCard(newCardData, {
        userId,
        handleDeleteClick,
        handleLikeClick: toggleLike,
        handleImageClick: openImageModal
      }, cardTemplate);

      placesContainer.prepend(cardElement);
      closeModal(popupAdd);
      formNewPlace.reset();
      clearValidation(formNewPlace, validationConfig);
    })
    .catch(err => console.error(`Ошибка добавления карточки: ${err}`))
    .finally(() => renderLoading(false, placeSubmitButton));
});

formAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, avatarSubmitButton);

  updateAvatar(avatarInput.value)
    .then(userData => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(popupAvatar);
      formAvatar.reset();
    })
    .catch(err => console.error(`Ошибка обновления аватара: ${err}`))
    .finally(() => renderLoading(false, avatarSubmitButton));
});

enableValidation(validationConfig);
setModalListeners(popups, closeButtons);

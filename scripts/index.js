import '../pages/index.css';
import { createCard, deleteCard, toggleLike } from './components/card.js';
import { openModal, closeModal, setModalListeners } from './components/modal.js';
import {
  cardTemplate, placesContainer, profileImage, profileName, profileJob,
  editButton, addButton, popupEdit, popupAdd, popupImage,
  popups, closeButtons, formEditProfile, formNewPlace,
  nameInput, jobInput, placeNameInput, placeLinkInput,
  popupImageElement, popupCaptionElement
} from './components/constants.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, addCard, editProfile } from './components/api.js';
import { popupAvatar, formAvatar, avatarInput } from './components/constants.js';
import { updateAvatar } from './components/api.js';
import { avatarEditButton } from './components/constants.js';
import { renderLoading } from './components/utils.js';

avatarEditButton.addEventListener('click', () => {
  formAvatar.reset();
  clearValidation(formAvatar, validationConfig);
  openModal(popupAvatar);
});

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};  

let userId;

// Загрузка пользователя и карточек одновременно
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    // 1. Заполняем профиль
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.src = userData.avatar;
    profileImage.alt = userData.name;
    userId = userData._id;

    // 2. Добавляем карточки
    cards.forEach(cardData => {
      const cardElement = createCard(cardData, {
        userId,
        handleDelete: deleteCard,
        handleLike: toggleLike,
        handleImageClick: (cardData) => {
          popupImageElement.src = cardData.link;
          popupImageElement.alt = cardData.name;
          popupCaptionElement.textContent = cardData.name;
          openModal(popupImage);
        }
      }, cardTemplate);
      placesContainer.append(cardElement);
    });
  })
  .catch(err => {
    console.error(`Ошибка загрузки данных: ${err}`);
  });

// Открытие попапа профиля
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEdit);
});

// Открытие попапа новой карточки
addButton.addEventListener('click', () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openModal(popupAdd);
});

// Сохранение профиля
formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = formEditProfile.querySelector('.popup__button');
  renderLoading(true, submitButton);

  editProfile(nameInput.value, jobInput.value)
    .then(userData => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      closeModal(popupEdit);
    })
    .catch(err => console.error(`Ошибка обновления профиля: ${err}`))
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

// Добавление новой карточки
formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = formNewPlace.querySelector('.popup__button');
  renderLoading(true, submitButton);

  addCard(placeNameInput.value, placeLinkInput.value)
    .then(newCardData => {
      const cardElement = createCard(newCardData, {
        userId,
        handleDelete: deleteCard,
        handleLike: toggleLike,
        handleImageClick: (cardData) => {
          popupImageElement.src = cardData.link;
          popupImageElement.alt = cardData.name;
          popupCaptionElement.textContent = cardData.name;
          openModal(popupImage);
        }
      }, cardTemplate);

      placesContainer.prepend(cardElement);
      closeModal(popupAdd);
      formNewPlace.reset();
      clearValidation(formNewPlace, validationConfig);
    })
    .catch(err => {
      console.error(`Ошибка добавления карточки: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

formAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = formAvatar.querySelector('.popup__button');
  renderLoading(true, submitButton);

  updateAvatar(avatarInput.value)
    .then(userData => {
      profileImage.src = userData.avatar;
      profileImage.alt = userData.name;
      closeModal(popupAvatar);
      formAvatar.reset();
    })
    .catch(err => console.error(`Ошибка обновления аватара: ${err}`))
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

enableValidation(validationConfig);
setModalListeners(popups, closeButtons);

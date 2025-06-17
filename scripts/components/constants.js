// DOM элементы
export const cardTemplate = document.querySelector('#card-template').content;
export const placesContainer = document.querySelector('.places__list');

// Элементы профиля
export const profileImage = document.querySelector('.profile__image');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__description');

// Кнопки
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

// Попапы
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');
export const popups = document.querySelectorAll('.popup');
export const closeButtons = document.querySelectorAll('.popup__close');

// Формы
export const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
export const formNewPlace = document.querySelector('.popup__form[name="new-place"]');

// Поля ввода
export const nameInput = formEditProfile.querySelector('.popup__input_type_name');
export const jobInput = formEditProfile.querySelector('.popup__input_type_description');
export const placeNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
export const placeLinkInput = formNewPlace.querySelector('.popup__input_type_url');

// Элементы попапа изображения
export const popupImageElement = popupImage.querySelector('.popup__image');
export const popupCaptionElement = popupImage.querySelector('.popup__caption');
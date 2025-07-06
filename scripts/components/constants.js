// DOM элементы
export const cardTemplate = document.querySelector('#card-template').content;
export const placesContainer = document.querySelector('.places__list');

// Элементы профиля
export const profileImage = document.querySelector('.profile__image');
export const profileAvatar = document.querySelector('.profile__image');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__description');

// Кнопки
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const avatarEditButton = document.querySelector('.profile__avatar-edit');

// Попапы
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');
export const popups = document.querySelectorAll('.popup');
export const closeButtons = document.querySelectorAll('.popup__close');
export const popupConfirm = document.querySelector('.popup_type_confirm');
export const formConfirmDelete = popupConfirm.querySelector('.popup__form');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const formAvatar = popupAvatar.querySelector('.popup__form');
export const avatarInput = popupAvatar.querySelector('.popup__input_type_avatar-url');

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
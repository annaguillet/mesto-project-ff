// Показать ошибку
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// Скрыть ошибку
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

// Проверить валидность одного поля
function checkInputValidity(formElement, inputElement, config) {
  const value = inputElement.value.trim();
  const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
  const isTouched = inputElement.dataset.touched === 'true';

  if (!value) {
    if (isTouched) { // показываем ошибку только если поле уже трогали
      showInputError(formElement, inputElement, 'Это поле обязательно для заполнения.', config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
    return false;
  }

  if (inputElement.name === 'name' || inputElement.name === 'place-name') {
    if (value.length < inputElement.minLength || value.length > inputElement.maxLength) {
      if (isTouched) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
      }
      return false;
    }

    if (!nameRegex.test(value)) {
      const message = inputElement.dataset.errorMessage || 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
      if (isTouched) {
        showInputError(formElement, inputElement, message, config);
      }
      return false;
    }
  }

  if (inputElement.type === 'url' && !inputElement.validity.valid) {
    if (isTouched) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    }
    return false;
  }

  hideInputError(formElement, inputElement, config);
  return true;
}

// Переключить состояние кнопки
function toggleButtonState(inputList, buttonElement, formElement, config) {
  const hasInvalidInput = inputList.some(input => !checkInputValidity(formElement, input, config));

  if (hasInvalidInput) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Установить обработчики для формы
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => {

    inputElement.addEventListener('focus', () => {
      inputElement.dataset.touched = 'true'; // пометили как "тронутое"
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, formElement, config);
    });
    
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, formElement, config);
    });

    inputElement.addEventListener('blur', () => {
      inputElement.dataset.touched = 'true';
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, formElement, config);
    });
  });

  toggleButtonState(inputList, buttonElement, formElement, config);
}

// Инициализация всех форм
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, config);
  });
}

// Очистка ошибок и деактивация кнопки
function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, config);
    inputElement.removeAttribute('data-touched');
  });

  toggleButtonState(inputList, buttonElement, formElement, config);
}

function renderLoading(isLoading, buttonElement, defaultText = 'Сохранить') {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = defaultText;
  }
}

export { enableValidation, clearValidation };

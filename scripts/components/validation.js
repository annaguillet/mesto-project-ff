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
  const isTouched = inputElement.dataset.touched === 'true';
  const validity = inputElement.validity;

  if (!isTouched) {
    hideInputError(formElement, inputElement, config);
    return validity.valid;
  }

  if (validity.valueMissing) {
    showInputError(formElement, inputElement, inputElement.dataset.errorMessageRequired || 'Это поле обязательно для заполнения.', config);
    return false;
  }

  if (validity.tooShort || validity.tooLong) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
    return false;
  }

  if (validity.typeMismatch || validity.patternMismatch) {
    showInputError(formElement, inputElement, inputElement.dataset.errorMessage || inputElement.validationMessage, config);
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
    inputElement.addEventListener('input', () => {
      inputElement.dataset.touched = 'true';
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

export { enableValidation, clearValidation };

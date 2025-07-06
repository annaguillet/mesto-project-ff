const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: '36df7d25-8398-4b9d-9968-59ab97912874',
    'Content-Type': 'application/json'
  }
};

// Универсальный обработчик ответа сервера
function request(endpoint, options) {
  return fetch(`${config.baseUrl}${endpoint}`, options)
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

// ---------- Пользователь ----------

// Получить данные пользователя
function getUserInfo() {
  return request('/users/me', { headers: config.headers });
}

// Обновить профиль
function editProfile(name, about) {
  return request('/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  });
}

// Обновить аватар
function updateAvatar(avatar) {
  return request('/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  });
}

// ---------- Карточки ----------

// Получить все карточки
function getInitialCards() {
  return request('/cards', { headers: config.headers });
}

// Добавить карточку
function addCard(name, link) {
  return request('/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  });
}

// Удалить карточку
function deleteCard(cardId) {
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

// Поставить лайк
function likeCard(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  });
}

// Убрать лайк
function unlikeCard(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

export {
  getUserInfo,
  editProfile,
  updateAvatar,
  getInitialCards,
  addCard,
  deleteCard,
  likeCard,
  unlikeCard
};
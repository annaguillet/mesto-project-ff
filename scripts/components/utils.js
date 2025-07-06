export function renderLoading(isLoading, buttonElement) {
  buttonElement.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}
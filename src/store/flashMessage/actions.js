export const FLASH_MESSAGE__CREATE = 'FLASH_MESSAGE__CREATE';
export const FLASH_MESSAGE__DELETE = 'FLASH_MESSAGE__DELETE';

const DEFAULT_ERROR_MESSAGE = 'Oops something went wrong!';

export function createErrorMessage(text = DEFAULT_ERROR_MESSAGE) {
  const message = { text, messageType: 'error' };
  return { type: FLASH_MESSAGE__CREATE, message };
}

export function createSuccessMessage(text) {
  const message = { text, messageType: 'success' };
  return { type: FLASH_MESSAGE__CREATE, message };
}
export function createWarningMessage(text) {
  const message = { text, messageType: 'warning' };
  return { type: FLASH_MESSAGE__CREATE, message };
}

export function deleteMessage() {
  return { type: FLASH_MESSAGE__DELETE };
}

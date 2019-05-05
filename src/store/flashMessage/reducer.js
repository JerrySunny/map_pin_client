import { FLASH_MESSAGE__CREATE, FLASH_MESSAGE__DELETE } from './actions';

const initialState = {
  message: {},
};

export default function flashMessage(state = initialState, action) {
  switch (action.type) {
    case FLASH_MESSAGE__CREATE:
      return Object.assign({}, state, {
        message: action.message,
      });
    case FLASH_MESSAGE__DELETE:
      return Object.assign({}, state, {
        message: {},
      });
    default:
      return state;
  }
}

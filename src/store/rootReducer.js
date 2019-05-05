import { combineReducers } from 'redux';
import markers from '../store/markers/reducer';
import flashMessage from '../store/flashMessage/reducer';

const root = combineReducers({
    flashMessage,
    markers,
});

export default root;
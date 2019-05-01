import { combineReducers } from 'redux';
import markers from '../store/markers/reducer';

const root = combineReducers({
    markers
});

export default root;
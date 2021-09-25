import userReducer from './users';
import { combineReducers } from 'redux';

export default combineReducers({
    user: userReducer,
});
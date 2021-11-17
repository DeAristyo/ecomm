import userReducer from './users';
import { combineReducers } from 'redux';
import cartReducer from './cart';

export default combineReducers({
	user: userReducer,
	cart: cartReducer,
});

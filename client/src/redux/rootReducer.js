import {combineReducers} from "redux";
import productsReducer from './products/reducer';
import userReducer from './user/reducer';
import { reducer as notifReducer } from 'redux-notifications';
export  const  rootReducer = combineReducers({
    products: productsReducer,
    userData: userReducer,
    notifs: notifReducer,
});

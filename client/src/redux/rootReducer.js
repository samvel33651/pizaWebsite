import {combineReducers} from "redux";
import productsReducer from './products/reducer';
import userReducer from './user/reducer';

export  const  rootReducer = combineReducers({
    products: productsReducer,
    userData: userReducer,
});

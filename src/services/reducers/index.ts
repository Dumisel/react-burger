import { combineReducers } from 'redux';
import ingredientsReducer from './ingredientsReducer'; 
import currentConstructorReducer from './currentConstructorReducer';
import ingredientReducer from './ingredientReducer';
import orderReducer  from './orderReducer';
import modalReducer  from './modalReducer';
import authReducer  from './authReducer';
import wsReducer  from './wsReducer';

const rootReducer = combineReducers({
  ingredientsReducer,
  currentConstructorReducer,
  ingredientReducer,
  orderReducer,
  modalReducer,
  authReducer,
  wsReducer
})

export default rootReducer;
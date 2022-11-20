import { TActions } from '../actions';

import {
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
  OPEN_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS
  } from '../constants/constants';


type TModalState = {
  isIngredientDetailsOpened: boolean;
  isOrderDetailsOpened: boolean;
}
const initialModalState: TModalState = {
  isIngredientDetailsOpened: false,
  isOrderDetailsOpened: false
}

export const modalReducer = (state = initialModalState, action: TActions) => {
  switch (action.type) {
    case (OPEN_INGREDIENT_DETAILS): {
      return { ...state, isIngredientDetailsOpened: true };
    }
    case (CLOSE_INGREDIENT_DETAILS): {
      return { ...state, isIngredientDetailsOpened: false };
    }
    case (OPEN_ORDER_DETAILS): {
      return { ...state, isOrderDetailsOpened: true };
    }
    case (CLOSE_ORDER_DETAILS): {
      return { ...state, isOrderDetailsOpened: false };
    }
    default: {
      return state;
    }
  }
}

export default modalReducer;
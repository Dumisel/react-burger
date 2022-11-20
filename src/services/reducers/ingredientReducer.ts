import { TActions } from '../actions';
import { TIngredient } from '../types/types';

import {
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA
  } from '../constants/constants';

type TInitialIngredientState = {
  ingredient: TIngredient | {}
}
const initialIngredientState: TInitialIngredientState = {
  ingredient: {}
}

export const ingredientReducer = (state = initialIngredientState, action: TActions) => {
  switch (action.type) {
    case ADD_INGREDIENT_DATA: {
      return {
        ...state,
        ingredient: action.item,
      };
    }
    case DELETE_INGREDIENT_DATA: {
      return {
        ...state,
        ingredient: {},
      };
    }
    default: {
      return state;
    }
  }
}

export default ingredientReducer;

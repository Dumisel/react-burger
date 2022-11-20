import { TActions } from '../actions';
import { TIngredient } from '../types/types';

import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_CONSTRUCTOR_ELEMENT,
  CLEAR_CURRENT_CONSTRUCTOR,
  } from '../constants/constants';

type TInitialConstructorState = {
  currentConstructor: ReadonlyArray<TIngredient>
}
const initialConstructorState: TInitialConstructorState = {
  currentConstructor: []
}

export const currentConstructorReducer = (state = initialConstructorState, action: TActions) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        currentConstructor: [...state.currentConstructor, action.payload]
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        currentConstructor: [...state.currentConstructor].filter((item, index) => index !== action.index),
      };
    }
    case MOVE_CONSTRUCTOR_ELEMENT: {
      return ({
        ...state,
        currentConstructor: action.payload,
      });
    }
    case CLEAR_CURRENT_CONSTRUCTOR: {
      return ({
        ...state,
        currentConstructor: [],
      });
    }
    default: {
      return state;
    }
  }
}

export default currentConstructorReducer;
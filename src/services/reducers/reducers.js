import { combineReducers } from 'redux';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_CONSTRUCTOR_ELEMENT,
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
  OPEN_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS
  } from '../actions/actions';

  const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
  
    currentConstructor: [],
  
    ingredient: {},
  
    order: {
      number: 0
    },
    orderRequest: false,
    orderFailed: false,

    isIngredientDetailsOpened: false,
    isOrderDetailsOpened: false
  };

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredients: [],
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        currentConstructor: [...state.currentConstructor, action.item]
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
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,
        orderFailed: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        order: {
          number: 0,
        },
        orderRequest: false,
        orderFailed: true,
      };
    }
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
};

const rootReducer = combineReducers({
  burger: burgerReducer
})

export default rootReducer;
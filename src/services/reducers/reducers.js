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
  CLOSE_ORDER_DETAILS,

  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  REQUEST_CODE_REQUEST,
  REQUEST_CODE_SUCCESS,
  REQUEST_CODE_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  } from '../actions/actions';

  const initialIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false
  };

  const initialConstructorState = {
    currentConstructor: []
  };

  const initialIngredientState = {
    ingredient: {}
  };

  const initialOrderState = {
    order: {
      number: null
    },
    orderRequest: false,
    orderFailed: false
  };

  const initialModalState = {
    isIngredientDetailsOpened: false,
    isOrderDetailsOpened: false
  };

  const initialAuthState = {
    user: {
      name: '',
      email: ''
    },
    isRegisterRequest: false,
    isRegisterFailed: false,
    isLoginRequest: false,
    isLoginFailed: false,
    isGetUserRequest: false,
    isGetUserFailed: false,
    isUpdateUserRequest: false,
    isUpdateUserFailed: false,
    isLogoutRequest: false,
    isLogoutFailed: false,
    isCodeRequest: false,
    isCodeRequestFailed: false,
    isResetRequest: false,
    isResetFailed: false,
    isTokenRequest: false,
    isTokenFailed: false,
    isAuth: false,
  };

export const ingredientsReducer = (state = initialIngredientsState, action) => {
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
    default: {
      return state;
    }
  }
};

export const currentConstructorReducer = (state = initialConstructorState, action) => {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
};

export const ingredientReducer = (state = initialIngredientState, action) => {
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
};

export const orderReducer = (state = initialOrderState, action) => {
  switch (action.type) {
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
          number: null,
        },
        orderRequest: false,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

export const modalReducer = (state = initialModalState, action) => {
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
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case (REGISTER_USER_REQUEST): {
      return { 
        ...state, 
        isRegisterRequest: true, 
        isRegisterFailed: false 
      };
    }
    case (REGISTER_USER_SUCCESS): {
      return {
        ...state,
        user: action.user,
        isRegisterRequest: false,
        isRegisterFailed: false,
        isAuth: true,
      };
    }
    case (REGISTER_USER_FAILED): {
      return { 
        ...state, 
        isRegisterRequest: false, 
        isRegisterFailed: true 
      };
    }
    case (LOGIN_USER_REQUEST): {
      return {
        ...state,
        isLoginRequest: true,
        isLoginFailed: false,
      };
    }
    case (LOGIN_USER_SUCCESS): {
      return {
        ...state,
        user: action.user,
        isLoginRequest: false,
        isLoginFailed: false,
        isAuth: true,
      };
    }
    case (LOGIN_USER_FAILED): {
      return {
        ...state,
        isLoginRequest: false,
        isLoginFailed: true,
      };
    }
    case (GET_USER_REQUEST): {
      return {
        ...state,
        isGetUserRequest: true,
        isGetUserFailed: false,
      };
    }
    case (GET_USER_SUCCESS): {
      return {
        ...state,
        user: action.user,
        isAuth: true,
        isGetUserRequest: false,
        isGetUserFailed: false,
      };
    }
    
    case (GET_USER_FAILED): {
      return {
        ...state,
        isGetUserRequest: false,
        isGetUserFailed: true,
      };
    }
    case (UPDATE_USER_REQUEST): {
      return {
        ...state,
        isUpdateUserRequest: true,
        isUpdateUserFailed: false,
      };
    }
    case (UPDATE_USER_SUCCESS): {
      return {
        ...state,
        user: action.user,
        isUpdateUserRequest: false,
        isUpdateUserFailed: false,
      };
    }
    case (UPDATE_USER_FAILED): {
      return {
        ...state,
        isUpdateUserRequest: false,
        isUpdateUserFailed: true,
      };
    }
    case (LOGOUT_REQUEST): {
      return {
        ...state,
        isLogoutRequest: true,
        isLogoutFailed: false,
      };
    }
    case (LOGOUT_SUCCESS): {
      return {
        ...state,
        isAuth: false,
        isLogoutRequest: false,
        isLogoutFailed: false,
      };
    }
    case (LOGOUT_FAILED): {
      return {
        ...state,
        isLogoutRequest: false,
        isLogoutFailed: true,
      };
    }
    
    case (REQUEST_CODE_REQUEST): {
      return {
        ...state,
        isCodeRequest: true,
        isCodeRequestFailed: false,
      };
    }
    case (REQUEST_CODE_SUCCESS): {
      return {
        ...state,
        isCodeRequest: false,
        isCodeRequestFailed: false,
      };
    }
    case (REQUEST_CODE_FAILED): {
      return {
        ...state,
        isCodeRequest: false,
        isCodeRequestFailed: true,
      };
    }
    
    case (RESET_PASSWORD_REQUEST): {
      return {
        ...state,
        isResetRequest: true,
        isResetFailed: false,
      };
    }
    case (RESET_PASSWORD_SUCCESS): {
      return {
        ...state,
        isCodeRequest: false,
        isCodeRequestFailed: false,
      };
    }
    case (RESET_PASSWORD_FAILED): {
      return {
        ...state,
        isResetRequest: false,
        isResetFailed: true,
      };
    }
    
    case (UPDATE_TOKEN_REQUEST): {
      return {
        ...state,
        isTokenRequest: true,
        isTokenFailed: false,
      };
    }
    case (UPDATE_TOKEN_SUCCESS): {
      return {
        ...state,
        isTokenRequest: false,
        isTokenFailed: false,
      };
    }
    case (UPDATE_TOKEN_FAILED): {
      return {
        ...state,
        isTokenRequest: false,
        isTokenFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

const rootReducer = combineReducers({
  ingredientsReducer,
  currentConstructorReducer,
  ingredientReducer,
  orderReducer,
  modalReducer,
  authReducer
})

export default rootReducer;
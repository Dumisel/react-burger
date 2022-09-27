import { getAllIngredients, getOrderNumber } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export const MOVE_CONSTRUCTOR_ELEMENT = 'MOVE_CONSTRUCTOR_ELEMENT';

export const ADD_INGREDIENT_DATA = 'ADD_INGREDIENT_DATA';
export const DELETE_INGREDIENT_DATA = 'DELETE_INGREDIENT_DATA';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const OPEN_INGREDIENT_DETAILS = 'OPEN_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';

export const OPEN_ORDER_DETAILS = 'OPEN_ORDER_DETAILS';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export function getIngredients() {
return function(dispatch) {
  dispatch({
    type: GET_INGREDIENTS_REQUEST
  });
  getAllIngredients().then(res => {
    if (res && res.success) {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: res.data
      });
    } else {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      });
    }
  })
  .catch(() => dispatch({ type: GET_INGREDIENTS_FAILED }));
}
}

export function getOrder(orderData) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderNumber(orderData).then(res => {
      if (res) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res,
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        });
      }
    })
    .catch(() => dispatch({ type: GET_ORDER_FAILED }));
  }
  }
import { getAllIngredients } from '../../utils/api';
import { AppDispatch, AppThunk, TIngredient } from '../types/types';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_CONSTRUCTOR_ELEMENT,
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS
} from '../constants/constants'

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: Array<TIngredient>;
}
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TIngredient;
}
export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly index: number;
}
export interface IMoveConstructorElement {
  readonly type: typeof MOVE_CONSTRUCTOR_ELEMENT;
  readonly payload: Array<TIngredient>;
}
export interface IAddIngredientData {
  readonly type: typeof ADD_INGREDIENT_DATA;
  readonly item: TIngredient;
}
export interface IDeleteIngredientData {
  readonly type: typeof DELETE_INGREDIENT_DATA;
}
export interface IOpenIngredientDetails {
  readonly type: typeof OPEN_INGREDIENT_DETAILS;
}
export interface ICloseIngredientDetails {
  readonly type: typeof CLOSE_INGREDIENT_DETAILS;
}

export const getIngredientsRequest = (): IGetIngredientsRequest => ({ type: GET_INGREDIENTS_REQUEST });
export const getIngredientsSuccess = (ingredients: Array<TIngredient>): IGetIngredientsSuccess => ({ type: GET_INGREDIENTS_SUCCESS, ingredients });
export const getIngredientsFailed = (): IGetIngredientsFailed => ({ type: GET_INGREDIENTS_FAILED });
export const addIngredient = (payload: TIngredient): IAddIngredient => ({ type: ADD_INGREDIENT, payload });
export const deleteIngredient = (index: number): IDeleteIngredient => ({ type: DELETE_INGREDIENT, index });
export const moveConstructorElement = (payload: Array<TIngredient>): IMoveConstructorElement => ({ type: MOVE_CONSTRUCTOR_ELEMENT, payload });
export const addIngredientData = (item: TIngredient): IAddIngredientData => ({ type: ADD_INGREDIENT_DATA, item });
export const deleteIngredientData = (): IDeleteIngredientData => ({ type: DELETE_INGREDIENT_DATA });
export const openIngredientDetails = (): IOpenIngredientDetails => ({ type: OPEN_INGREDIENT_DETAILS });
export const closeIngredientDetails = (): ICloseIngredientDetails => ({ type: CLOSE_INGREDIENT_DETAILS });

export const getIngredients: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch(getIngredientsRequest());
    getAllIngredients().then(res => {
      if (res && res.success) {
        dispatch(getIngredientsSuccess(res.data))
      } else {
        dispatch(getIngredientsFailed())
      }
    })
    .catch(() => dispatch(getIngredientsFailed()));
  }
}
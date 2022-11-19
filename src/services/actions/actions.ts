import { getAllIngredients, getOrderNumber, signUp, signIn, signOut, getUserInfo, updateUserInfo, updateToken, getConfirmation, setNewPassword } from '../../utils/api';
import { setCookie } from '../../utils/utils';
import { AppDispatch, AppThunk, TIngredient, TOrder, TUser } from '../types/types';
import {
GET_INGREDIENTS_REQUEST,
GET_INGREDIENTS_SUCCESS,
GET_INGREDIENTS_FAILED,

ADD_INGREDIENT,
DELETE_INGREDIENT,

MOVE_CONSTRUCTOR_ELEMENT,
CLEAR_CURRENT_CONSTRUCTOR,

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
UPDATE_USER_REQUEST,
UPDATE_USER_SUCCESS,
UPDATE_USER_FAILED,
LOGOUT_REQUEST,
LOGOUT_SUCCESS,
LOGOUT_FAILED,
REQUEST_CODE_REQUEST,
REQUEST_CODE_SUCCESS,
REQUEST_CODE_FAILED,
RESET_PASSWORD_REQUEST,
RESET_PASSWORD_SUCCESS,
RESET_PASSWORD_FAILED,
UPDATE_TOKEN_REQUEST,
UPDATE_TOKEN_SUCCESS,
UPDATE_TOKEN_FAILED
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
export interface IClearCurrentConstructor {
  readonly type: typeof CLEAR_CURRENT_CONSTRUCTOR;
}
export interface IAddIngredientData {
  readonly type: typeof ADD_INGREDIENT_DATA;
  readonly item: TIngredient;
}
export interface IDeleteIngredientData {
  readonly type: typeof DELETE_INGREDIENT_DATA;
}
export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: TOrder
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IOpenIngredientDetails {
  readonly type: typeof OPEN_INGREDIENT_DETAILS;
}
export interface ICloseIngredientDetails {
  readonly type: typeof CLOSE_INGREDIENT_DETAILS;
}
export interface IOpenOrderDetails {
  readonly type: typeof OPEN_ORDER_DETAILS;
}
export interface ICloseOrderDetails {
  readonly type: typeof CLOSE_ORDER_DETAILS;
}

//auth
export interface IRegisterUserRequest {
  readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUserSuccess {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly user: TUser;
}
export interface IRegisterUserFailed {
  readonly type: typeof REGISTER_USER_FAILED;
}
export interface ILoginUserRequest {
  readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILoginUserSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly user: TUser;
}
export interface ILoginUserFailed {
  readonly type: typeof LOGIN_USER_FAILED;
}
export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}
export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}
export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUser;
}
export interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}
export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}
export interface IRequestCodeRequest {
  readonly type: typeof REQUEST_CODE_REQUEST;
}
export interface IRequestCodeSuccess {
  readonly type: typeof REQUEST_CODE_SUCCESS;
}
export interface IRequestCodeFailed {
  readonly type: typeof REQUEST_CODE_FAILED;
}
export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}
export interface IUpdateTokenRequest {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}
export interface IUpdateTokenSuccess {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
  readonly user: TUser;
}
export interface IUpdateTokenFailed {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}


const getIngredientsRequest = (): IGetIngredientsRequest => ({ type: GET_INGREDIENTS_REQUEST });
const getIngredientsSuccess = (ingredients: Array<TIngredient>): IGetIngredientsSuccess => ({ type: GET_INGREDIENTS_SUCCESS, ingredients });
const getIngredientsFailed = (): IGetIngredientsFailed => ({ type: GET_INGREDIENTS_FAILED });
export const addIngredient = (payload: TIngredient): IAddIngredient => ({ type: ADD_INGREDIENT, payload });
export const deleteIngredient = (index: number): IDeleteIngredient => ({ type: DELETE_INGREDIENT, index });
export const moveConstructorElement = (payload: Array<TIngredient>): IMoveConstructorElement => ({ type: MOVE_CONSTRUCTOR_ELEMENT, payload });
const clearCurrentConstructor = (): IClearCurrentConstructor => ({ type: CLEAR_CURRENT_CONSTRUCTOR});
export const addIngredientData = (item: TIngredient): IAddIngredientData => ({ type: ADD_INGREDIENT_DATA, item });
export const deleteIngredientData = (): IDeleteIngredientData => ({ type: DELETE_INGREDIENT_DATA });
const getOrderRequest = (): IGetOrderRequest => ({ type: GET_ORDER_REQUEST });
const getOrderSuccess = (order: TOrder): IGetOrderSuccess => ({ type: GET_ORDER_SUCCESS, order });
export const getOrderFailed = (): IGetOrderFailed => ({ type: GET_ORDER_FAILED });
export const openIngredientDetails = (): IOpenIngredientDetails => ({ type: OPEN_INGREDIENT_DETAILS });
export const closeIngredientDetails = (): ICloseIngredientDetails => ({ type: CLOSE_INGREDIENT_DETAILS });
export const openOrderDetails = (): IOpenOrderDetails => ({ type: OPEN_ORDER_DETAILS });
export const closeOrderDetails = (): ICloseOrderDetails => ({ type: CLOSE_ORDER_DETAILS });

const registerUserRequest = (): IRegisterUserRequest => ({ type: REGISTER_USER_REQUEST });
const registerUserSuccess = (user: TUser): IRegisterUserSuccess => ({ type: REGISTER_USER_SUCCESS, user });
const registerUserFailed = (): IRegisterUserFailed => ({ type: REGISTER_USER_FAILED });
const loginUserRequest = (): ILoginUserRequest => ({ type: LOGIN_USER_REQUEST });
const loginUserSuccess = (user: TUser): ILoginUserSuccess => ({ type: LOGIN_USER_SUCCESS, user });
const loginUserFailed = (): ILoginUserFailed => ({ type: LOGIN_USER_FAILED });
const getUserRequest = (): IGetUserRequest => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user: TUser): IGetUserSuccess => ({ type: GET_USER_SUCCESS, user });
const getUserFailed = (): IGetUserFailed => ({ type: GET_USER_FAILED });
const updateUserRequest = (): IUpdateUserRequest => ({ type: UPDATE_USER_REQUEST });
const updateUserSuccess = (user: TUser): IUpdateUserSuccess => ({ type: UPDATE_USER_SUCCESS, user });
const updateUserFailed = (): IUpdateUserFailed => ({ type: UPDATE_USER_FAILED });
const logoutRequest = (): ILogoutRequest => ({ type: LOGOUT_REQUEST });
const logoutSuccess = (): ILogoutSuccess => ({ type: LOGOUT_SUCCESS });
const logoutFailed = (): ILogoutFailed => ({ type: LOGOUT_FAILED });
const requestCodeRequest = (): IRequestCodeRequest => ({ type: REQUEST_CODE_REQUEST });
const requestCodeSuccess = (): IRequestCodeSuccess => ({ type: REQUEST_CODE_SUCCESS });
const requestCodeFailed = (): IRequestCodeFailed => ({ type: REQUEST_CODE_FAILED });
const resetPasswordRequest = (): IResetPasswordRequest => ({ type: RESET_PASSWORD_REQUEST });
const resetPasswordSuccess = (): IResetPasswordSuccess => ({ type: RESET_PASSWORD_SUCCESS });
const resetPasswordFailed = (): IResetPasswordFailed => ({ type: RESET_PASSWORD_FAILED });
const updateTokenRequest = (): IUpdateTokenRequest => ({ type: UPDATE_TOKEN_REQUEST });
const updateTokenSuccess = (user: TUser): IUpdateTokenSuccess => ({ type: UPDATE_TOKEN_SUCCESS, user });
const updateTokenFailed = (): IUpdateTokenFailed => ({ type: UPDATE_TOKEN_FAILED });

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

export const getOrder: AppThunk = (orderData) => {
  return function(dispatch) {
    dispatch(getOrderRequest());
    getOrderNumber(orderData).then(res => {
      if (res) {
        dispatch(getOrderSuccess(res))
        dispatch(clearCurrentConstructor());
      } else {
        dispatch(getOrderFailed())
      }
    })
    .catch(() => dispatch(getOrderFailed()));
  }
}

  //auth
export const register: AppThunk = (data) => {
  return function(dispatch) {
    dispatch(registerUserRequest());
      signUp(data).then((res) => {
        if (res.success) {
          setCookie('token', res.accessToken, { expires: 1200 });
          localStorage.setItem('jwt', res.refreshToken);
          dispatch(registerUserSuccess(res.user))
        }
    })
    .catch(() => dispatch(registerUserFailed()));
  }
}
  
  export const login: AppThunk = (data) => {
    return function(dispatch) {
      dispatch(loginUserRequest());
      signIn(data).then((res) => {
        if (res.success) {
          setCookie('token', res.accessToken, { expires: 1200 });
          localStorage.setItem('jwt', res.refreshToken);
          dispatch(loginUserSuccess(res.user))
        }
      })
      .catch(() => dispatch(loginUserFailed()));
    }
  }
  
export const logout: AppThunk = () => {
  return function(dispatch) {
    dispatch(logoutRequest());
    signOut().then((res) => {
      if (res.success) {
        localStorage.removeItem('jwt');
        setCookie('token', '', { expires: -1 });
        dispatch(logoutSuccess());
      }
    })
    .catch(() => dispatch(logoutFailed()));
  }
}
  
export const refreshToken: AppThunk = () => {
  return function(dispatch) {
    dispatch(updateTokenRequest())
    updateToken().then((res) => {
      if (res.success) {
        setCookie('token', res.accessToken, { expires: 1200 });
        localStorage.setItem('jwt', res.refreshToken);
        dispatch(updateTokenSuccess(res.user))
      }
    })
    .catch(() => dispatch(updateTokenFailed()));
  }
}
  
export const getUser: AppThunk = () => {
  return function(dispatch) {
    dispatch(getUserRequest());
    getUserInfo().then((res) => {
      dispatch(getUserSuccess(res.user))
    })
    .catch(() => {
      if (localStorage.getItem('jwt')) {
        dispatch(refreshToken());
        getUserInfo().then((res) => {
          dispatch(getUserSuccess(res.user))
        })
      } else {
        dispatch(getUserFailed());
      }
    })
  }
}

export const updateUser: AppThunk = (data) => {
  return function(dispatch) {
    dispatch(updateUserRequest());
    updateUserInfo(data).then((res) => {
      dispatch(updateUserSuccess(res.user))
    })
    .catch(() => {
      if (localStorage.getItem('jwt')) {
        dispatch(refreshToken());
        dispatch(updateUser(data));
      } else {
        dispatch(updateUserFailed());
      }
    })
  }
}
  
export const requestResetCode: AppThunk = (email) => {
  return function(dispatch) {
    dispatch(requestCodeRequest());
    getConfirmation(email).then(() => {
      dispatch(requestCodeSuccess());
    })
    .catch(() => dispatch(requestCodeFailed()));
  }
}
  
export const resetPassword: AppThunk = (data) => {
  return function(dispatch) {
    dispatch(resetPasswordRequest());
    setNewPassword(data).then(() => {
      dispatch(resetPasswordSuccess());
    })
    .catch(() => dispatch(resetPasswordFailed()));
  }
}
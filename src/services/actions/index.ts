import {
  IGetIngredientsRequest,
  IGetIngredientsSuccess,
  IGetIngredientsFailed,
  IAddIngredient,
  IDeleteIngredient,
  IMoveConstructorElement,
  IAddIngredientData,
  IDeleteIngredientData,
  IOpenIngredientDetails,
  ICloseIngredientDetails
} from './ingredientsActions'

import {
  IClearCurrentConstructor,
  IGetOrderRequest,
  IGetOrderSuccess,
  IGetOrderFailed,
  IOpenOrderDetails,
  ICloseOrderDetails
} from './orderActions'

import {
  IRegisterUserRequest,
  IRegisterUserSuccess,
  IRegisterUserFailed,
  ILoginUserRequest,
  ILoginUserSuccess,
  ILoginUserFailed,
  IGetUserRequest,
  IGetUserSuccess,
  IGetUserFailed,
  IUpdateUserRequest,
  IUpdateUserSuccess,
  IUpdateUserFailed,
  ILogoutRequest,
  ILogoutSuccess,
  ILogoutFailed,
  IRequestCodeRequest,
  IRequestCodeSuccess,
  IRequestCodeFailed,
  IResetPasswordRequest,
  IResetPasswordSuccess,
  IResetPasswordFailed,
  IUpdateTokenRequest,
  IUpdateTokenSuccess,
  IUpdateTokenFailed
} from './authActions'

import {
  IWsConnectionStart,
  IWsConnectionSuccess,
  IWsConnectionError,
  IWsConnectionClosed,
  IWsGetMessage,
  IWsUserConnectionStart,
  IWsUserConnectionSuccess,
  IWsUserConnectionError,
  IWsUserConnectionClosed,
  IWsUserGetMessage
} from './wsActions';

export type TActions =
  |IGetIngredientsRequest
  |IGetIngredientsSuccess
  |IGetIngredientsFailed
  |IAddIngredient
  |IDeleteIngredient
  |IMoveConstructorElement
  |IClearCurrentConstructor
  |IAddIngredientData
  |IDeleteIngredientData
  |IGetOrderRequest
  |IGetOrderSuccess
  |IGetOrderFailed
  |IOpenIngredientDetails
  |ICloseIngredientDetails
  |IOpenOrderDetails
  |ICloseOrderDetails
  |IRegisterUserRequest
  |IRegisterUserSuccess
  |IRegisterUserFailed
  |ILoginUserRequest
  |ILoginUserSuccess
  |ILoginUserFailed
  |IGetUserRequest
  |IGetUserSuccess
  |IGetUserFailed
  |IUpdateUserRequest
  |IUpdateUserSuccess
  |IUpdateUserFailed
  |ILogoutRequest
  |ILogoutSuccess
  |ILogoutFailed
  |IRequestCodeRequest
  |IRequestCodeSuccess
  |IRequestCodeFailed
  |IResetPasswordRequest
  |IResetPasswordSuccess
  |IResetPasswordFailed
  |IUpdateTokenRequest
  |IUpdateTokenSuccess
  |IUpdateTokenFailed
  |IWsConnectionStart
  |IWsConnectionSuccess
  |IWsConnectionError
  |IWsConnectionClosed
  |IWsGetMessage
  |IWsUserConnectionStart
  |IWsUserConnectionSuccess
  |IWsUserConnectionError
  |IWsUserConnectionClosed
  |IWsUserGetMessage;
import { getOrderNumber } from '../../utils/api';
import { AppThunk, TOrder } from '../types/types';
import {
  CLEAR_CURRENT_CONSTRUCTOR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  OPEN_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS
} from '../constants/constants'


export interface IClearCurrentConstructor {
  readonly type: typeof CLEAR_CURRENT_CONSTRUCTOR;
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
export interface IOpenOrderDetails {
  readonly type: typeof OPEN_ORDER_DETAILS;
}
export interface ICloseOrderDetails {
  readonly type: typeof CLOSE_ORDER_DETAILS;
}

export const clearCurrentConstructor = (): IClearCurrentConstructor => ({ type: CLEAR_CURRENT_CONSTRUCTOR});
export const getOrderRequest = (): IGetOrderRequest => ({ type: GET_ORDER_REQUEST });
export const getOrderSuccess = (order: TOrder): IGetOrderSuccess => ({ type: GET_ORDER_SUCCESS, order });
export const getOrderFailed = (): IGetOrderFailed => ({ type: GET_ORDER_FAILED });
export const openOrderDetails = (): IOpenOrderDetails => ({ type: OPEN_ORDER_DETAILS });
export const closeOrderDetails = (): ICloseOrderDetails => ({ type: CLOSE_ORDER_DETAILS });

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
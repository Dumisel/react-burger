import { TOrder } from '../types/types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE
} from '../constants/constants';

export interface IOrders {
  readonly orders: Array<TOrder>;
  readonly total: number;
  readonly totalToday: number;
}
export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: any;
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IOrders;
}
export interface IWsUserConnectionStart {
  readonly type: typeof WS_USER_CONNECTION_START;
}

export interface IWsUserConnectionSuccess {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}
export interface IWsUserConnectionError {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
  readonly payload: any;
}
export interface IWsUserConnectionClosed {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
}
export interface IWsUserGetMessage {
  readonly type: typeof WS_USER_GET_MESSAGE;
  readonly payload: IOrders
}

export const wsConnectionStart = (): IWsConnectionStart => ({ type: WS_CONNECTION_START });
export const wsConnectionSuccess = (): IWsConnectionSuccess => ({ type: WS_CONNECTION_SUCCESS });
export const wsConnectionError = (error: any): IWsConnectionError => ({ type: WS_CONNECTION_ERROR, payload: error });
export const wsConnectionClosed = (): IWsConnectionClosed => ({ type: WS_CONNECTION_CLOSED });
export const wsGetMessage = (payload: IOrders): IWsGetMessage => ({ type: WS_GET_MESSAGE, payload });

export const wsUserConnectionStart = (): IWsUserConnectionStart => ({ type: WS_USER_CONNECTION_START });
export const wsUserConnectionSuccess = (): IWsUserConnectionSuccess => ({ type: WS_USER_CONNECTION_SUCCESS });
export const wsUserConnectionError = (error: any): IWsUserConnectionError => ({ type: WS_USER_CONNECTION_ERROR, payload: error });
export const wsUserConnectionClosed = (): IWsUserConnectionClosed => ({ type: WS_USER_CONNECTION_CLOSED });
export const wsUserGetMessage = (payload: IOrders): IWsUserGetMessage => ({ type: WS_USER_GET_MESSAGE, payload });
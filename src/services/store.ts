import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/reducers";
import thunk from "redux-thunk";
import socketMiddleware from './middleware/socketMiddleware';

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
} from './constants/constants';

export type TWsActions = {
  wsInit: typeof WS_CONNECTION_START;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onError: typeof WS_CONNECTION_ERROR;
  onClose: typeof WS_CONNECTION_CLOSED;
  onMessage: typeof WS_GET_MESSAGE;
};

export type TWsUserActions = {
  wsInit: typeof WS_USER_CONNECTION_START;
  onOpen: typeof WS_USER_CONNECTION_SUCCESS;
  onError: typeof WS_USER_CONNECTION_ERROR;
  onClose: typeof WS_USER_CONNECTION_CLOSED;
  onMessage: typeof WS_USER_GET_MESSAGE;
};
  
export const wsActions: TWsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const wsUserActions: TWsUserActions = {
  wsInit: WS_USER_CONNECTION_START,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  onMessage: WS_USER_GET_MESSAGE
};

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUserUrl = 'wss://norma.nomoreparties.space/orders';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsUserUrl, wsUserActions)));

export const store = createStore(rootReducer, enhancer);
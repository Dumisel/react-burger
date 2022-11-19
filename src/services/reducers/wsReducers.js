import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE
} from '../actions/wsActions';

const initialState = {
  wsConnected: false,
  wsError: undefined,
  messages: {
    orders: [],
    total: 0,
    totalToday: 0 },
  userMessages: {
    orders: [],
    total: 0,
    totalToday: 0 }
  }

const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: undefined,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: action.payload,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsError: undefined,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        messages: {...action.payload}
    };

    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: undefined,
      };

    case WS_USER_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: action.payload,
      };

    case WS_USER_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsError: undefined,
      };

    case WS_USER_GET_MESSAGE:
      return {
        ...state,
        userMessages: {...action.payload}
    };

    default: {
      return state;
    }
  }
};

export default wsReducer;
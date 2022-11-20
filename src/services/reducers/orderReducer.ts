import { TActions } from '../actions';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
  } from '../constants/constants';


type TInitialOrderState = {
  order: {
    number: number | null
  }
  orderRequest: boolean;
  orderFailed: boolean;
}
const initialOrderState: TInitialOrderState = {
  order: {
    number: null
  },
  orderRequest: false,
  orderFailed: false
}

export const orderReducer = (state = initialOrderState, action: TActions) => {
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
}

export default orderReducer;
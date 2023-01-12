import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TActions } from '../actions';
import { store } from "../store";

type TApplicationActions = TActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;


export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key?: string
  count?: number
};

export type TProfileForm = {
  name: string;
  email: string;
  password: string;
};

export type TUser = {
  name: string;
  email: string;
};

type TOrderOwner = {
  name: string;
  email: string;
  createdAt: string
};

export type TOrder = {
  createdAt: string;
  ingredients: Array<TIngredient | string>;
  name: string;
  number: number
  owner: TOrderOwner;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TOrderResponse = {
  name: string;
  order: TOrder;
  success: boolean;
};

export type TLastOrders = {
  ingredients: Array<string>;
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TLocation = {
  from?: string;
  background?: {
    hash: string;
    key?: string;
    pathname: string;
    search: string;
    state: TLocation;
  };
};



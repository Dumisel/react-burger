import api from './constants';
import { getCookie } from './utils';
import { TIngredient, TProfileForm } from '../services/types/types';

export type TRequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
  body?: string;
};

const checkResponse = (res: Response) => {
  if (!res.ok) {
    return res.json()
      .then((err: { message: string | undefined }) => {
        throw new Error(err.message);
      });
  }
  return res.json();
}

const request = (url: string, options?: TRequestOptions) => {
  return fetch(url, options).then(checkResponse)
}

export const getOrderNumber = (data: Array<TIngredient>) => request(`${api}/orders`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json',
  Authorization: `${getCookie('token')}`},
  body: JSON.stringify({ ingredients: data }),
})
  .then((data) => data.order)

export const getAllIngredients = () => request(`${api}/ingredients`)

export const signUp = (data: {name: string; email: string; password: string }) => request(`${api}/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  
export const signIn = (data: { email: string; password: string }) => request(`${api}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
})
  
export const signOut = () => request(`${api}/auth/logout`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: localStorage.getItem('jwt') }),
})
  
export const getUserInfo = () => request(`${api}/auth/user`, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json',
    Authorization: `${getCookie('token')}` }
})
  
export const updateUserInfo = (data: TProfileForm) => request(`${api}/auth/user`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json',
    Authorization: `${getCookie('token')}` },
  body: JSON.stringify(data)
})
  
export const getConfirmation = (email: {email: string}) => request(`${api}/password-reset`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
})
  
export const setNewPassword = (data: { 'password': string; 'token': string}) => request(`${api}/password-reset/reset`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  
export const updateToken = () => request(`${api}/auth/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: localStorage.getItem('jwt') })
})
import api from './constants';
import { getCookie } from './utils';

const checkResponse = (res) => {
  if (!res.ok) {
    return res.json()
      .then((err) => {
        throw new Error(err.message);
      });
  }
  return res.json();
}

export const getOrderNumber = (data) => fetch(`${api}/orders`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({ ingredients: data }),
})
  .then(checkResponse)
  .then((data) => data.order)

export const getAllIngredients = () => fetch(`${api}/ingredients`)
  .then(checkResponse)

export const signUp = (data) => fetch(`${api}/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(checkResponse)
  
export const signIn = (data) => fetch(`${api}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
})
  .then(checkResponse)
  
export const signOut = () => fetch(`${api}/auth/logout`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: localStorage.getItem('jwt') }),
})
  .then(checkResponse)
  
export const getUserInfo = () => fetch(`${api}/auth/user`, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json',
    Authorization: `${getCookie('token')}` }
})
  .then(checkResponse)
  
export const updateUserInfo = (data) => fetch(`${api}/auth/user`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json',
    Authorization: `${getCookie('token')}` },
  body: JSON.stringify(data),
})
  .then(checkResponse)
  
export const getConfirmation = (email) => fetch(`${api}/password-reset`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
})
  .then(checkResponse)
  
export const setNewPassword = (data) => fetch(`${api}/password-reset/reset`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
})
  .then(checkResponse)
  
export const updateToken = () => fetch(`${api}/auth/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: localStorage.getItem('jwt') }),
})
  .then(checkResponse)
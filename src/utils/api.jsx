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

const request = (url, options) => {
  return fetch(url, options).then(checkResponse)
}

export const getOrderNumber = (data) => request(`${api}/orders`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json',
  Authorization: `${getCookie('token')}`},
  body: JSON.stringify({ ingredients: data }),
})
  .then((data) => data.order)

export const getAllIngredients = () => request(`${api}/ingredients`)

export const signUp = (data) => request(`${api}/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  
export const signIn = (data) => request(`${api}/auth/login`, {
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
  
export const updateUserInfo = (data) => request(`${api}/auth/user`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json',
    Authorization: `${getCookie('token')}` },
  body: JSON.stringify(data)
})
  
export const getConfirmation = (email) => request(`${api}/password-reset`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
})
  
export const setNewPassword = (data) => request(`${api}/password-reset/reset`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  
export const updateToken = () => request(`${api}/auth/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: localStorage.getItem('jwt') })
})
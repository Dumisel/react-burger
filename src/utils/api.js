import api from './constants';

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
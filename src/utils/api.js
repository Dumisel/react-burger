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
  .then((data) => data.order.number)
  .then (console.log(data))

  export const getIngredients = () => fetch(`${api}/ingredients`)
  .then(checkResponse)
  .then((data) => (data.data))
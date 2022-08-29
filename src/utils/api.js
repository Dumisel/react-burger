import api from './constants';

export const getOrderNumber = (data) => fetch(`${api}/orders`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({ ingredients: data }),
})
  .then((res) => {
    if (!res.ok) {
      return res.json()
        .then((err) => {
          throw new Error(err.message);
        });
    }
    return res.json();
  })
  .then((data) => data.order.number)
  .then (console.log(data))

  export const getIngredients = () => fetch(`${api}/ingredients`)
  .then((res) => {
    if (!res.ok) {
      return res.json()
        .then((err) => {
          throw new Error(err.message);
        });
    }
    return res.json();
  })
  .then((data) => (data.data))
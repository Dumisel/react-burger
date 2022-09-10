import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import { getIngredients, getOrderNumber } from '../../utils/api';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientsContext } from '../../utils/ingredientsContext'; 

const  App = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});
  const [orderNumber, setOrderNumber] = React.useState();
  
  const openOrderDetails = () => {
    setIsOrderDetailsOpened(true);
  };
 

  const openIngredientDetails = (el: {}) => {
    setCurrentIngredient(el);
    setIsIngredientDetailsOpened(true);
  }

  const closeModal = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
  };

  React.useEffect(() => {
    getIngredients()
      .then((data) => setIngredients(data))
      .catch((err) => console.log(err));
  }, []);

  const placeOrder = (orderData: any) => {
    getOrderNumber(orderData)
      .then((data) => {
        openOrderDetails();
        setOrderNumber(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={ appStyles.app }>
      <AppHeader />
      <Main>
        <IngredientsContext.Provider value={ingredients}>
          <BurgerIngredients handleOpenModal={ openIngredientDetails }/>
          <BurgerConstructor onOrder={ placeOrder }/>
        </IngredientsContext.Provider>
      </Main>
      { isOrderDetailsOpened &&
        <Modal
          header={ '' }
          onClose={ closeModal }
        >
          <OrderDetails orderNumber={ orderNumber } /> 
        </Modal> }
      { isIngredientDetailsOpened &&
        <Modal
          header={ 'Детали ингредиента' }
          onClose={ closeModal }
        >
          <IngredientDetails ingredient={ currentIngredient } /> 
        </Modal> }
    </div>
  )
}

export default App;
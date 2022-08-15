import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import api from '../../utils/constants';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

const  App = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});
  
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
    fetch(api)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        setIngredients(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={ appStyles.app }>
      <AppHeader />
      <Main>
        <BurgerIngredients ingredients={ ingredients } handleOpenModal={ openIngredientDetails }/>
        <BurgerConstructor ingredients={ ingredients } handleOpenModal={ openOrderDetails }/>
      </Main>
      { isOrderDetailsOpened &&
        <Modal
          header={ '' }
          onClose={ closeModal }
        >
          <OrderDetails /> 
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
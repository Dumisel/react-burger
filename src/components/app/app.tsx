import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import api from '../../utils/constants';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

const  App = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentModal, setCurrentModal] = React.useState('');
  const [currentIngredient, setCurrentIngredient] = React.useState({});

  let headerContent;
  if (currentModal === 'ingredientDetails') {
    headerContent = 'Детали ингредиента';
  } else {
    headerContent = '';
  }
  
  const openOrderDetails = () => {
    setIsModalOpen(true);
    setCurrentModal('orderDetails');
  };
 

  const openIngredientDetails = (el: {}) => {
    setCurrentIngredient(el);
    setIsModalOpen(true);
    setCurrentModal('ingredientDetails');
     };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    fetch(api)
    .then((res) => {
      if (!res.ok) {
        return res.json()
    .then((err) => {
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
      {isModalOpen && (
      <>
        <ModalOverlay onClose={ closeModal } />
        <Modal
          onClose={ closeModal }
          header={ headerContent }
        >{ currentModal === 'ingredientDetails'
           ? <IngredientDetails ingredient={ currentIngredient }/>
           : <OrderDetails />}
        </Modal>
      </>
      )}
    </div>
  )
}

export default App;
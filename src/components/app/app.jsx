import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
  MOVE_CONSTRUCTOR_ELEMENT,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
  OPEN_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS,
  getIngredients,
  getOrder,
  GET_ORDER_FAILED
} from '../../services/actions/actions';
import update from 'immutability-helper';
import { v4 as uuidv4 } from 'uuid';

const  App = () => {
  const dispatch = useDispatch();

  const ingredient = useSelector((store) => store.ingredientReducer.ingredient);
  const currentConstructor = useSelector((store) => store.currentConstructorReducer.currentConstructor);
  const isIngredientDetailsOpened = useSelector((store) => store.modalReducer.isIngredientDetailsOpened);
  const isOrderDetailsOpened = useSelector((store) => store.modalReducer.isOrderDetailsOpened);
  const order = useSelector((store) => store.orderReducer.order);

  const currentBurgerIngredients = [...currentConstructor].filter((item) => item.type !== 'bun');

  const openOrderDetails = () => {
    dispatch({ type: OPEN_ORDER_DETAILS });
  };
 

  const openIngredientDetails = (item) => {
    dispatch({ type: ADD_INGREDIENT_DATA, item });
    dispatch({ type: OPEN_INGREDIENT_DETAILS });
  }

  const closeModal = () => {
    dispatch({ type: DELETE_INGREDIENT_DATA });
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });;
    dispatch({ type: GET_ORDER_FAILED });
    dispatch({ type: CLOSE_ORDER_DETAILS });
  };

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const placeOrder = (orderData) => {
    dispatch(getOrder(orderData));
    openOrderDetails();

  };

  const handleDrop = (item) => {
    if (item.type === 'bun') {
      const bun = currentConstructor.find((element) => element.type === 'bun');
      const index = currentConstructor.indexOf(bun);
      if (index !== -1) {
        dispatch({ type: DELETE_INGREDIENT, index });
      }
    }
    dispatch({ type: ADD_INGREDIENT, item: {...item, key:uuidv4()} });
  };

  const handleMove = React.useCallback((dragIndex, hoverIndex) => {
    const bun = [...currentConstructor].find((item) => item.type === 'bun');
    const dragElement = currentBurgerIngredients[dragIndex];
    const payload = bun
      ? [bun, ...update(currentBurgerIngredients, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragElement],
        ],
      })]
      : update(currentBurgerIngredients, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragElement],
        ],
      });
    dispatch({ type: MOVE_CONSTRUCTOR_ELEMENT, payload });
  }, [currentBurgerIngredients]);




  const handleDeleteIngredient = (item) => {
    const index = currentConstructor.indexOf(item);
    dispatch({ type: DELETE_INGREDIENT, index });
  };


  return (
    <div className={ appStyles.app }>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        <Main>
          <BurgerIngredients handleOpenModal={ openIngredientDetails } />
          <BurgerConstructor onOrder={ placeOrder } onDrop={handleDrop} onMove={ handleMove } onDelete={ handleDeleteIngredient } />
      </Main>
      { isOrderDetailsOpened &&
        <Modal
          header={ '' }
          onClose={ closeModal }
        >
          <OrderDetails orderNumber={ order.number } /> 
        </Modal> }
      { isIngredientDetailsOpened &&
        <Modal
          ingredient={ ingredient }
          header={ 'Детали ингредиента' }
          onClose={ closeModal }
        >
          <IngredientDetails /> 
        </Modal> }
      </DndProvider>
    </div>
  )
}

export default App;
import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Loader from '../../utils/loader/loader';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from '../../services/hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  addIngredient,
  deleteIngredient,
  addIngredientData,
  deleteIngredientData,
  moveConstructorElement,
  closeIngredientDetails,
  closeOrderDetails,
  getIngredients,
  getOrder,
  getOrderFailed
} from '../../services/actions/actions';
import update from 'immutability-helper';
import { v4 as uuidv4 } from 'uuid';
import { Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {
  ConstructorPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  IngredientPage,
  OrdersPage,
  NotFoundPage,
  FeedPage
} from '../../pages/index';

import FeedOrder from '../feed/feed-order';
import FeedOrderModal from '../feed/feed-modal';
import ProtectedRoute from '../protected-route/protected-route';
import { getUser } from '../../services/actions/actions';
import { TIngredient, TLocation } from '../../services/types/types';


const  App = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation<TLocation>();
  const background = location.state?.background;
  
  const currentConstructor = useSelector((store) => store.currentConstructorReducer.currentConstructor);
  const order = useSelector((store) => store.orderReducer.order)
  const orderRequest = useSelector((store) => store.orderReducer.orderRequest)
  const { isAuth } = useSelector((store) => store.authReducer);

  const currentBurgerIngredients = [...currentConstructor].filter((item) => item.type !== 'bun');

  const openIngredientDetails = (item: TIngredient) => {
    dispatch(addIngredientData(item));
  }

  const closeModal = () => {
    dispatch(deleteIngredientData());
    dispatch(closeIngredientDetails());;
    dispatch(getOrderFailed());
    dispatch(closeOrderDetails());
    history.goBack();
  };

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const placeOrder = (orderData: ReadonlyArray<TIngredient>) => {
    dispatch(getOrder(orderData));
  };

  React.useEffect(() => {
    if (!isAuth && localStorage.getItem('jwt')) {
      dispatch(getUser());
    }
  }, []);

  const handleDrop = (item: TIngredient) => {
    if (item.type === 'bun') {
      const bun = currentConstructor.find((element) => element.type === 'bun');
      const index = currentConstructor.indexOf(bun as TIngredient);
      if (index !== -1) {
        dispatch(deleteIngredient(index));
      }
    }
    dispatch(addIngredient({ ...item, key: uuidv4() }));
  };

  const handleMove = React.useCallback((dragIndex: number, hoverIndex: number) => {
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
    dispatch(moveConstructorElement(payload));
  }, [currentBurgerIngredients]);

  const handleDeleteIngredient = (item: TIngredient) => {
    const index = currentConstructor.indexOf(item);
    dispatch(deleteIngredient(index));
  };

  React.useEffect(() => {
    if (order?.number) {
      history.push(`/orders/${order.number}`, { background: location });
    }
  }, [order]);

  const [orderNumber, setOrderNumber] = React.useState('');
  React.useEffect(() => {
    const number = location.pathname.split('/').at(-1);
    if (number) setOrderNumber(number);
  }, [location]);

  return (
    <div className={ appStyles.app }>
      <DndProvider backend={ HTML5Backend }>
        <AppHeader />
          <Switch location={ background || location }>
            <Route path='/' exact={ true }>
              { orderRequest
                ? (<Loader />)
                : (
                  <ConstructorPage
                    handleOpenModal={ openIngredientDetails }
                    onOrder={ placeOrder }
                    onDrop={ handleDrop }  
                    onMove={ handleMove } 
                    onDelete={ handleDeleteIngredient }
                  />)}
            </Route>
            <Route path='/ingredients/:id' exact={ true }>
              <IngredientPage />
            </Route>
            <Route path='/feed' exact={ true }> 
              <FeedPage />
            </Route>
            <Route path='/feed/:id' exact={ true }>
              <FeedOrder />
            </Route>
            <ProtectedRoute path='/profile' exact={ true }>
              <ProfilePage />
            </ProtectedRoute>
            <ProtectedRoute path='/profile/orders' exact={ true }>
              <OrdersPage />
            </ProtectedRoute>
            <ProtectedRoute path='/profile/orders/:id' exact={ true }>
              <FeedOrder />
            </ProtectedRoute>
            <Route path='/login' exact={ true }>
              <LoginPage />
            </Route>
            <Route path='/register' exact={ true }>
              <RegisterPage />
            </Route>
            <Route path='/forgot-password' exact={ true }>
              <ForgotPasswordPage />
            </Route>
            <Route path='/reset-password' exact={ true }>
              <ResetPasswordPage />
            </Route>
            <ProtectedRoute path='/orders/:orderNumber' exact={ true }>
              <OrderDetails  />
            </ProtectedRoute>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>

          {background && (
            <Route path='/ingredients/:id' exact={ true }>
              <Modal onClose={ closeModal }  header={ 'Детали ингредиента' }>
                <IngredientDetails />
              </Modal>
            </Route>
          )}

          {background && (
            <Route path="/feed/:id" exact={ true }>
              <Modal onClose={ closeModal } header={`#${orderNumber}`} headerStyle='text text_type_digits-default'>
                <FeedOrderModal />
              </Modal>
            </Route>
          )}

          {background && (
            <ProtectedRoute path="/profile/orders/:id" exact={ true }>
              <Modal onClose={ closeModal } header={`#${orderNumber}`} headerStyle='text text_type_digits-default'>
                <FeedOrderModal />
              </Modal>
            </ProtectedRoute>
          )}
     
          {background && (
            <ProtectedRoute path="/orders/:orderNumber" exact={ true }>
              <Modal onClose={ closeModal } header={ '' }>
                <OrderDetails  />
              </Modal>
            </ProtectedRoute>
          )}    
            
      </DndProvider>
    </div>
  )
}

export default App;
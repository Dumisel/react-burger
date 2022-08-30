import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import  {ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsContext } from '../../utils/ingredientsContext';

const initialConstructorState = {
  bun: {},
  toppings: [],
  totalPrice: 0,
};

const BurgerConstructor = ({ onOrder }) => {
  const ingredients = React.useContext(IngredientsContext);

  function reducer (state, action) {
    const bun = ingredients && ingredients
      .find((item) => item.type === 'bun');
    const toppings = ingredients && ingredients
      .filter((item) => item.type !== 'bun')
      .slice(0, 2);
    const totalPrice = state.toppings.length && state.toppings
      .reduce((total, current) => total + current.price, 0) + state.bun.price * 2;
    switch (action.type) {
      case 'assemble':
        return { ...state, toppings, bun };
      case 'count':
        return { ...state, totalPrice };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [ constructorState, constructorStateDispatcher ] = React.useReducer(reducer, initialConstructorState);

  React.useEffect(() => {
    constructorStateDispatcher({ type: 'assemble' });
    constructorStateDispatcher({ type: 'count' });
  }, [ingredients]);

  const handleOrder = () => {
    const orderData = [constructorState.bun, ...constructorState.toppings]
      .map((item) => item._id);
    onOrder(orderData);
  };

  return (
    <section className={burgerConstructorStyles.container}>
      <div className={burgerConstructorStyles.base}>
        {constructorState.bun && <ConstructorElement
          type="top"
          isLocked={ true }
          text={`${ constructorState.bun.name } (верх)`}
          price={ constructorState.bun.price }
          thumbnail={ constructorState.bun.image }
        />}
      </div>
      <ul className={ burgerConstructorStyles.list }>
        { constructorState.toppings.map((ingredient, index) => (
        <li className={ burgerConstructorStyles.ingredient } key={ingredient._id}>
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={ false }
            text={ ingredient.name }
            price={ ingredient.price }
            thumbnail={ ingredient.image }
          />
        </li>
        )) }
        </ul>
        <div className={burgerConstructorStyles.base}>
          {constructorState.bun && <ConstructorElement
            type="bottom"
            isLocked={ true }
            text={`${ constructorState.bun.name } (низ)`}
            price={ constructorState.bun.price }
            thumbnail={ constructorState.bun.image }
          />}
        </div>
        <div className={ burgerConstructorStyles.total }>
          <p className={ burgerConstructorStyles.price }>
            <span className={`${ burgerConstructorStyles.text } text text_type_digits-medium`}>{constructorState.totalPrice}</span> <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="medium" onClick={ handleOrder }>Оформить заказ</Button>
        </div>
    </section>
  )
};

BurgerConstructor.propTypes = {
  onOrder: PropTypes.func.isRequired,
}

export default BurgerConstructor;
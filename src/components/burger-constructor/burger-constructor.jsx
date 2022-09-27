import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import {ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import BurgerConstructorElement from './burger-constructor-element';

const BurgerConstructor = ({ onOrder, onDrop, onDelete, onMove }) => {
  const currentConstructor = useSelector((store) => store.currentConstructorReducer.currentConstructor);
  const bun = currentConstructor && currentConstructor.find((item) => item.type === 'bun');

  const totalPrice = React.useMemo(() => {
    return (
      currentConstructor.length ? currentConstructor.reduce((total, current) => 
    (current.type !== 'bun' ? total + current.price : total + current.price * 2), 0) : 0
    );
  }, [currentConstructor]);
  
  const handleOrder = () => {
    onOrder(currentConstructor);
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      onDrop(item);
    }
  });

  const currentElement = React.useMemo(() => currentConstructor
      .filter((item) => item.type !== 'bun')
      .map((element, index) => (
        <BurgerConstructorElement
          element={ element }
          id={ element._id }
          key= { element.key }
          index={ index }
          onDelete={ onDelete }
          onMove={ onMove } 
        />
      )),
    [currentConstructor]
  );

  return (
    <section className={ burgerConstructorStyles.container } ref={ dropTarget }>
      {bun && (<div className={ burgerConstructorStyles.base }>
        <ConstructorElement
          type="top"
          isLocked={ true }
          text={`${ bun.name } (верх)`}
          price={ bun.price }
          thumbnail={ bun.image }
        />
      </div>)}
      <ul className={ burgerConstructorStyles.list }>
        { currentElement }
      </ul>
      {bun && (<div className={ burgerConstructorStyles.base }>
        <ConstructorElement
          type="bottom"
          isLocked={ true }
          text={`${ bun.name } (низ)`}
          price={ bun.price }
          thumbnail={ bun.image }
        />
      </div>)}
      <div className={ burgerConstructorStyles.total }>
        <p className={ burgerConstructorStyles.price }>
          <span className={`${ burgerConstructorStyles.text } text text_type_digits-medium`}>{ totalPrice }</span> 
          <CurrencyIcon type="primary" />
        </p>
      <Button type="primary" size="medium" onClick={ handleOrder } disabled={ !currentConstructor.length || !bun }>Оформить заказ</Button>
      </div>
    </section>
  )
};

BurgerConstructor.propTypes = {
  onOrder: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
}

export default BurgerConstructor;
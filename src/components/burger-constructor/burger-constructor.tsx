import React, { FC } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import {ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks';
import { useDrop } from 'react-dnd';
import BurgerConstructorElement from './burger-constructor-element';
import { useHistory } from 'react-router-dom';
import { TIngredient } from '../../services/types/types';

type TBurgerConstructor = {
  onOrder: (order: ReadonlyArray<TIngredient>) => void;
  onDrop: (item: TIngredient) => void;
  onDelete: (item: TIngredient) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
};

const BurgerConstructor: FC<TBurgerConstructor> = ({ onOrder, onDrop, onDelete, onMove }) => {
  const currentConstructor = useSelector((store) => store.currentConstructorReducer.currentConstructor);
  const bun = currentConstructor && currentConstructor.find((item: TIngredient) => item.type === 'bun');
  const history = useHistory();

  const { isAuth } = useSelector((store) => store.authReducer);

  const totalPrice = React.useMemo(() => {
    return (
      currentConstructor.length ? currentConstructor.reduce((total: number, current: TIngredient) => 
    (current.type !== 'bun' ? total + current.price : total + current.price * 2), 0) : 0
    );
  }, [currentConstructor]);
  
  const handleOrder = () => {
    if (isAuth) {
      onOrder(currentConstructor);
    } else {
      history.push('/login');
    }
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      onDrop(item);
    }
  });

  const currentElement = React.useMemo(() => currentConstructor
      .filter((item: TIngredient) => item.type !== 'bun')
      .map((element: TIngredient, index: number) => (
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
          <CurrencyIcon type='primary' />
        </p>
      <Button type='primary' size='medium' onClick={ handleOrder } disabled={ !currentConstructor.length || !bun }>Оформить заказ</Button>
      </div>
    </section>
  )
};


export default BurgerConstructor;
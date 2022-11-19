import React, { FC } from 'react';
import { useSelector } from '../../services/hooks';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from '../../services/types/types';

type TBurgerIngredient = {
  element: TIngredient;
  onClick: () => void;
};

const BurgerIngredient: FC<TBurgerIngredient> = ({ element, onClick }) => {
  const currentConstructor = useSelector((store) => store.currentConstructorReducer.currentConstructor);
  const counter = React.useMemo(() => {
    return (
      currentConstructor.filter((item: TIngredient) => item.type === 'bun' && item._id === element._id).length * 2 
      || currentConstructor.filter((item: TIngredient) => item._id === element._id).length
    );
  }, [currentConstructor]);

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: element
  });

  const location = useLocation();
  const ingredientId = element._id;

  return (
    <Link
      key={ ingredientId }
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={ burgerIngredientsStyles.link }
    >
      <div
        className={ burgerIngredientsStyles.item }
        id={ element._id }
        onClick={ onClick }
        ref={ dragRef }
        draggable
      >
        {counter !== 0 ? (<Counter count={ counter } size="default" />) 
          : (<Counter count={ 0 } size={ undefined } />)}
        <img src={element.image} className={ burgerIngredientsStyles.image } alt={ element.name } />
        <p className={ burgerIngredientsStyles.price }>
          <span className='text text_type_digits-default'>{ element.price }</span>
        <CurrencyIcon type="primary" />
        </p>
        <p className={ `${burgerIngredientsStyles.text } text text_type_main-default`}>{ element.name }</p>
      </div>
    </Link>
  );
}

export default BurgerIngredient;
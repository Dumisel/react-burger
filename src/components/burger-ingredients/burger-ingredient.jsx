import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';

function BurgerIngredient({ element, onClick }) {
  const currentConstructor = useSelector((store) => store.currentConstructorReducer.currentConstructor);
  const counter = React.useMemo(() => {
    return (
      currentConstructor.filter((item) => item.type === 'bun' && item._id === element._id).length * 2 
      || currentConstructor.filter((item) => item._id === element._id).length
    );
  }, [currentConstructor]);

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: element
  });

  return (
    <div
      className={ burgerIngredientsStyles.item }
      id={ element._id }
      onClick={ onClick }
      ref={ dragRef }
      draggable
    >
      {counter !== 0 ? (<Counter count={ counter } size="default" />) 
        : (<Counter count={ null } size="undefined" />)}
      <img src={element.image} className={ burgerIngredientsStyles.image } alt={ element.name } />
      <p className={ burgerIngredientsStyles.price }>
        <span className='text text_type_digits-default'>{ element.price }</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={ `${burgerIngredientsStyles.text } text text_type_main-default`}>{ element.name }</p>
    </div>
  );
}

BurgerIngredient.propTypes = {
  element: PropTypes.oneOfType([PropTypes.object, ingredientType]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BurgerIngredient;
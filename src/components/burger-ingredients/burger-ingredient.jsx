import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';

function BurgerIngredient({ element, onClick }) {
  const currentConstructor = useSelector((store) => store.burger.currentConstructor);
  const counter = currentConstructor.filter((item) => item.type === 'bun' && item._id === element._id).length * 2 
                  || currentConstructor.filter((item) => item._id === element._id).length;

  const [, ref] = useDrag({
    type: 'ingredient',
    item: element
  });

  return (
    <div
      className={ burgerIngredientsStyles.item }
      id={ element._id }
      onClick={ onClick }
      ref={ ref }
      draggable
    >
      <Counter count={ counter } size="default" />
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
import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';
import BurgerIngredient from './burger-ingredient';

const BurgerIngredientsSection = React.forwardRef(({ type, name, onClick }, ref) => {
  const ingredients = useSelector(store => store.ingredientsReducer.ingredients);

  return (
		<li ref={ ref }>
      <h2 className='text text_type_main-medium text_color_primary'>{ name }</h2>
      <div className={ burgerIngredientsStyles.grid }>
        { ingredients && ingredients.filter(item => item.type === type).map((element, index) => (
          <BurgerIngredient element={ element } onClick={() => onClick(element)} key={ element._id } />))}
      </div>
    </li>
	)
})

BurgerIngredientsSection.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default BurgerIngredientsSection;
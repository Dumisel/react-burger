import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { useSelector } from '../../services/hooks/hooks';
import BurgerIngredient from './burger-ingredient';
import { TIngredient } from '../../services/types/types';

type TBurgerIngredientsSection = {
  type: string;
  name: string;
  onClick: (el: TIngredient) => void;
};

const BurgerIngredientsSection = React.forwardRef<HTMLLIElement, TBurgerIngredientsSection>
  (({ type, name, onClick }, ref) => {
      
  const ingredients = useSelector(store => store.ingredientsReducer.ingredients);
 
  return (
		<li ref={ ref }>
      <h2 className='text text_type_main-medium text_color_primary'>{ name }</h2>
      <div className={ burgerIngredientsStyles.grid }>
        { ingredients.filter((item: TIngredient) => item.type === type).map((element: TIngredient) => (
          <BurgerIngredient element={ element } onClick={() => onClick(element)} key={ element._id } />))}
      </div>
    </li>
	)
})

export default BurgerIngredientsSection;
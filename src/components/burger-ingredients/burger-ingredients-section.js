import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
import { data } from '../../utils/data';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerIngredientsSection = (data) => {
	return (
		<li>
      <h2 className='text text_type_main-medium text_color_primary'>{ data.name }</h2>
      <div className={ burgerIngredientsStyles.grid }>
        { data.ingredients.filter(item => item.type === data.type).map((element, index) => (
        <div className={ burgerIngredientsStyles.item } key={ element._id}>
        <Counter count={ 1 } size="default" />
        <img src={ element.image } className={ burgerIngredientsStyles.image } alt={ element.name } />
        <p className={ burgerIngredientsStyles.price }>
        	<span className='text text_type_digits-default'>{ element.price }</span> 
					<CurrencyIcon type="primary" />
        </p>
        <p className={`${burgerIngredientsStyles.text} text text_type_main-default`}>{ element.name }</p>
        </div>
  			))}               
      </div>
    </li>
	)
}

BurgerIngredientsSection.propTypes = {
  ingredientType,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
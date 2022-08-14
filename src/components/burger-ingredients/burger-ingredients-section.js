import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredientsSection = ({ ingredients, type, name, onClick }) => {
  return (
		<li>
      <h2 className='text text_type_main-medium text_color_primary'>{ name }</h2>
      <div className={ burgerIngredientsStyles.grid }>
        { ingredients.filter(item => item.type === type).map((element, index) => (
        <div className={ burgerIngredientsStyles.item } key={ element._id } onClick={() => onClick(element)}>
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
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default BurgerIngredientsSection;
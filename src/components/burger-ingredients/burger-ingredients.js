import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsCard } from './burger-ingredients-card';

export const BurgerIngredients = ({ ingredients }) => {
	const [current, setCurrent] = React.useState('Булки');
  return (
		<section className={ burgerIngredientsStyles.container }>
			<h1 className={`${burgerIngredientsStyles.title} 'text text_type_main-large`}>Соберите бургер</h1>
			<div className={burgerIngredientsStyles.tabs}>
      	<Tab value="Булки" active={ current === 'Булки' } onClick={ setCurrent }>
        	Булки
      	</Tab>
      	<Tab value="Соусы" active={ current === 'Соусы' } onClick={ setCurrent }>
        	Соусы
      	</Tab>
      	<Tab value="Начинки" active={ current === 'Начинки' } onClick={ setCurrent }>
        	Начинки
      	</Tab>
    	</div>
			<ul className={ burgerIngredientsStyles.list }>
        <BurgerIngredientsCard ingredients={ ingredients } type='bun' name='Булки' />
        <BurgerIngredientsCard ingredients={ ingredients } type='sauce' name='Соусы' />
        <BurgerIngredientsCard ingredients={ ingredients } type='main' name='Начинки' />
      </ul>
		</section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape ({
    "_id": PropTypes.string.isRequired,
     "name": PropTypes.string.isRequired,
     "type": PropTypes.string.isRequired,
     "proteins": PropTypes.number.isRequired,
     "fat": PropTypes.number.isRequired,
     "carbohydrates": PropTypes.number.isRequired,
     "calories": PropTypes.number.isRequired,
     "price": PropTypes.number.isRequired,
     "image": PropTypes.string.isRequired,
     "image_mobile": PropTypes.string.isRequired,
     "image_large": PropTypes.string.isRequired,
     "__v": PropTypes.number.isRequired
  })
	)
}
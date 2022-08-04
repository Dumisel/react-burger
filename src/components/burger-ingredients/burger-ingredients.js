import React from 'react';
import PropTypes from 'prop-types';
import { ingredientsArrayType } from '../../utils/types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsSection } from './burger-ingredients-section';

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
        <BurgerIngredientsSection ingredients={ ingredients } type='bun' name='Булки' />
        <BurgerIngredientsSection ingredients={ ingredients } type='sauce' name='Соусы' />
        <BurgerIngredientsSection ingredients={ ingredients } type='main' name='Начинки' />
      </ul>
		</section>
  )
}

BurgerIngredients.propTypes = {
  ingredientsArrayType
}
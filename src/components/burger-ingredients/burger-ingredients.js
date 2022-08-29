import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsSection from './burger-ingredients-section';

const BurgerIngredients = ({ handleOpenModal }) => {
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
        <BurgerIngredientsSection type='bun' name='Булки' onClick={ handleOpenModal } />
        <BurgerIngredientsSection type='sauce' name='Соусы'  onClick={ handleOpenModal } />
        <BurgerIngredientsSection type='main' name='Начинки' onClick={ handleOpenModal } />
      </ul>
		</section>
  )
}

BurgerIngredients.propTypes = {
	handleOpenModal: PropTypes.func.isRequired
}

export default BurgerIngredients;
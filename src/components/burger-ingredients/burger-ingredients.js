import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsSection from './burger-ingredients-section';

const BurgerIngredients = ({ handleOpenModal }) => {
	
	const bunRef = React.useRef();
  const sauceRef = React.useRef();
  const mainRef = React.useRef();

	const [current, setCurrent] = React.useState('Булки');

  const switchTabs = (value) => {
    setCurrent(value);
    switch (value) {
      case 'Булки': {
        bunRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'Соусы': {
        sauceRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'Начинки': {
        mainRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      default: {
        bunRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  return (
		<section className={ burgerIngredientsStyles.container }>
			<h1 className={`${burgerIngredientsStyles.title} 'text text_type_main-large`}>Соберите бургер</h1>
			<div className={burgerIngredientsStyles.tabs}>
      	<Tab value="Булки" active={ current === 'Булки' } onClick={ switchTabs }>
        	Булки
      	</Tab>
      	<Tab value="Соусы" active={ current === 'Соусы' } onClick={ switchTabs }>
        	Соусы
      	</Tab>
      	<Tab value="Начинки" active={ current === 'Начинки' } onClick={ switchTabs }>
        	Начинки
      	</Tab>
    	</div>
			<ul className={ burgerIngredientsStyles.list }>
        <BurgerIngredientsSection type='bun' name='Булки' onClick={ handleOpenModal } ref={bunRef} />
        <BurgerIngredientsSection type='sauce' name='Соусы'  onClick={ handleOpenModal } ref={sauceRef} />
        <BurgerIngredientsSection type='main' name='Начинки' onClick={ handleOpenModal } ref={mainRef}/>
      </ul>
		</section>
  )
}

BurgerIngredients.propTypes = {
	handleOpenModal: PropTypes.func.isRequired
}

export default BurgerIngredients;
import React, { FC } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsSection from './burger-ingredients-section';
import { TIngredient } from '../../services/types/types';

type TBurgerIngredients = {
  handleOpenModal: (element: TIngredient) => void;
};

const BurgerIngredients: FC<TBurgerIngredients> = ({ handleOpenModal }) => {

	const bunRef = React.useRef<HTMLLIElement>(null);
  const sauceRef = React.useRef<HTMLLIElement>(null);
  const mainRef = React.useRef<HTMLLIElement>(null);
  const scrollRef = React.useRef<HTMLUListElement>(null);

	const [current, setCurrent] = React.useState('Булки');

  const switchTabs = (value: string) => {
    setCurrent(value);
    switch (value) {
      case 'Булки': {
        bunRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'Соусы': {
        sauceRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'Начинки': {
        mainRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      default: {
        bunRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleTabChange = () => {
    const container = scrollRef.current;
    const containerTop = container?.getBoundingClientRect().top as number;
    const bunTop = bunRef.current?.getBoundingClientRect().top as number;
    const sauceTop = sauceRef.current?.getBoundingClientRect().top as number;
    const mainTop = mainRef.current?.getBoundingClientRect().top as number;
    const offset = [
      { name: 'Булки', value: Math.abs(containerTop - bunTop) },
      { name: 'Соусы', value: Math.abs(containerTop - sauceTop) },
      { name: 'Начинки', value: Math.abs(containerTop - mainTop) },
    ];
    const closest = offset.sort((a, b) => a.value - b.value)[0].name;
    if (current !== closest) {
      setCurrent(closest);
    }
  };

  return (
		<section className={ burgerIngredientsStyles.container }>
			<h1 className={`${burgerIngredientsStyles.title} 'text text_type_main-large`}>Соберите бургер</h1>
			<div className={burgerIngredientsStyles.tabs}>
      	<Tab value="Булки" active={ current === 'Булки' } onClick={ switchTabs }>Булки</Tab>
      	<Tab value="Соусы" active={ current === 'Соусы' } onClick={ switchTabs }>Соусы</Tab>
      	<Tab value="Начинки" active={ current === 'Начинки' } onClick={ switchTabs }>Начинки</Tab>
    	</div>
			<ul className={ burgerIngredientsStyles.list } onScroll={handleTabChange}>
        <BurgerIngredientsSection type='bun' name='Булки' onClick={ handleOpenModal } ref={ bunRef } />
        <BurgerIngredientsSection type='sauce' name='Соусы'  onClick={ handleOpenModal } ref={ sauceRef } />
        <BurgerIngredientsSection type='main' name='Начинки' onClick={ handleOpenModal } ref={ mainRef }/>
      </ul>
		</section>
  )
}

export default BurgerIngredients;
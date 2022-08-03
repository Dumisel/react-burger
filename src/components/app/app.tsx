import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { data } from '../../utils/data';
import Main from '../main/main';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

export const  App = () => {
  const [ingredients] = React.useState(data);
  return (
    <div className={ appStyles.app }>
      <AppHeader />
      <Main>
        <BurgerIngredients ingredients={ ingredients } />
        <BurgerConstructor ingredients={ ingredients } />
      </Main>
    </div>
  )
}
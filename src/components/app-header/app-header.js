import React from 'react';
import headerStyles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {
  render() {
    return (
    <header className={ headerStyles.header }>
      <div className={ headerStyles.content }>
        <nav className={ headerStyles.navigation }>
          <a href='#' className={ headerStyles.link }>
            <BurgerIcon type="primary" />
            <p className='text text_type_main-default'>Конструктор</p>
          </a>
          <a href='#' className={ headerStyles.link }>
            <ListIcon type="secondary" />
            <p className='text text_type_main-default'>Лента заказов</p>
          </a>
        </nav>
        <p className={ headerStyles.logo }><Logo /></p>
        <button className={ headerStyles.button }>
          <ProfileIcon type="secondary" />
          <p className='text text text_type_main-default'>Личный кабинет</p>
        </button>
      </div>
    </header>
    )
  }
}

export default AppHeader;
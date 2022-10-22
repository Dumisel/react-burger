import { NavLink } from 'react-router-dom';
import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
  <header className={ headerStyles.header }>
    <div className={ headerStyles.content }>
      <nav className={ headerStyles.navigation }>
      <NavLink exact={ true } to='/' className={ headerStyles.link } activeClassName={ headerStyles.linkActive }>
          <BurgerIcon type='secondary' />
          <p className='text text_type_main-default'>Конструктор</p>
        </NavLink>
        <NavLink to='/orders' className={ headerStyles.link } activeClassName={ headerStyles.linkActive }>
          <ListIcon type='secondary' />
          <p className='text text_type_main-default'>Лента заказов</p>
        </NavLink>
      </nav>
      <p className={ headerStyles.logo }><Logo /></p>
      <NavLink to='/profile' className={ headerStyles.button } activeClassName={ headerStyles.linkActive }>
        <ProfileIcon type='secondary' />
        <p className='text text_type_main-default'>Личный кабинет</p>
      </NavLink>
    </div>
  </header>
  )
}

export default AppHeader;
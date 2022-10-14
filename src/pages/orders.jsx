import { NavLink } from "react-router-dom";
import profileStyles from './profile.module.css';
import { logout } from '../services/actions/actions';
import { useDispatch } from 'react-redux';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={ profileStyles.container }>
      <div className={ profileStyles.menu }>
        <nav className={profileStyles.navigation}>
          <NavLink to='/profile' exact={ true } className={ `${profileStyles.link} text text_type_main-medium text_color_inactive`} activeClassName={ profileStyles.linkActive }>Профиль</NavLink>
          <NavLink to='/profile/orders' exact={ true } className={ `${profileStyles.link} text text_type_main-medium text_color_inactive` } activeClassName={ profileStyles.linkActive }>История заказов</NavLink>
          <button type="button" className={ `${profileStyles.link} text text_type_main-medium text_color_inactive` } onClick={ handleLogout }>Выход</button>
        </nav>
        <p className={`${profileStyles.subtitle} text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    </div>
  );
}

export default OrdersPage;
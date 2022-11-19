import { FC } from 'react';
import { NavLink } from "react-router-dom";
import profileStyles from './profile.module.css';
import { logout } from '../services/actions/actions';
import { useDispatch } from '../services/hooks';
import FeedProfile from '../components/feed/feed-profile';

const OrdersPage: FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={ profileStyles.container }>
      <div className={ profileStyles.menu }>
        <nav className={ profileStyles.navigation }>
          <NavLink to='/profile' exact={ true } className={ `${profileStyles.link} text text_type_main-medium text_color_inactive`} activeClassName={ profileStyles.linkActive }>
            Профиль
          </NavLink>
          <NavLink to='/profile/orders' exact={ true } className={ `${profileStyles.link} text text_type_main-medium text_color_inactive` } activeClassName={ profileStyles.linkActive }>
            История заказов
          </NavLink>
          <button type="button" className={ `${profileStyles.link} text text_type_main-medium text_color_inactive` } onClick={ handleLogout }>
            Выход
          </button>
        </nav>
        <p className={ `${profileStyles.caption} text text_type_main-default text_color_inactive` }>
          В этом разделе вы можете посмотреть свою историю заказов
        </p>
      </div>
      <div className={ profileStyles.feed }>
        <FeedProfile />
      </div>
    </div>)}

export default OrdersPage;
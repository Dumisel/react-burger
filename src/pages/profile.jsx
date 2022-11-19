import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { logout, updateUser } from '../services/actions/actions';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './profile.module.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const [form, setForm] = React.useState({ name: '', email: '', password: '' });
  const [buttonsVisible, setButtonsVisible] = React.useState(false);

  const { user } = useSelector((store) => store.authReducer);

  React.useEffect(() => {
    setForm({ ...user, password: '' });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setButtonsVisible(true);
  };

  const handleReset = () => {
    setForm({ ...user, name: '', email: '', password: '' });
    setButtonsVisible(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUserUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(form));
    setButtonsVisible(false);
  };

  return (
    <div className={ profileStyles.container }>
      <div className={ profileStyles.menu }>
        <nav className={profileStyles.navigation}>
          <NavLink to={`${url}`} exact={ true } className={ `${profileStyles.link} text text_type_main-medium text_color_inactive`} activeClassName={ profileStyles.linkActive }>
            Профиль
          </NavLink>
          <NavLink to={`${url}/orders`} exact={ true } className={ `${profileStyles.link} text text_type_main-medium text_color_inactive` } activeClassName={ profileStyles.linkActive }>
            История заказов
          </NavLink>
          <button type="button" className={ `${profileStyles.link} text text_type_main-medium text_color_inactive` } onClick={ handleLogout }>
            Выход
          </button>
        </nav>
        <p className={`${profileStyles.caption} text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={ profileStyles.form } onSubmit={ handleUserUpdate }>
        <Input
          type='text'
          name='name'
          value={ form.name }
          placeholder='Имя'
          icon='EditIcon'
          onChange={ handleChange }
        />
        <Input
          type='email'
          name='email'
          value={ form.email }
          placeholder='Логин'
          icon='EditIcon'
          onChange={ handleChange }
        />
        <Input
          type='password'
          name='password'
          value={ form.password }
          placeholder='Пароль'
          icon='EditIcon'
          onChange={ handleChange }
        />
        { buttonsVisible && (
          <div className={ profileStyles.buttons }>
            <Button type='button' className={ `${ profileStyles.resetButton } text text_type_main-default`} onClick={ handleReset }>Отмена</Button>
            <Button >Сохранить</Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ProfilePage;
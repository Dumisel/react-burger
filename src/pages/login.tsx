import React, { FC } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/hooks/hooks';
import loginStyles from './login.module.css';
import { login } from '../services/actions/authActions';
import { TLocation } from '../services/types/types';
import { useForm } from '../services/hooks/useForm';

const LoginPage: FC = () => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const location = useLocation<TLocation>();
  const dispatch = useDispatch();

  const { form, handleChange } = useForm({});

  const [show, setShow] = React.useState(false);
  const icon = show ? 'ShowIcon' : 'HideIcon';
  const type = show ? 'text' : 'password';

  const toggleVisibility = () => {
    setShow(!show);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(form));
  };

  if (isAuth) {
    return (
      <Redirect to={ location.state?.from || '/' } />
    );
  }

  return (
    <div className={ loginStyles.container }>
      <h1 className='text text_type_main-medium'>Вход</h1>
      <form className={ loginStyles.form } onSubmit={handleLogin}>
        <Input
          type='email'
          name='email'
          value={ form.email || ''}
          placeholder='E-mail'
          onChange={ handleChange }
        />
        <Input
          type={ type }
          name='password'
          value={form.password || ''}
          placeholder='Пароль'
          icon={ icon }
          onChange={ handleChange }
          onIconClick={ toggleVisibility }
        />
        <Button htmlType='submit' type='primary' size='medium'>Войти</Button>
      </form>
      <p className={ `${ loginStyles.subtitle } text text_type_main-default text_color_inactive` }>
        Вы — новый пользователь?
        <Link to='/register' className={ loginStyles.link }>Зарегистрироваться</Link>
      </p>
      <p className={ `${ loginStyles.subtitle } text text_type_main-default text_color_inactive` }>
        Забыли пароль?
        <Link to='/forgot-password' className={ loginStyles.link }>Восстановить пароль</Link>
      </p>
    </div>
  );
}

export default LoginPage;
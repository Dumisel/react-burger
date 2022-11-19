import React, { FC } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { register } from '../services/actions/actions';
import loginStyles from './login.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { TLocation } from '../services/types/types';

const RegisterPage: FC = () => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const location = useLocation<TLocation>();
  const dispatch = useDispatch();

  const [form, setForm] = React.useState({ name: '', email: '', password: '' });

  const [show, setShow] = React.useState(false);

  const icon = show ? 'ShowIcon' : 'HideIcon';
  const type = show ? 'text' : 'password';

  const toggleVisibility = () => {
    setShow(!show);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(form));
  };

  if (isAuth) {
    return (
      <Redirect to={ location.state?.from || '/' }/>
    );
  }

  return (
    <div className={loginStyles.container}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <form className={ loginStyles.form } onSubmit={ handleRegister }>
        <Input
          type='text'
          name='name'
          value={ form.name }
          placeholder='Имя'
          onChange={ handleChange }
        />
        <Input
          type='email'
          name='email'
          value={ form.email }
          placeholder='E-mail'
          onChange={ handleChange }
        />
        <Input
          type={ type }
          name='password'
          value={ form.password }
          placeholder='Пароль'
          icon={ icon }
          onIconClick={ toggleVisibility }
          onChange={ handleChange }
        />
        <Button type='primary' size='medium'>Зарегистрироваться</Button>
      </form>
      <p className='text text_type_main-default text_color_inactive'>
        Уже зарегистрированы?
        <Link to='/login' className={ loginStyles.link }>Войти</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
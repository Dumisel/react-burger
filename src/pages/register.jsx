import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import Form from '../components/form/form';
import { register } from '../services/actions/actions';
import loginStyles from './login.module.css';

const RegisterPage = () => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const location = useLocation();
  const dispatch = useDispatch();
  const fields = [
    { name: 'name', type: 'text', placeholder: 'Имя' },
    { name: 'email', type: 'email', placeholder: 'E-mail' },
    { name: 'password', type: 'password', placeholder: 'Пароль' },
  ];

  const [form, setForm] = React.useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
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
      <Form
        fields={ fields }
        button="Зарегистрироваться"
        form={ form }
        onChange={ handleChange }
        onSubmit={ handleRegister }
      />
      <p className='text text_type_main-default text_color_inactive'>
        Уже зарегистрированы?
        <Link to='/login' className={ loginStyles.link }>Войти</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
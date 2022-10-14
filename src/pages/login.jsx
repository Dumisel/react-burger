import React from 'react';
import { useLocation, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import loginStyles from './login.module.css';
import Form from '../components/form/form';
import { login } from '../services/actions/actions';

const LoginPage = () => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const location = useLocation();
  const dispatch = useDispatch();
  const fields = [
    { name: 'email', type: 'email', placeholder: 'E-mail' },
    { name: 'password', type: 'password', placeholder: 'Пароль' },
  ];

  const [form, setForm] = React.useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
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
      <Form
        fields={ fields }
        button='Войти'
        form={ form }
        onChange={ handleChange }
        onSubmit={ handleLogin }
      />
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
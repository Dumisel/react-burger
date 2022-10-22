import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Form from '../components/form/form';
import { resetPassword } from '../services/actions/actions';
import loginStyles from './login.module.css';

const ResetPasswordPage = () => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const history = useHistory();
  const previousPath = history.location.state?.previousPath;
  const dispatch = useDispatch();
  const fields = [
    { name: 'password', type: 'password', placeholder: 'Введите новый пароль' },
    { name: 'token', type: 'text', placeholder: 'Введите код из письма' },
  ];

  const [form, setForm] = React.useState({ password: '', token: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword(form));
    history.push('/login');
  };

  if (isAuth) {
    return (
      <Redirect to= '/' />
    );
  }

  if (!previousPath) {
    return (
      <Redirect to={{
        pathname: '/login',
      }}
      />
    );
  }

  return (
    <div className={ loginStyles.container }>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <Form
        fields={ fields }
        button='Сохранить'
        form={ form }
        onChange={ handleChange }
        onSubmit={ handleResetPassword }
      />
      <p className='text text_type_main-default text_color_inactive'>
        Вспомнили пароль?
        <Link to='/login' className={ loginStyles.link }>Войти</Link>
      </p>
    </div>
  );
}

export default ResetPasswordPage;
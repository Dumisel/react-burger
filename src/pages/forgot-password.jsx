import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import loginStyles from './login.module.css';
import Form from '../components/form/form';
import { requestResetCode } from '../services/actions/actions';

const ForgotPasswordPage = () => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const fields = [
    { name: 'email', type: 'email', placeholder: 'Укажите e-mail' },
  ];

  const [form, setForm] = React.useState({ email: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRequestCode = (e) => {
    e.preventDefault();
    dispatch(requestResetCode(form.email));
    history.push({ pathname: '/reset-password', state: { previousPath: history.location.pathname } });
  };

  if (isAuth) {
    return (
      <Redirect to= '/' />
    );
  }

  return (
    <div className={loginStyles.container}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <Form
        fields={ fields}
        button='Восстановить'
        form={ form }
        onChange={ handleChange }
        onSubmit={ handleRequestCode }
      />
      <p className='text text_type_main-default text_color_inactive'>
        Вспомнили пароль?
        <Link to='/login' className={ loginStyles.link }>Войти</Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
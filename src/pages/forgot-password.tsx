import React,{ FC } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/hooks/hooks';
import loginStyles from './login.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { requestResetCode } from '../services/actions/authActions';
import { useForm } from '../services/hooks/useForm';

const ForgotPasswordPage: FC = () => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const { form, handleChange } = useForm({});

  const handleRequestCode = (e: React.FormEvent<HTMLFormElement>) => {
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
      <form className={ loginStyles.form } onSubmit={ handleRequestCode }>
        <Input
          type='email'
          name='email'
          value={ form.email || '' }
          placeholder='Укажите e-mail'
          onChange={ handleChange }
        />
        <Button htmlType='submit' type='primary' size='medium'>Восстановить</Button>
      </form>
      <p className='text text_type_main-default text_color_inactive'>
        Вспомнили пароль?
        <Link to='/login' className={ loginStyles.link }>Войти</Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
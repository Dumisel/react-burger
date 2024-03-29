import React, { FC } from 'react';
import { useDispatch, useSelector } from '../services/hooks/hooks';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { resetPassword } from '../services/actions/authActions';
import loginStyles from './login.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../services/hooks/useForm';

const ResetPasswordPage: FC = () => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const history = useHistory() as any;
  const previousPath = history.location.state?.previousPath;
  const dispatch = useDispatch();

  const { form, handleChange } = useForm({});

  const [show, setShow] = React.useState(false);
  const icon = show ? 'ShowIcon' : 'HideIcon';
  const type = show ? 'text' : 'password';

  const toggleVisibility = () => {
    setShow(!show);
  };

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
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
      <form className={ loginStyles.form } onSubmit={handleResetPassword}>
        <Input
          type={ type }
          name='token'
          value={ form.password || '' }
          placeholder='Введите новый пароль'
          icon={ icon }
          onIconClick={ toggleVisibility }
          onChange={ handleChange }
        />
        <Input
          type='text'
          name='password'
          value={ form.token || '' }
          placeholder='Введите код из письма'
          onChange={ handleChange }
        />
        <Button htmlType='submit' type='primary' size='medium'>Сохранить</Button>
      </form>
      <p className='text text_type_main-default text_color_inactive'>
        Вспомнили пароль?
        <Link to='/login' className={ loginStyles.link }>Войти</Link>
      </p>
    </div>
  );
}

export default ResetPasswordPage;
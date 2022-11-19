import React, { FC } from 'react';
import notFoundStyles from './not-found.module.css';

const NotFoundPage: FC = () => {
  return (
    <div className={notFoundStyles.container}>
      <p className='text text_type_main-medium'>Страница не найдена</p>
      <p className='text text_type_digits-large'>404</p>
    </div>
  );
}

export default NotFoundPage;
import { FC } from 'react';
import doneImagePath from '../images/done.jpg';

const DoneImage: FC = () => {
  return (
    <img src={ doneImagePath } alt='Успешно' />
  );
}

export default DoneImage;
import { FC, ReactNode } from 'react';
import mainStyles from './main.module.css';

type TMain = {
  children: ReactNode;
};

const Main: FC<TMain> = ({ children }) => {
  return (
    <div className={ mainStyles.main }>
      { children }
    </div>
  )
}

export default Main;
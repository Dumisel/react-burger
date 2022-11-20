import { FC } from 'react';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import Main from '../components/main/main';
import { TIngredient } from '../services/types/types';

type TConstructorPage = {
  handleOpenModal: (element: TIngredient) => void;
  onOrder: (order: ReadonlyArray<TIngredient>) => void;
  onDrop: (item: TIngredient) => void;
  onMove: (dragIndex: any, hoverIndex: any) => void;
  onDelete: (item: TIngredient) => void;
};

const ConstructorPage: FC<TConstructorPage> = ({
  handleOpenModal,
  onOrder,
  onDrop,
  onMove,
  onDelete
}) => {

  return (
    <Main>
      <BurgerIngredients handleOpenModal={ handleOpenModal } />
      <BurgerConstructor onOrder={ onOrder } onDrop={ onDrop } onMove={ onMove } onDelete={ onDelete } />
    </Main>
  );
}

export default ConstructorPage;



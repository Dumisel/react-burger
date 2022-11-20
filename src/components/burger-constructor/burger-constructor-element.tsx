import React, { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import { TIngredient } from '../../services/types/types';

type TBurgerConstructorElement = {
  element: TIngredient;
  onDelete: (item: TIngredient) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  index: number;
  id: string;
};

type TDragItem = {
  index: number
  id: string
  type: string
};

const BurgerConstructorElement: FC<TBurgerConstructorElement> = React.memo(({ element, id, index, onDelete, onMove }) => {
  const { name, price, image } = element;
  const ref = React.useRef<HTMLLIElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'constructorElement',
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });


  const [, dropRef] = useDrop({
    accept: 'constructorElement',
    drop(item: TDragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      onMove(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <li
      className={`${burgerConstructorStyles.ingredient} ${isDragging && burgerConstructorStyles.isDragging}`}
      ref={ ref }
      draggable
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={ false }
        text={ name }
        price={ price }
        thumbnail={ image }
        handleClose={() => onDelete(element)}
      />
    </li>
  );
});

export default BurgerConstructorElement;
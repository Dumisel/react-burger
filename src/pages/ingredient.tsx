import React, { FC } from 'react';
import { useSelector } from '../services/hooks';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import ingredientStyles from './ingredient.module.css';
import { TIngredient } from '../services/types/types';

type TParams = {
  id: string;
};

const IngredientPage: FC = () => {
  const { id } = useParams<TParams>();
  const ingredients = useSelector((store) => store.ingredientsReducer.ingredients);
  const currentIngredient = React.useMemo(() => ingredients
    .find((item: TIngredient) => item._id === id), [ingredients]);


  return (
    <div className={ ingredientStyles.container }>
      {currentIngredient && (<IngredientDetails ingredient={currentIngredient} />)}
    </div>
  );
}

export default IngredientPage;
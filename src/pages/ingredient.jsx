import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import ingredientStyles from './ingredient.module.css';

const IngredientPage = () => {
  const { id } = useParams();
  const ingredients = useSelector((store) => store.ingredientsReducer.ingredients);
  const currentIngredient = React.useMemo(() => ingredients
    .find((item) => item._id === id), [ingredients]);


  return (
    <div className={ ingredientStyles.container }>
      {currentIngredient && (<IngredientDetails ingredient={currentIngredient} />)}
    </div>
  );
}

export default IngredientPage;
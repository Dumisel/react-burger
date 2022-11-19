import React, { FC } from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import { TIngredient } from '../../services/types/types';

type TIngredientDetails = {
  ingredient?: TIngredient;
};

type TParams = {
  id: string;
};

const IngredientDetails: FC<TIngredientDetails> = () => {
  const { id } = useParams<TParams>();
  const { ingredients } = useSelector((store) => store.ingredientsReducer);
  const ingredient = ingredients.length && ingredients.find((item: TIngredient) => item._id === id);

  return (
    <div className={ ingredientDetailsStyles.container }>
      { ingredient
      && (
      <>
        <img className={ ingredientDetailsStyles.image } src={ ingredient.image } alt={ ingredient.name }/>
        <p className={ `${ ingredientDetailsStyles.title } text text_type_main-medium` }>{ ingredient.name }</p>
        <ul className={ `${ ingredientDetailsStyles.grid } text text_type_main-default text_color_inactive` }>
          <li className={ ingredientDetailsStyles.element }>
            <p className={ ingredientDetailsStyles.characteristic }>Калории,ккал</p>
            <p className="text text_type_digits-default">{ ingredient.calories }</p>
          </li>
          <li className={ ingredientDetailsStyles.element }>
            <p className={ ingredientDetailsStyles.characteristic }>Белки, г</p>
            <p className="text text_type_digits-default">{ ingredient.proteins }</p>
          </li>
          <li className={ ingredientDetailsStyles.element }>
            <p className={ ingredientDetailsStyles.characteristic }>Жиры, г</p>
            <p className="text text_type_digits-default">{ ingredient.fat }</p>
          </li>
          <li className={ ingredientDetailsStyles.element }>
            <p className={ ingredientDetailsStyles.characteristic }>Углеводы, г</p>
            <p className="text text_type_digits-default">{ ingredient.carbohydrates }</p>
          </li>
        </ul>
      </>)}
    </div>
  );
}

export default IngredientDetails;
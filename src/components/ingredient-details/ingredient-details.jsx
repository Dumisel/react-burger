import ingredientDetailsStyles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
  const ingredient = useSelector((store) => store.ingredientReducer.ingredient);

  return (
    <div className={ ingredientDetailsStyles.container }>
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
    </div>
  );
}

export default IngredientDetails;
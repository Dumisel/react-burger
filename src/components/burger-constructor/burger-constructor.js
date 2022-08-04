import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructor = ({ ingredients }) => {
const bun = ingredients.find(item => item.type === 'bun');
const toppings = ingredients.filter(item => item.type === 'main' || item.type === 'sauce');
  return (
    <section className={burgerConstructorStyles.container}>
      <div className={burgerConstructorStyles.base}>
        <ConstructorElement
          type="top"
          isLocked={ true }
          text={`${ bun.name } (верх)`}
          price={ bun.price }
          thumbnail={ bun.image }
        />
      </div>
      <ul className={burgerConstructorStyles.list}>
        { toppings.map((ingredient, index) => (
        <li className={ burgerConstructorStyles.ingredient } key={ingredient._id}>
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={ false }
            text={ ingredient.name }
            price={ ingredient.price }
            thumbnail={ ingredient.image }
          />
        </li>
        )) }
        </ul>
          <div className={burgerConstructorStyles.base}>
            <ConstructorElement
              type="bottom"
              isLocked={ true }
              text={`${ bun.name } (низ)`}
              price={ bun.price }
              thumbnail={ bun.image }
            />
          </div>
          <div className={burgerConstructorStyles.total}>
            <p className={burgerConstructorStyles.price}>
              <span className={`${burgerConstructorStyles.text} text text_type_digits-medium`}>610</span> <CurrencyIcon type="primary" />
            </p>
            <Button type="primary" size="medium">Оформить заказ</Button>
          </div>
    </section>
  )
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape ({
    "_id": PropTypes.string.isRequired,
     "name": PropTypes.string.isRequired,
     "type": PropTypes.string.isRequired,
     "proteins": PropTypes.number.isRequired,
     "fat": PropTypes.number.isRequired,
     "carbohydrates": PropTypes.number.isRequired,
     "calories": PropTypes.number.isRequired,
     "price": PropTypes.number.isRequired,
     "image": PropTypes.string.isRequired,
     "image_mobile": PropTypes.string.isRequired,
     "image_large": PropTypes.string.isRequired,
     "__v": PropTypes.number.isRequired
    })
  )
}
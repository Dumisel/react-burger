import burgerConstructorStyles from './burger-constructor.module.css';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructor = ({ ingredients }) => {
const bun = ingredients.find(item => item.type === 'bun');
const ingredient = ingredients.filter(item => item.type === 'main' || item.type === 'sauce').slice(1, );
  return (
    <section className={burgerConstructorStyles.container}>
      <div className={burgerConstructorStyles.component}>
        <ConstructorElement
          type="top"
          isLocked={ true }
          text={ bun.name }
          price={ bun.price }
          thumbnail={ bun.image }
        />
      </div>
      <ul className={burgerConstructorStyles.list}>
        {ingredient.map((element) => (
        <li className={burgerConstructorStyles.ingredient} key={element._id}>
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={ false }
            text={ element.name }
            price={ element.price }
            thumbnail={ element.image }
          />
        </li>
        ))}
        </ul>
          <div className={burgerConstructorStyles.component}>
            <ConstructorElement
              type="bottom"
              isLocked={ true }
              text={ bun.name }
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
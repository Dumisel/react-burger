import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, match } from 'react-router-dom';
import { useSelector } from '../../services/hooks/hooks';
import { formatDate, formatStatus } from '../../utils/utils';
import feedElementStyles from './feed-element.module.css';
import { TIngredient } from '../../services/types/types';

type TFeedElement = {
  number: number;
  name: string;
  status: string;
  createdAt: string;
  components: Array<string | TIngredient>;
  isUserOrders: match<{}> | null
}

const FeedElement: FC<TFeedElement> = ({ number, name, status, createdAt, components, isUserOrders }) => {
  const location = useLocation();
  const ingredients = useSelector((store) => store.ingredientsReducer.ingredients);
  const orderIngredients = React.useMemo(() =>
    components.length && ingredients.length ? Object.values(components
      .map((item) => {
        return ingredients.find((element: TIngredient) => element._id === item)
      })
      .filter((item) => item !== undefined)
      .reduce((total: any, current: any) => {
        total[current.name] = total[current.name]
        ? { ...total[current.name],
            count: total[current.name].count += 1
          }
        : { ...current, count: 1 };
            return total;
      }, {} as Record<string, TIngredient & { count : number }>))
      .sort((ingredient: any) => (ingredient.type === "bun" ? -1 : 1))
    : [], [components, ingredients]
  );

  const feedIngredients = orderIngredients.reverse();
  const price = React.useMemo(() => {
    return feedIngredients.length ? feedIngredients.reduce((total: number, current: any) => 
      (current.count && current.type !== 'bun' ? total + current.price * current.count : total + current.price * 2), 0) : 0;
  }, [feedIngredients]);

  const feedIngredientsToShow = feedIngredients.length > 6
    ? feedIngredients.slice(0, 6)
    : feedIngredients;

  const feedIngredientsToHide = feedIngredients.length > 6
    ? feedIngredients.length - 6
    : 0;

  return (
    <Link 
      to={{
        pathname: `${location.pathname}/${number}`,
        state: { background: location },
      }}
      className={ feedElementStyles.card }
    >
      <p className='text text_type_digits-default'>#{ number }</p>
      <p className={ `${feedElementStyles.date} text text_type_main-default text_color_inactive` }>{ formatDate(createdAt) }</p>
      <p className={ `${feedElementStyles.name} text text_type_main-medium` }>{ name }</p>
      { isUserOrders && <p className={ `${feedElementStyles.status} text text_type_main-default ${status === 'done' && feedElementStyles.done} ${status === 'canceled' && feedElementStyles.canceled}` }>
        { formatStatus(status) }
      </p> }
      <div className={ feedElementStyles.icons }>
        { feedIngredientsToShow.map((item: any, index: number) => (
          <div key={ item._id }>
            <img src={ item.image } alt={ item.name }/>
            { index === 0 && feedIngredientsToHide > 0 && 
            (<span className={ `${feedElementStyles.count} text text_type_digits-default` }>+{ feedIngredientsToHide }</span>)}
          </div>
        ))}
      </div>
      <p className={ `${feedElementStyles.price} text text_type_digits-default` }>
        {price}
        <CurrencyIcon type="primary" />
      </p>
    </Link>
  );
};

export default FeedElement;
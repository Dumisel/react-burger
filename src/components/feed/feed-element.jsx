import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatDate, formatStatus } from '../../utils/utils';
import feedElementStyles from './feed-element.module.css';
import { v4 as uuidv4 } from 'uuid';

const FeedElement = ({ number, name, status, createdAt, components, isUserOrders }) => {
  const location = useLocation();

  const { ingredients } = useSelector((store) => store.ingredientsReducer);
  const orderIngredients = React.useMemo(() =>
    components.length && ingredients.length ? Object.values(components
      .map((item) => {
        return ingredients.find((element) => element._id === item)
      })
      .filter((item) => item !== undefined)
      .reduce((total, current) => {
        total[current.name] = total[current.name]
        ? { ...total[current.name],
            count: total[current.name].count += 1
          }
        : { ...current, count: 1 };
            return total;
      }, {}))
      .sort((item) => (item.type === "bun" ? -1 : 1))
    : [], [components, ingredients]
  );

  const feedIngredients = orderIngredients.reverse();
  const price = React.useMemo(() => {
    return feedIngredients.length ? feedIngredients.reduce((total, current) => 
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
        { feedIngredientsToShow.map((item, index) => (
          <div key={`${item._id}_${uuidv4()}`}>
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
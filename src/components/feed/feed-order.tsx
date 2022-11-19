import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { wsConnectionStart, wsUserConnectionStart,
        wsConnectionClosed, wsUserConnectionClosed
        } from '../../services/actions/wsActions';
import { formatDate, formatStatus } from '../../utils/utils';
import orderStyles from './feed-order.module.css';

type TParams = {
  id: string
};

const FeedOrder: FC = () => {
  const dispatch = useDispatch();

  const isUserOrders = useRouteMatch({ path: '/profile/orders/:id' });

  React.useEffect(() => {
    dispatch(isUserOrders ? wsUserConnectionStart() : wsConnectionStart());
      return () => {
        dispatch(isUserOrders ? wsUserConnectionClosed() : wsConnectionClosed());
      };
    }, []);

  const ingredients = useSelector((store) => store.ingredientsReducer.ingredients);
  const orders= useSelector((store) => store.wsReducer.messages.orders);
  const userOrders = useSelector((store) => store.wsReducer.userMessages.orders);
 
  const { id } = useParams<TParams>();
  const order = orders && orders.find((item) => item.number === +id);
  const userOrder = userOrders && userOrders.find((item) => item.number === +id);
  const currentOrder = isUserOrders ? userOrder : order;
  const orderIngredients = currentOrder ? currentOrder.ingredients : [];

  const feedIngredients = React.useMemo(() =>
    orderIngredients.length && ingredients.length ? Object.values(orderIngredients
      .map((item) => {
        return ingredients
          .find((element) => element._id === item)})
          .filter((ingredient) => ingredient !== undefined)
          .reduce((total: any, current: any) => {
            total[current.name] = total[current.name]
            ? { ...total[current.name],
                count: total[current.name].count + 1}
            : { ...current, count: 1 };
                return total;
          }, {}))
          .sort((ingredient: any) => (ingredient.type === "bun" ? -1 : 1))
    : [], [orderIngredients, ingredients]
  );

  const price = React.useMemo(() => {
    return feedIngredients.length ? feedIngredients.reduce((total: number, current: any) => 
(current.count && current.type !== 'bun' ? total + current.price * current.count : total + current.price * 2), 0) : 0;
}, [feedIngredients]);

  return (
    <div className={orderStyles.container}>
      { currentOrder && (
      <>
        <p className={ `${orderStyles.number} text text_type_digits-default` }>#{ currentOrder.number }</p>
        <h2 className={ `${orderStyles.name} text text_type_main-medium` }>{ currentOrder.name }</h2>
        <p className={ `${orderStyles.status} text text_type_main-default ${currentOrder.status === 'done' && orderStyles.done} ${currentOrder.status === 'canceled' && orderStyles.canceled}` } >
          { formatStatus(currentOrder.status) }
        </p>
        <p className='text text_type_main-medium'>Состав:</p>
        <ul className={ orderStyles.list }>
          {feedIngredients && feedIngredients
            .map((item: any) => (
              <li key={ item._id } className={ orderStyles.item }>
                <div className={ orderStyles.info }>
                  <div className={ orderStyles.icon }>
                    <img src={ item.image } alt={ item.name }/>
                  </div>
                  <p className='text text_type_main-default'>{ item.name }</p>
                </div>
                {item.type === 'bun' 
                  ? (<p className={ `${orderStyles.price} text text_type_digits-default` }>
                    { 2 }{ ' ' } x { ' ' }{ item.price }
                    <CurrencyIcon type="primary" />
                    </p>)
                  : (<p className={ `${orderStyles.price} text text_type_digits-default` }>
                    { item.count }{ ' ' } x { ' ' }{ item.price }
                    <CurrencyIcon type="primary" />
                    </p>)}
              </li>
            ))}
        </ul>
        <div className={ orderStyles.footer }>
          <p className='text text_type_main-default text_color_inactive'>{ formatDate(currentOrder.createdAt) }</p>
          <p className={ `${orderStyles.price} text text_type_digits-default` }>
            { price }
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </>)}
    </div>
  );
};

export default FeedOrder;
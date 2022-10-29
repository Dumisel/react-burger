import React from "react";
import feedStyles from "./feed.module.css";
import FeedElement from "./feed-element";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useRouteMatch } from 'react-router-dom';
import { wsConnectionClosed, wsConnectionStart } from '../../services/actions/wsActions';

const Feed = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
      dispatch(wsConnectionStart());
      return () => {
        dispatch(wsConnectionClosed());
      };
    },[]);

  const orders = useSelector((store) => store.wsReducer.messages.orders);
  const total = useSelector((store) => store.wsReducer.messages.total);
  const totalToday = useSelector((store) => store.wsReducer.messages.totalToday);
  const isUserOrders = useRouteMatch({ path: '/profile/orders' });

  return (
    <div className={ feedStyles.container }>
      <div className={ feedStyles.feed }>
        <ul className={ feedStyles.list }>
        {orders.map((item) => (
          <FeedElement
            key={item._id }
            number={ item.number }
            name={ item.name }
            status={ item.status }
            createdAt={ item.createdAt }
            components={ item.ingredients }
            isUserOrders={ isUserOrders }
          />))}
        </ul>
      </div>
      <div className={ feedStyles.stats }>
        <div className={ feedStyles.production }>
          <div className={ feedStyles.board }>
            <p className={ `${feedStyles.title} text text_type_main-medium` }>Готовы:</p>
            <ul className={ feedStyles.numbers }>
            {orders
              .filter((item) => item.status === 'done')
              .slice(0, 20)
              .map((item) => {
                return (
                  <li className={ `${feedStyles.done} text text_type_digits-default` } key={ item._id }>{ item.number }</li>);
                })}
            </ul>
          </div>
          <div className={ feedStyles.board }>
            <p className={ `${feedStyles.title} text text_type_main-medium` }>В работе:</p>
            <ul className={ feedStyles.numbers }>
            {orders
              .filter((item) => item.status === 'created')
              .slice(0, 20)
              .map((item) => {
                return (
                  <li className={ `${feedStyles.inWork} text text_type_digits-default` } key={ item._id}>{ item.number }</li>);
                })}
            </ul>
          </div>
        </div>
        <div>
          <p className={ `${feedStyles.title} text text_type_main-medium` }>Выполнено за все время:</p>
          <p className={ `${feedStyles.total} text text_type_digits-large` }>{ total }</p>
        </div>
        <div>
          <p className={ `${feedStyles.title} text text_type_main-medium` }>Выполнено за сегодня:</p>
          <p className={ `${feedStyles.total} text text_type_digits-large` } >{ totalToday }</p>
        </div>
      </div>
    </div>
  );
}

export default Feed;






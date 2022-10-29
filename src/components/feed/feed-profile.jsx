import React from "react";
import feedStyles from "./feed-profile.module.css";
import FeedElement from "./feed-element";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useRouteMatch } from 'react-router-dom';
import { wsUserConnectionStart, wsUserConnectionClosed } from '../../services/actions/wsActions';

const FeedProfile = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(wsUserConnectionStart());
      return () => {
        dispatch(wsUserConnectionClosed());
      };
    }, []);

  const isUserOrders = useRouteMatch({ path: '/profile/orders' });
  const userOrders = useSelector((store) => store.wsReducer.userMessages.orders);
  const currentOrders = [...userOrders].reverse();

  return (
    <ul className={feedStyles.list}>
      { currentOrders && currentOrders.map((item) => (
        <FeedElement
        key={ item._id }
        number={ item.number }
        name={ item.name }
        status={ item.status }
        createdAt={ item.createdAt }
        components={ item.ingredients }
        isUserOrders={ isUserOrders }
        />
      ))}
    </ul>

  );
}

export default FeedProfile;






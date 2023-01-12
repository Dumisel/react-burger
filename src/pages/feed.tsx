import { FC } from 'react';
import Feed from "../components/feed/feed";
import feedStyles from "./feed.module.css";

const FeedPage: FC = ()  => {

  return  (
    <div className={ feedStyles.container }>
      <h1 className={ `${feedStyles.title} text text_type_main-large text_color_primary` }>Лента заказов</h1>
      <Feed />
    </div>
  )
}

export default FeedPage;
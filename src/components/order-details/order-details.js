import DoneImage from '../../utils/done-image';
import orderDetailsStyles from './order-details.module.css';

const OrderDetails = () => {
  return (
    <div className={ orderDetailsStyles.container }>
      <h2 className={ `${ orderDetailsStyles.number } text text_type_digits-large` }>034536</h2>
      <p className={ `${ orderDetailsStyles.title } text text_type_main-medium` }>идентификатор заказа</p>
      <DoneImage />
      <p className={ `${ orderDetailsStyles.text } text text_type_main-default` }>Ваш заказ начали готовить</p>
      <p className={ `${ orderDetailsStyles.subtext } text text_type_main-default text_color_inactive` }>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;
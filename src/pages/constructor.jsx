import PropTypes from 'prop-types';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import Main from '../components/main/main';

const ConstructorPage = ({
  handleOpenModal,
  onOrder,
  onDrop,
  onMove,
  onDelete
}) => {

  return (
    <Main>
      <BurgerIngredients handleOpenModal={ handleOpenModal } />
      <BurgerConstructor onOrder={ onOrder } onDrop={ onDrop } onMove={ onMove } onDelete={ onDelete } />
    </Main>
  );
}

ConstructorPage.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
  onOrder: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ConstructorPage;



import PropTypes from 'prop-types';
import mainStyles from './main.module.css';

const Main = ({ children }) => {
  return (
    <div className={ mainStyles.main }>
      { children }
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
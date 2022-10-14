import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import formStyles from './form.module.css';

const Form = ({ fields, button, form, onChange, onSubmit }) => {
  const [ show, setShow ] = React.useState(false);

  const icon = show ? 'ShowIcon' : 'HideIcon';
  const type = show ? 'text' : 'password';

  const toggleVisibility = () => {
    setShow(!show);
  };

  return (
    <form className={ formStyles.form } onSubmit={ onSubmit }>
      { fields.map((element) => (
        <Input
          key={ `${element.name}` }
          type={ element.name === 'password' ? type : element.type }
          name={ element.name }
          value={ form[ element.name ] }
          placeholder={ element.placeholder }
          icon={ element.name === 'password' ? icon : undefined }
          onChange={ onChange }
          onIconClick={ toggleVisibility }
        />
      )) }
      <Button type="primary" size="medium">{ button }</Button>
    </form>
  );
}

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  button: PropTypes.string.isRequired,
  form: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
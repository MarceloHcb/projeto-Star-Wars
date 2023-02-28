import PropTypes from 'prop-types';
import React from 'react';

function Input({ type, handleChange, dataTestid, name, value }) {
  return (
    <input
      type={ type }
      name={ name }
      value={ value }
      onChange={ ({ target }) => handleChange({ target }) }
      data-testid={ dataTestid }
    />
  );
}

Input.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;

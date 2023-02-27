import PropTypes from 'prop-types';
import React from 'react';

function Input({ type, handleChange, dataTestid }) {
  return (
    <input
      type={ type }
      onChange={ ({ target }) => handleChange({ target }) }
      data-testid={ dataTestid }
    />
  );
}

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default Input;

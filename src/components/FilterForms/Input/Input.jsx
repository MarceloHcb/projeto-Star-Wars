import PropTypes from 'prop-types';
import React from 'react';

function Input({ type, handleChange, dataTestid, name, value, placeholder, label }) {
  return (
    <label htmlFor="input">
      {label}
      <input
        type={ type }
        name={ name }
        value={ value }
        id="input"
        onChange={ ({ target }) => handleChange({ target }) }
        data-testid={ dataTestid }
        placeholder={ placeholder }
      />
    </label>
  );
}

Input.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;

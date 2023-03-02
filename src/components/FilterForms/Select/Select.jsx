import PropTypes from 'prop-types';
import React from 'react';

function Select({ options, dataTestid = '',
  onChange = [], name = '', label = '' }) {
  return (
    <label htmlFor="select">
      {label}
      <select
        data-testid={ dataTestid }
        name={ name }
        id="select"
        onChange={ ({ target }) => onChange({ target }) }
      >
        {options.map((el, index) => (
          <option key={ index } value={ el }>
            {el}
          </option>
        ))}
      </select>
    </label>
  );
}

Select.propTypes = {
  dataTestid: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,

};

export default Select;

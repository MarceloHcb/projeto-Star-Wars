import PropTypes from 'prop-types';
import React from 'react';

function Select({ options, dataTestid = '', handleFilterChange = [], name = '' }) {
  return (
    <select
      data-testid={ dataTestid }
      name={ name }
      onChange={ ({ target }) => handleFilterChange({ target }) }
    >
      {options.map((el, index) => (
        <option key={ index } value={ el }>
          {el}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  dataTestid: PropTypes.string,
  handleFilterChange: PropTypes.func,
  name: PropTypes.string,
  options: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,

};

export default Select;

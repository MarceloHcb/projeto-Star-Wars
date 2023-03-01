import PropTypes from 'prop-types';
import React from 'react';

function Button({ type, dataTestid, title, onClick, value }) {
  return (
    <button
      type={ type }
      data-testid={ dataTestid }
      value={ value }
      onClick={ ({ target }) => onClick({ target }) }
    >
      {title}

    </button>
  );
}

Button.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Button;

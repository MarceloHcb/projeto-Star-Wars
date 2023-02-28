import PropTypes from 'prop-types';
import React from 'react';

function Button({ type, dataTestid, title, handleFilterClick }) {
  return (
    <button
      type={ type }
      data-testid={ dataTestid }
      onClick={ () => handleFilterClick() }
    >
      {title}

    </button>
  );
}

Button.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  handleFilterClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;

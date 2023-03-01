import PropTypes from 'prop-types';
import React from 'react';

function FilterComponent({ filteredObjectValues = '' }) {
  return (
    <div>
      {filteredObjectValues.map((fil, index) => (
        <div key={ index }>
          <h2>{fil}</h2>
          <button>delete</button>
        </div>
      ))}
    </div>
  );
}

FilterComponent.propTypes = {
  filteredObjectValues: PropTypes.string.isRequired,
};

export default FilterComponent;

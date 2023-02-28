import PropTypes from 'prop-types';
import React from 'react';

function FilterComponent({ filterObjectName = '' }) {
  return (
    <div>
      {filterObjectName.map((fil, index) => (
        <div key={ index }>
          <h2>{fil}</h2>
          <button>delete</button>
        </div>
      ))}
    </div>
  );
}

FilterComponent.propTypes = {
  filterObjectName: PropTypes.shape({
    map: PropTypes.func,
  }),
};

export default FilterComponent;

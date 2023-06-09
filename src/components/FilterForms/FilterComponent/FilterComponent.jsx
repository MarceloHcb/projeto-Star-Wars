import PropTypes from 'prop-types';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Button from '../Button/Button';
import style from './FilterComponent.module.css';

function FilterComponent({ filteredObjectValues }) {
  const { handleRemoveOneFilter } = useAuth();

  return (
    <div className={ style.container }>
      { filteredObjectValues.objectNames.map((fil, index) => (
        <div data-testid="filter" key={ index }>
          <h2>{fil}</h2>
          {fil
          && <Button
            title="X"
            value={ fil }
            onClick={ handleRemoveOneFilter }
          /> }
        </div>
      ))}
    </div>
  );
}

FilterComponent.propTypes = {
  filteredObjectValues: PropTypes.string.isRequired,
};

export default FilterComponent;

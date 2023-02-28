import React from 'react';
import useAuth from '../../hooks/useAuth';
import Input from './Input/Input';
import Button from './Button/Button';
import Select from './Select/Select';
import FilterComponent from './FilterComponent/FilterComponent';

function FilterForms() {
  const { handleChange, handleFilterClick, handleFilterChange,
    filterObjectName, filterValues } = useAuth();

  const optionsColumn = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const optionsComparison = ['maior que', 'menor que', 'igual a'];

  return (
    <div>
      <Input
        dataTestid="name-filter"
        type="text"
        handleChange={ handleChange }
      />
      <Select
        options={ optionsColumn }
        dataTestid="column-filter"
        name="column"
        handleFilterChange={ handleFilterChange }
      />
      <Select
        options={ optionsComparison }
        dataTestid="comparison-filter"
        name="comparison"
        handleFilterChange={ handleFilterChange }
      />
      <Input
        dataTestid="value-filter"
        type="number"
        name="number"
        handleChange={ handleFilterChange }
        value={ filterValues.number }
      />
      <Button
        type="button"
        dataTestid="button-filter"
        title="FILTRAR"
        handleFilterClick={ handleFilterClick }
      />
      {filterObjectName.length
      > 0 && <FilterComponent filterObjectName={ filterObjectName } /> }

    </div>
  );
}

export default FilterForms;

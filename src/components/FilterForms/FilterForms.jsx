import React from 'react';
import useAuth from '../../hooks/useAuth';
import Input from './Input/Input';
import Button from './Button/Button';
import Select from './Select/Select';
import FilterComponent from './FilterComponent/FilterComponent';

function FilterForms() {
  const { handleChange, handleFilterClick, handleFilterChange,
    filteredObjectValues, numericFilter, optionsColumn,
    optionsComparison, handleRemoveAllFilters } = useAuth();

  return (
    <div>
      <Input
        dataTestid="name-filter"
        type="text"
        name="search"
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
        value={ numericFilter.number }
      />
      <Button
        type="button"
        dataTestid="button-filter"
        title="FILTRAR"
        onClick={ handleFilterClick }
      />
      <Button
        dataTestid="button-remove-filters"
        title="REMOVER FILTROS"
        onClick={ handleRemoveAllFilters }
      />
      {filteredObjectValues.objectNames.length > 0
      && <FilterComponent filteredObjectValues={ filteredObjectValues } /> }

    </div>
  );
}

export default FilterForms;

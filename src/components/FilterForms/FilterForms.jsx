import React from 'react';
import useAuth from '../../hooks/useAuth';
import Input from './Input/Input';
import Button from './Button/Button';
import Select from './Select/Select';
import FilterComponent from './FilterComponent/FilterComponent';
import style from './FilterForms.module.css';

function FilterForms() {
  const { handleChange, handleFilterClick, handleFilterChange,
    filteredObjectValues, numericFilter, optionsColumn, optionsComparison,
    handleRemoveAllFilters, handleOrder, handleOrderClick } = useAuth();

  return (
    <div className={ style.container }>
      <div className={ style.input_filter }>

        <Input
          dataTestid="name-filter"
          type="text"
          name="search"
          handleChange={ handleChange }
          label="Filtrar"
          placeholder="Filtrar por nome"
        />
      </div>
      <Select
        options={ optionsColumn }
        dataTestid="column-filter"
        name="column"
        onChange={ handleFilterChange }
        label="Coluna"
      />
      <Select
        options={ optionsComparison }
        dataTestid="comparison-filter"
        name="comparison"
        onChange={ handleFilterChange }
        label="Operador"
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
      <Select
        dataTestid="column-sort"
        options={ optionsColumn }
        label="Ordenar"
        name="column"
        onChange={ handleOrder }
      />
      <Input
        type="radio"
        label="Ascendente"
        value="ASC"
        name="sort"
        handleChange={ handleOrder }
        dataTestid="column-sort-input-asc"
      />
      <Input
        type="radio"
        label="Descendente"
        value="DESC"
        name="sort"
        handleChange={ handleOrder }
        dataTestid="column-sort-input-desc"
      />
      <Button
        dataTestid="column-sort-button"
        title="ORDENAR"
        onClick={ handleOrderClick }
      />
      {filteredObjectValues.objectNames.length > 0
      && <FilterComponent filteredObjectValues={ filteredObjectValues } /> }

    </div>
  );
}

export default FilterForms;

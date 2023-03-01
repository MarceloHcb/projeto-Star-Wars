import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import useFetch from '../hooks/useFetch';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const BASE_URL = 'https://swapi.dev/api/planets';
  const { dataApi, loading } = useFetch(BASE_URL);

  const [optionsColumn, setOptionsColumn] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const optionsComparison = ['maior que', 'menor que', 'igual a'];
  const INITIAL_STATE = {
    column: optionsColumn[0],
    comparison: optionsComparison[0],
    number: 0,
  };
  const [filterValues, setFilterValues] = useState({});
  const [numericFilter, setNumericFilter] = useState(INITIAL_STATE);
  const [filteredObjectValues, setFilteredObjectValues] = useState({
    objectNames: [],
    itensToFilter: [],
    filterdNumericFilter: [],
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilterValues({
      [name]: value,
    });
  };

  const handleFilterChange = ({ target }) => {
    const { value, name } = target;
    setNumericFilter({
      ...numericFilter,
      [name]: value,
    });
  };
  const handleFilterClick = () => {
    const { objectNames, itensToFilter } = filteredObjectValues;
    setFilteredObjectValues({
      ...filteredObjectValues,
      objectNames: [...objectNames, Object.values(numericFilter).join(' ')],
      itensToFilter: [...itensToFilter, numericFilter],
    });
    setOptionsColumn(optionsColumn.filter((el) => el !== numericFilter.column));
    setFilterValues(INITIAL_STATE);
  };

  const handleRemoveAllFilters = () => {
    setFilteredObjectValues({
      ...filteredObjectValues,
      itensToFilter: [],
    });
  };
  console.log(dataApi);
  const handleRemoveOneFilter = ({ target }) => {
    const { value } = target;
    const { objectNames, itensToFilter } = filteredObjectValues;

    const newItensToFilter = itensToFilter
      .filter((item) => !target.value.includes(item.column));
    setFilteredObjectValues({
      ...filteredObjectValues,
      objectNames: [objectNames.filter((objName) => objName !== target.value)],
      itensToFilter: newItensToFilter,
    });
    setOptionsColumn([value.substring(0, value.indexOf(' ')), ...optionsColumn]);
    console.log(newItensToFilter);
    console.log(itensToFilter);
    console.log(target.value);
  };

  let newData;
  const obj = filterValues.search ? filterValues.search : '';
  newData = dataApi?.filter((data) => data.name.includes(obj));

  if (filteredObjectValues.itensToFilter.length > 0) {
    filteredObjectValues.itensToFilter.forEach((filter) => {
      newData = newData.filter((element) => {
        switch (filter.comparison) {
        case 'maior que':
          return Number(element[filter.column]) > Number(filter.number);
        case 'igual a':
          return Number(element[filter.column]) === Number(filter.number);
        case 'menor que':
          return Number(element[filter.column]) < Number(filter.number);
        default:
          return [];
        }
      });
    });
  }

  const values = ({
    dataApi,
    loading,
    newData,
    filteredObjectValues,
    numericFilter,
    optionsColumn,
    optionsComparison,
    handleChange,
    handleFilterChange,
    handleFilterClick,
    handleRemoveAllFilters,
    setFilteredObjectValues,
    handleRemoveOneFilter,
  });

  return (
    <AuthContext.Provider value={ values }>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.shape({

  }).isRequired,
};

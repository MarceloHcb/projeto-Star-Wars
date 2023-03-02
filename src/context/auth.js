import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
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
  const [filteredObjectValues, setFilteredObjectValues] = useState({
    objectNames: [],
    itensToFilter: [],
    order: { column: 'population', sort: 'ASC' },
  });
  const [filterValues, setFilterValues] = useState({});
  const [numericFilter, setNumericFilter] = useState(INITIAL_STATE);
  const [filterOnClick, setFilterOnClick] = useState(false);
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
  };

  const handleOrder = ({ target }) => {
    setFilterOnClick(false);
    const { name, value } = target;
    const { order } = filteredObjectValues;
    setFilteredObjectValues({
      ...filteredObjectValues,
      order: {
        ...order,
        [name]: value,
      },
    });
  };
  const handleOrderClick = () => {
    setFilterOnClick(true);
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

  const { order } = filteredObjectValues;
  const numberOfFalse = 1;
  if (filterOnClick) {
    const { column, sort } = order;
    if (sort === 'DESC') {
      newData = newData?.filter((data) => (Object.keys(data)))
        .sort((a, b) => {
          if (a[column] === 'unknown') {
            return a[column] < b[column];
          }
          return b[column] - a[column];
        });
    }
    if (sort === 'ASC') {
      newData = newData?.filter((data) => (Object.keys(data)))
        .sort((a, b) => {
          if (a[column] !== 'unknown') {
            return -numberOfFalse;
          }
          return a[column] - b[column];
        }).sort((a, b) => a[column] - b[column]);
    }
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
    handleOrder,
    handleOrderClick,
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

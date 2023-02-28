import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import useFetch from '../hooks/useFetch';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const BASE_URL = 'https://swapi.dev/api/planets';
  const { dataApi, loading } = useFetch(BASE_URL);
  const [filterValues, setFilterValues] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });
  const [filterObjectName, setFilter] = useState([]);
  const [newData, setNewData] = useState();
  const [objects, setObjects] = useState([]);
  console.log(dataApi);
  const handleChange = ({ target }) => {
    const filteredData = dataApi?.filter((el) => el.name.includes(target.value));
    if (filteredData.length > 0) {
      setNewData(filteredData);
    } else {
      setNewData(dataApi);
    }
  };

  const handleFilterChange = ({ target }) => {
    const { value, name } = target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  const handleFilterClick = () => {
    setFilter([...filterObjectName, Object.values(filterValues).join(' ')]);
    const { column } = filterValues;
    const { comparison } = filterValues;
    const { number } = filterValues;

    const obj = {
      name: Object.values(filterValues).join(' '),
      filters: [filterValues],
      values: '',
    };

    if (comparison === 'menor que') {
      obj.values = dataApi?.filter((el) => Number(el[column]) < Number(number));
    }
    if (comparison === 'maior que') {
      obj.values = dataApi?.filter((el) => Number(el[column]) > Number(number));
    }
    if (comparison === 'igual a') {
      obj.values = dataApi?.filter((el) => Number(el[column]) === Number(number));
    }

    console.log('obj', obj);
    setObjects([...objects, obj]);
    setNewData(obj.values);
    setFilterValues({
      column: 'population',
      comparison: 'maior que',
      number: 0,
    });
  };
  console.log('objects', objects);
  console.log('filterObjectName', filterObjectName);
  console.log('newData', newData);

  const values = ({
    dataApi,
    loading,
    newData,
    handleChange,
    handleFilterChange,
    handleFilterClick,
    filterObjectName,
    filterValues,
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

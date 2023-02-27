import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import useFetch from '../hooks/useFetch';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const BASE_URL = 'https://swapi.dev/api/planets';
  const { dataApi, loading } = useFetch(BASE_URL);
  const [newData, setNewData] = useState();
  const handleChange = ({ target }) => {
    const filteredData = dataApi?.filter((el) => el.name.includes(target.value));
    if (filteredData.length > 0) {
      setNewData(filteredData);
    } else {
      setNewData(dataApi);
    }
  };
  console.log(newData);

  const values = ({
    dataApi, loading, newData, handleChange,
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

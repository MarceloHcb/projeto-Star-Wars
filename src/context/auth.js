import PropTypes from 'prop-types';
import { createContext, useMemo } from 'react';
import useFetch from '../hooks/useFetch';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
//   const [data, setData] = useState();
  const BASE_URL = 'https://swapi.dev/api/planets';
  const { dataApi, loading } = useFetch(BASE_URL);

  const values = useMemo(() => ({
    dataApi, loading,
  }), [dataApi, loading]);

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
